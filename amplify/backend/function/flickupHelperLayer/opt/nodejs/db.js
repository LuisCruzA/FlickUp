'use strict';
/**
 * flickupHelperLayer – reutilizable en todas las funciones
 * expone:
 *   - getDb(env)     → conexión singleton pg
 *   - ok, created,
 *   - notFound, resp → helpers HTTP
 */

const { Client } = require('pg');
const {
  SecretsManagerClient,
  GetSecretValueCommand
} = require('@aws-sdk/client-secrets-manager');

let cachedPg;   // se reutiliza entre invocaciones **y** entre funciones

async function getDb(env = process.env) {
  if (cachedPg) return cachedPg;

  const sm = new SecretsManagerClient();
  const sec = await sm.send(
    new GetSecretValueCommand({ SecretId: env.DB_SECRET_ARN })
  );
  const { username, password } = JSON.parse(sec.SecretString);

  const client = new Client({
    host: env.PROXY_ENDPOINT,
    port: 5432,
    user: username,
    password,
    database: env.DB_NAME,
    ssl: { rejectUnauthorized: false }
  });
  await client.connect();
  cachedPg = client;
  return client;
}

/* ---------- Helpers ---------- */

const resp = (code, payload) => ({
  statusCode: code,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
});
const ok = (data) => resp(200, data);
const created = (data) => resp(201, data);
const notFound = () => resp(404, { message: 'Not Found' });

module.exports = { getDb, ok, created, notFound, resp };
