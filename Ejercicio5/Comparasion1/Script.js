document.getElementById("comparasion").addEventListener("submit", function (evento) {
  evento.preventDefault();
  
  const region1 = 'Apurimac';
  const region2 = 'Lima';
  
  fetch("http://localhost/nuevo/JASON/data.json")
    .then(response => response.json())
    .then(data => {
      //Solicitando informacion del archivo data.json 
      const datosRegion1 = data.find(region => region.region === region1);
      const datosRegion2 = data.find(region => region.region === region2);

      const fechas = datosRegion1.confirmed.map(entry => entry.date);
      const valoresRegion1 = datosRegion1.confirmed.map(entry => parseInt(entry.value));
      const valoresRegion2 = datosRegion2.confirmed.map(entry => parseInt(entry.value));
      //caso contrario la crea
      const ctx = document.getElementById('grafica').getContext('2d');
      myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: fechas,
          datasets: [
            {
              label: region1,
              data: valoresRegion1,
              borderColor: 'blue',
              backgroundColor: 'rgba(0, 0, 255, 0.1)'
            },
            {
              label: region2,
              data: valoresRegion2,
              borderColor: 'green',
              backgroundColor: 'rgba(0, 255, 0, 0.1)'
            }
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