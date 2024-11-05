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
	async fetch(request, env) {
		const url = new URL(request.url);
		if (url.pathname == "/diccionario") {
			const { saveDicc } = await import("./paileria");
			return saveDicc(request, env);
		}
		if (request.method == 'POST') {
			try {
				let json = await env.codigos_paileria.get("data", { type: "json" });
				let keys = Object.values(json).join("\\b|\\b");
				//console.log(keys);
				let rx;
				let rxFps;
				let fps;
				let fpsName
				rx = new RegExp(`(?<=^\\s{3})(${keys})`, 'gim');
				rxFps = new RegExp("Numero\\sOP\\s:.*01001.*Descripcion\\s\\s\\:\\sFPS.*", 'gim')
				fps = new RegExp("FPS.*");
				//console.log(rx);
				let body = await request.text();

				const matches = [];
				let isFps = rxFps.test(body);
				for (const match of body.matchAll(rx)) {
					matches.push(match[0]);
				}

				if (isFps == true){
					fpsName = body.match(fps);
					return new Response(
						`La orden es por el siguiente equipo\n
						\n
						${fpsName}
						\n
						\n
						Asegurate de agregar los puentes para motor y patas housing\
						\n
						\n
						\n`+matches.join('\n'), { headers: { 'Content-Type': 'text/plain' } })
				}
				//regresamos una nueva linea por cada match
				return new Response(matches.join('\n'), { headers: { 'Content-Type': 'text/plain' } });
			} catch (e) {
				return new Response(`Error: ${e.message}`, { status: 500 });
			}
		}
		return new Response('Solamente solicitures POST son permitidas.', { status: 405 });
	},
};
