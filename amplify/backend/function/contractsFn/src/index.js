'use strict';
const { getDb, ok, created, notFound } = require('/opt/nodejs/db');

exports.handler = async (event) => {
  const db = await getDb();
  const { httpMethod, resource, body, pathParameters } = event;

  // Listar los contratos (máximo 100, ordenados por fecha de inicio descendente)
  if (httpMethod === 'GET' && resource === '/contracts') {
    const { rows } = await db.query(
      'SELECT * FROM contracts ORDER BY start_date DESC LIMIT 100'
    );
    return ok(rows);
  }

  // Crear un nuevo contrato
  if (httpMethod === 'POST' && resource === '/contracts') {
    const {
      project_id,
      freelancer_id,
      client_id,
      start_date,
      end_date,
      agreed_amount,
      payment_terms,
      status,
      contract_type,
      terms_conditions
    } = JSON.parse(body);

    const { rows } = await db.query(
      `INSERT INTO contracts
         (project_id, freelancer_id, client_id,
          start_date, end_date, agreed_amount,
          payment_terms, status, contract_type, terms_conditions)
       VALUES
         ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [
        project_id, freelancer_id, client_id,
        start_date, end_date, agreed_amount,
        payment_terms, status, contract_type, terms_conditions
      ]
    );
    return created(rows[0]);
  }

  // Actualizar un contrato existente
  if (httpMethod === 'PUT' && resource === '/contracts/{id}') {
    const { id } = pathParameters;
    const {
      project_id,
      freelancer_id,
      client_id,
      start_date,
      end_date,
      agreed_amount,
      payment_terms,
      status,
      contract_type,
      terms_conditions
    } = JSON.parse(body);

    const { rows } = await db.query(
      `UPDATE contracts SET
         project_id     = $1,
         freelancer_id  = $2,
         client_id      = $3,
         start_date     = $4,
         end_date       = $5,
         agreed_amount  = $6,
         payment_terms  = $7,
         status         = $8,
         contract_type  = $9,
         terms_conditions = $10
       WHERE contract_id = $11
       RETURNING *`,
      [
        project_id, freelancer_id, client_id,
        start_date, end_date, agreed_amount,
        payment_terms, status, contract_type, terms_conditions,
        id
      ]
    );
    return ok(rows[0]);
  }

  // Resto de rutas no definidas
  return notFound();
};
