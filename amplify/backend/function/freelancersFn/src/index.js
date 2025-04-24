'use strict';
const { getDb, ok, created, notFound } = require('db');

exports.handler = async (event) => {
  const db = await getDb();

  const { httpMethod, resource, body, pathParameters } = event;

  if (httpMethod === 'GET' && resource === '/freelancers') {
    const { rows } = await db.query(
      `
      SELECT
        f.*,
        CONCAT(u.first_name, ' ', u.last_name) AS full_name
      FROM
        freelancers f
        JOIN users u ON f.user_id = u.cognito_sub
      ORDER BY
        f.rating DESC
      LIMIT 100
      `
    );
    return ok(rows);
  }

  if (httpMethod === 'POST' && resource === '/freelancers') {
    const { user_id, title, bio } = JSON.parse(body);
    const { rows } = await db.query(
      `INSERT INTO freelancers(user_id,title,bio)
       VALUES ($1,$2,$3) RETURNING *`,
      [user_id, title, bio]
    );
    return created(rows[0]);
  }

  if (httpMethod === 'PUT' && resource === '/freelancers/{id}') {
    const { id } = pathParameters;
    const { title, bio } = JSON.parse(body);
    const { rows } = await db.query(
      `UPDATE freelancers SET title=$1, bio=$2 WHERE freelancer_id=$3 RETURNING *`,
      [title, bio, id]
    );
    return ok(rows[0]);
  }

  return notFound();
};
