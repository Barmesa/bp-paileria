import { putdict } from "./paileria";
/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request,env) {
		const url = new URL(request.url);
		let rx;
		let i=0
		console.log("start");
		if(url.pathname == "/putdict"){
			console.log("por importar put");
			//const {putdict} = await import("./paileria");
			console.log("por entrar a ");
			return putdict(request, env);
		}
		if (request.method == 'POST') {
			try{
				let json = await env.codigos_paileria.get("data", { type: "json"});
				let noting;
				let idk;
				for(i=0; i<json.lenght;i++){
					rx = rx;
				}

			}catch(e){
				return new Response(`Error: ${e.message}`, { status: 500 });
			}
			/* try {
				const contentType = request.headers.get('content-type') || '';

				// Ensure the request has a form-data body with file data
				if (contentType.includes('multipart/form-data')) {
					const formData = await request.formData();

					// Assuming the file input is named 'file' in the form-data
					const file = formData.get('file');

					if (!file) {
						return new Response('No file provided', { status: 400 });
					}

					// Read the file content as text
					const fileContent = await file.text();

					// Count the number of characters
					const characterCount = fileContent.length;

					return new Response(`Number of characters in the file: ${characterCount}`, {
						headers: { 'Content-Type': 'text/plain' },
					});
				} else {
					return new Response('Unsupported Content-Type', { status: 415 });
				}
			} catch (error) {
				return new Response(`Error: ${error.message}`, { status: 500 });
			} */
		}
		return new Response('Only POST requests are accepted', { status: 405 });
	},
};
