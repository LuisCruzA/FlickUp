/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_FLICKUPCREDITDATA_BUCKETNAME
Amplify Params - DO NOT EDIT */'use strict';

const AWS = require('aws-sdk');
const { getDb } = require('db');

const s3 = new AWS.S3();
const S3_BUCKET = process.env.S3_BUCKET;

exports.handler = async (event) => {
  const db = await getDb();

  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - 6);
  const cutoffIso = cutoff.toISOString();


  const { rows } = await db.query(`
    SELECT
      f.freelancer_id,
      -- suma sólo donde submitted_at >= cutoff
      SUM(
        CASE
          WHEN p.submitted_at >= $1 THEN p.proposed_amount
          ELSE 0
        END
      ) AS ingresos_ult_6m,
      -- cuenta como 1 cada fila donde submitted_at >= cutoff
      SUM(
        CASE
          WHEN p.submitted_at >= $1 THEN 1
          ELSE 0
        END
      ) AS num_trabajos
    FROM freelancers f
    LEFT JOIN proposals p
      ON p.freelancer_id = f.freelancer_id
    GROUP BY f.freelancer_id;
  `, [cutoffIso]);

  let csv = 'freelancer_id,ingresos_ult_6m,num_trabajos\n';
  for (const r of rows) {
    csv += `${r.freelancer_id},${r.ingresos_ult_6m},${r.num_trabajos}\n`;
  }

  await s3.putObject({
    Bucket: S3_BUCKET,
    Key:    'credit_data.csv',
    Body:   csv,
    ContentType: 'text/csv'
  }).promise();

  for (const r of rows) {
    await db.query(`
      INSERT INTO freelancer_scores (
        freelancer_id, score, ingresos_ult_6m, num_trabajos
      ) VALUES ($1, 500, $2, $3)
      ON CONFLICT (freelancer_id) DO UPDATE
        SET ingresos_ult_6m = EXCLUDED.ingresos_ult_6m,
            num_trabajos    = EXCLUDED.num_trabajos,
            updated_at      = NOW();
    `, [r.freelancer_id, r.ingresos_ult_6m, r.num_trabajos]);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'CSV generado y scores iniciales sembrados',
      updated: rows.length
    })
  };
};
