const fs = require('fs');
const path = require('path');
const express = require('express');
const bp = require('body-parser');
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();
const app = express();

let archivosGuardados = [];
app.use(express.static('pub'));
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.listen(3000, () => {
    console.log("Escuchando en: http://localhost:3000");
});
			
app.get('/', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'index.html'));
});
  
app.post('/crear', (request, response) => {
  console.log(request.body);
  const markDownText = request.body.text;
	const titulo = request.body.title;
  let htmlCode = md.render(markDownText);
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify({ text: htmlCode, title: "TITULO: " + titulo}));
  let archivo = {
			nombre: titulo,
			text: markDownText,
			html: htmlCode,
			fecha: new Date().toISOString()
	};
	archivosGuardados.push(archivo);
	fs.writeFile('pub/archivos/Markdown.json',JSON.stringify(archivosGuardados), (err) => {
    if (err) {
      console.error('Error al guardar el archivo JSON:', err);
    } else {
      console.log('Información de archivos guardados actualizada en JSON.');
    }
  });
});
app.get('/listar', (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(archivosGuardados.map(archivo => archivo.nombre)));
});
