'use strict';
const { getDb, ok, created, notFound } = require('/opt/nodejs/db');

exports.handler = async (event) => {
  const db = await getDb();
  const { httpMethod, resource, body, pathParameters } = event;

  // Listar propuestas (hasta 100, ordenadas por fecha de envío descendente)
  if (httpMethod === 'GET' && resource === '/proposals') {
    const { rows } = await db.query(
      'SELECT * FROM proposals ORDER BY submitted_at DESC LIMIT 100'
    );
    return ok(rows);
  }

  // Crear una nueva propuesta
  if (httpMethod === 'POST' && resource === '/proposals') {
    const {
      freelancer_id,
      project_id,
      proposed_amount,
      cover_letter,
      estimated_duration,
      submitted_at,
      status,
      portfolio_links,
      is_highlighted
    } = JSON.parse(body);

    const { rows } = await db.query(
      `INSERT INTO proposals
         (freelancer_id, project_id,
          proposed_amount, cover_letter,
          estimated_duration, submitted_at,
          status, portfolio_links,
          is_highlighted)
       VALUES
         ($1, $2,
          $3, $4,
          $5, $6,
          $7, $8,
          $9)
       RETURNING *`,
      [
        freelancer_id,
        project_id,
        proposed_amount,
        cover_letter,
        estimated_duration,
        submitted_at,
        status,
        portfolio_links,
        is_highlighted
      ]
    );
    return created(rows[0]);
  }

  // Actualizar una propuesta existente
  if (httpMethod === 'PUT' && resource === '/proposals/{id}') {
    const { id } = pathParameters;
    const {
      freelancer_id,
      project_id,
      proposed_amount,
      cover_letter,
      estimated_duration,
      submitted_at,
      status,
      portfolio_links,
      is_highlighted
    } = JSON.parse(body);

    const { rows } = await db.query(
      `UPDATE proposals SET
         freelancer_id     = $1,
         project_id        = $2,
         proposed_amount   = $3,
         cover_letter      = $4,
         estimated_duration = $5,
         submitted_at      = $6,
         status            = $7,
         portfolio_links   = $8,
         is_highlighted    = $9
       WHERE proposal_id = $10
       RETURNING *`,
      [
        freelancer_id,
        project_id,
        proposed_amount,
        cover_letter,
        estimated_duration,
        submitted_at,
        status,
        portfolio_links,
        is_highlighted,
        id
      ]
    );
    return ok(rows[0]);
  }

  // Ruta no encontrada
  return notFound();
};
