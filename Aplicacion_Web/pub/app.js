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
document.addEventListener('DOMContentLoaded', function () {
	const title = document.querySelector('#markupTitle');
	const text = document.querySelector('#markupText');
	document.querySelector('#markupForm').onsubmit = () => { 
    event.preventDefault();
		crear(text.value, title.value);
		return false;
	}
})

