import Papa from "papaparse";
export async function saveDicc(request, env) {
	if (request.method === 'POST') {
		try {
			const body = await request.text();

			// Convertimos el CSV a JSON con PapaParse
			let paparesult = Papa.parse(body);
			let jsonArray = paparesult.data;

			// Guardamos el JSON en el KV
			await env.codigos_paileria.put("data", JSON.stringify(jsonArray, null, 2));
			// Respondemos con el JSON
			return new Response(JSON.stringify(jsonArray, null, 2), {
				headers: { 'Content-Type': 'application/json' },
			});
		} catch (error) {
			// Si hay un error, respondemos con un mensaje de error
			return new Response(JSON.stringify({ status: 'error', message: error.message }), {
				headers: { 'Content-Type': 'application/json' },
			});
		}
	}

	return new Response('Envie un request POST con un archivo CSV en formato binario y la contraseña en la cabecera\npara convertirlo a JSON y crear el nuevo diccionario',{
		status: 400,
		headers: { 'Content-Type': 'text/plain' },
	});
}
