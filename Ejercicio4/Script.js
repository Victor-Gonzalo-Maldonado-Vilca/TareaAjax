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
      //caso contrario la crea
      const ctx = document.getElementById('grafica').getContext('2d');
      let myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: fechas,
          datasets: [
            {
              label: region,
              data: valoresRegion,
              borderColor: 'blue',
              backgroundColor: 'rgba(0, 0, 255, 0.1)'
            },
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    })
  .catch(error => console.error('Error:', error));
});