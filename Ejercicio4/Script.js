document.getElementById("comparasion").addEventListener("submit", function (evento) {
  evento.preventDefault();
  
  const region = 'Arequipa';
  fetch("http://localhost/nuevo/JASON/data.json")
    .then(response => response.json())
    .then(data => {
      //Solicitando informacion del archivo data.json 
      const datosRegion = data.find(r => r.region === region);

      const fechas = datosRegion.confirmed.map(entry => entry.date);
      const valoresRegion = datosRegion.confirmed.map(entry => parseInt(entry.value)); 
    })
  .catch(error => console.error('Error:', error));
});