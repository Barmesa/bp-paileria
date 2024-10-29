import Papa from "papaparse"
export async function putdict(request, env) {

	if (request.method === 'POST') {
		console.log("antes del try");
		try {
			console.log("en el try");
			const body = await request.text();

			// Convert CSV to JSON using csvtojson
			let paparesult = Papa.parse(body);
			let jsonArray = paparesult.data;
			//const jsonArray = await csv().fromString(body);

			// Return the JSON array as a response
			await env.codigos_paileria.put("data",JSON.stringify(jsonArray,null,2))
			return new Response(JSON.stringify(jsonArray, null, 2), {
				headers: { 'Content-Type': 'application/json' },
			});
		} catch (error) {
			return new Response(JSON.stringify({ status: 'error', message: error.message }), {
				headers: { 'Content-Type': 'application/json' },
			});
		}
	}

	return new Response('Send a POST request with Google Sheets data to convert to JSON.', {
		headers: { 'Content-Type': 'text/plain' },
	});
}
