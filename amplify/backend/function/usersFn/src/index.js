/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */'use strict';
const { getDb, ok, created, notFound } = require('db');

exports.handler = async (event) => {
  const db = await getDb();   

  const { httpMethod, resource, body, pathParameters } = event;

  if (httpMethod === 'GET' && resource === '/users') {
    const { rows } = await db.query('SELECT * FROM users LIMIT 100');
    return ok(rows);
  }

  if (httpMethod === 'GET' && resource === '/users/{id}') {
    const { id } = pathParameters;
    const { rows } = await db.query(
      'SELECT * FROM users WHERE user_id = $1',
      [id]
    );
    return rows[0] ? ok(rows[0]) : notFound();
  }

  if (httpMethod === 'POST' && resource === '/users') {
    const { email, password_hash, first_name, last_name } = JSON.parse(body);
    const { rows } = await db.query(
      `INSERT INTO users(email,password_hash,first_name,last_name)
       VALUES ($1,$2,$3,$4) RETURNING *`,
      [email, password_hash, first_name, last_name]
    );
    return created(rows[0]);
  }

  return notFound();
};
