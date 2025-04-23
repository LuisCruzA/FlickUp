const { getDb } = require('db');

exports.handler = async (event) => {
    console.log('Evento recibido:', JSON.stringify(event, null, 2));
    
    try {
        const userId = event.queryStringParameters?.userId;
        console.log('Parámetro userId recibido:', userId);
        
        if (!userId) {
            console.error('Falta parámetro userId');
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Parámetro userId requerido' }),
                headers: { 'Content-Type': 'application/json' }
            };
        }

        const db = await getDb();
        console.log('Realizando query a la base de datos...');
        
        const { rows } = await db.query(
            `SELECT CASE
                WHEN EXISTS (SELECT 1 FROM freelancers WHERE user_id = $1) THEN 'profesional'
                WHEN EXISTS (SELECT 1 FROM clients WHERE user_id = $1) THEN 'cliente'
                ELSE NULL
             END AS rol`,
            [userId]
        );

        console.log('Resultado de la query:', rows);
        
        if (!rows.length || !rows[0].rol) {
            console.error('Usuario sin rol registrado para userId:', userId);
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Usuario no registrado en ningún rol' }),
                headers: { 'Content-Type': 'application/json' }
            };
        }

        console.log('Rol encontrado:', rows[0].rol);
        return {
            statusCode: 200,
            body: JSON.stringify(rows[0].rol),
            headers: { 'Content-Type': 'application/json' }
        };

    } catch (error) {
        console.error('Error en la ejecución:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                message: 'Error interno del servidor',
                error: error.message 
            }),
            headers: { 'Content-Type': 'application/json' }
        };
    }
};