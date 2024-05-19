function crear(markupText, markupTitle) {
	const url = 'http://localhost:3000/crear'
	const data = {
		title: markupTitle,
		text: markupText
	}
	console.log(data);
	const request = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	}
	fetch(url, request)
	  .then(response => response.json())
	  .then(data => {
			document.querySelector("#htmlCode").innerHTML = "<h1>" + data.title + "</h1><br>" + data.text;
	  })
	  .catch(error => {
	    console.error('Error al enviar la solicitud:', error);
	  });
}
//listar todas los nombres markdown en un boton
function listar(){
  const url = 'http://localhost:3000/listar';
	fetch(url)
		.then(response => response.json())
		.then(data => {
			const archivosList = document.querySelector("#htmlCode");
			archivosList.innerHTML = ''; 
			data.forEach(nombre => {
				const button = document.createElement('button');
				button.textContent = nombre;
				button.classList.add('botones');
				button.addEventListener('click', () => {
				  mostrarHtml(nombre);
				});
				archivosList.appendChild(button);
				const saltoLinea = document.createElement('br');
				archivosList.appendChild(saltoLinea);
			});
		})
		.catch(error => {
		console.error('Error al obtener la lista de archivos:', error);
		});
}
//funcion para colocar el contenido html al presionar el boton generado en la funcion listar()
function mostrarHtml(nombreArchivo) {
	const url = 'http://localhost:3000/archivos/Markdown.json'; // Ruta del archivo JSON
	fetch(url)
		.then(response => response.json())
		.then(data => {
		  const archivo = data.find(archivo => archivo.nombre === nombreArchivo);
			if (archivo) {
				const htmlCode = document.querySelector("#htmlCode");
				htmlCode.innerHTML = `<h1>${archivo.nombre}</h1><br>${archivo.html}`;
			} else {
				console.error('Archivo no encontrado en el JSON.');
			}
		})
		.catch(error => {
		console.error('Error al obtener el JSON de archivos:', error);
		});
}
//Espera a que la página se cargue por completa
document.addEventListener('DOMContentLoaded', function () {
	const title = document.querySelector('#markupTitle');
	const text = document.querySelector('#markupText');
	//boton para colocar en el archivo data.json, los datos respectivos
	document.querySelector('#markupForm').onsubmit = () => { 
    event.preventDefault();
		crear(text.value, title.value);
		return false;
	}
	//boton para generar la lista
	document.querySelector('#markupList').onsubmit = () => {
		event.preventDefault();
		listar();
		return false;
	}
})

