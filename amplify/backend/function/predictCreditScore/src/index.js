// amplify/backend/function/predictCreditScore/src/index.js
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

const runtime = new AWS.SageMakerRuntime();
// Nombre hardcodeado sin ENV vars
const ENDPOINT = 'canvas-new-deployment-04-24-2025-4-32-AM';

exports.handler = async (event) => {
  try {
    // Parseamos el body
    let body = event.body;
    if (typeof body === 'string') body = JSON.parse(body);

    // Extraemos o damos default a freelancer_id
    const freelancer_id   = body.freelancer_id   ?? 0;
    const ingresos        = body.ingresos_ult_6m;
    const num_trabajos    = body.num_trabajos;

    // Construimos el CSV con las 3 columnas
    const csvPayload = [freelancer_id, ingresos, num_trabajos]
      .map(String)
      .join(',');

    const params = {
      EndpointName: ENDPOINT,
      ContentType:  'text/csv',
      Body:         csvPayload
    };
    const resp = await runtime.invokeEndpoint(params).promise();

    // Parseamos la respuesta (p.ej. "735.435\n")
    const score = parseFloat(resp.Body.toString('utf-8'));

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ score })
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ message: err.message })
    };
  }
};
