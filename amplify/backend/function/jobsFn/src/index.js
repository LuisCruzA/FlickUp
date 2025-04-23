'use strict';
const { getDb, ok, created, notFound } = require('/opt/nodejs/db');

exports.handler = async (event) => {
  const db = await getDb();
  const { httpMethod, resource, body, pathParameters } = event;

  // Listar proyectos/trabajos (hasta 100, ordenados por fecha de publicación descendente)
  if (httpMethod === 'GET' && resource === '/projects') {
    const { rows } = await db.query(
      'SELECT * FROM projects ORDER BY posted_date DESC LIMIT 100'
    );
    return ok(rows);
  }

  // Crear un nuevo proyecto/trabajo
  if (httpMethod === 'POST' && resource === '/projects') {
    const {
      client_id,
      title,
      description,
      budget,
      status,
      posted_date,
      category,
      required_skills,
      estimated_duration,
      complexity_level,
      is_featured,
      expires_at
    } = JSON.parse(body);

    const { rows } = await db.query(
      `INSERT INTO projects
         (client_id, title, description, budget,
          status, posted_date, category, required_skills,
          estimated_duration, complexity_level,
          is_featured, expires_at)
       VALUES
         ($1, $2, $3, $4,
          $5, $6, $7, $8,
          $9, $10,
          $11, $12)
       RETURNING *`,
      [
        client_id, title, description, budget,
        status, posted_date, category, required_skills,
        estimated_duration, complexity_level,
        is_featured, expires_at
      ]
    );
    return created(rows[0]);
  }

  // Actualizar un proyecto/trabajo existente
  if (httpMethod === 'PUT' && resource === '/projects/{id}') {
    const { id } = pathParameters;
    const {
      client_id,
      title,
      description,
      budget,
      status,
      posted_date,
      category,
      required_skills,
      estimated_duration,
      complexity_level,
      is_featured,
      expires_at
    } = JSON.parse(body);

    const { rows } = await db.query(
      `UPDATE projects SET
         client_id        = $1,
         title            = $2,
         description      = $3,
         budget           = $4,
         status           = $5,
         posted_date      = $6,
         category         = $7,
         required_skills  = $8,
         estimated_duration = $9,
         complexity_level = $10,
         is_featured      = $11,
         expires_at       = $12
       WHERE project_id = $13
       RETURNING *`,
      [
        client_id, title, description, budget,
        status, posted_date, category, required_skills,
        estimated_duration, complexity_level,
        is_featured, expires_at,
        id
      ]
    );
    return ok(rows[0]);
  }

  // Ruta no encontrada
  return notFound();
};
