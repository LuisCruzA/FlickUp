'use strict';
const { getDb, ok, notFound, created } = require('db');

exports.handler = async (event) => {
  const db = await getDb();
  const { httpMethod, resource, pathParameters, queryStringParameters, body } = event;

  if (httpMethod === 'GET' && resource === '/messages/{proxy+}') {
    const userId = pathParameters.proxy; 

    const sql = `
      SELECT DISTINCT ON (m.other_id, m.project_id)
             m.project_id      AS id_project,
             m.other_id        AS id_otrapersona,
             p.title           AS project_title,
             CONCAT(u.first_name, ' ', u.last_name) AS name,
             m.content         AS last_message,
             m.sent_at         AS time,
             u.profile_picture AS avatar
      FROM (
        SELECT *,
          CASE
            WHEN sender_id <> $1 THEN sender_id
            ELSE receiver_id
          END AS other_id
        FROM messages
      ) m
      JOIN projects p
        ON m.project_id = p.project_id
      JOIN users u
        ON u.cognito_sub = m.other_id
      WHERE $1 IN (m.sender_id, m.receiver_id)
      ORDER BY m.other_id, m.project_id, m.sent_at DESC;
    `;

    const { rows } = await db.query(sql, [userId]);
    return ok(rows);
  }

  if (httpMethod === 'GET' && resource === '/messages') {
    const { idUser, idOtraPersona, idProject } = queryStringParameters;
    const { rows } = await db.query(
      `SELECT
         message_id AS id,
         sender_id,
         content    AS texto
       FROM messages
       WHERE project_id = $1
         AND (
           (sender_id = $2 AND receiver_id = $3)
           OR
           (sender_id = $3 AND receiver_id = $2)
         )
       ORDER BY sent_at ASC;`,
      [idProject, idUser, idOtraPersona]
    );
    return ok(rows);
  }

  if (httpMethod === 'POST' && resource === '/messages') {
    const { idUser, idOtraPersona, idProject, texto } = JSON.parse(body);

    const { rows } = await db.query(
      `INSERT INTO messages (
         sender_id,
         receiver_id,
         project_id,
         content
       ) VALUES ($1, $2, $3, $4)
       RETURNING
         message_id AS id,
         sender_id,
         content    AS texto,
         sent_at    AS time;`,
      [idUser, idOtraPersona, idProject, texto]
    );

    return created(rows[0]);
  }

  // --- Ruta no soportada ---
  return notFound();
};
