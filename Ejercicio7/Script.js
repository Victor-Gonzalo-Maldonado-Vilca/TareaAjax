let myChart;
document.getElementById("comparasion").addEventListener("submit", function (evento) {
  evento.preventDefault();
  //Extraccion de datos del formulario
  const formData = new FormData(this);
  const region1 = formData.get('region1');
  const region2 = formData.get('region2');
  
  fetch("http://localhost/nuevo/JASON/data.json")
    .then(response => response.json())
    .then(data => {
      //Solicitando informacion del archivo data.json 
      const datosRegion1 = data.find(region => region.region === region1);
      const datosRegion2 = data.find(region => region.region === region2);

      const fechas = datosRegion1.confirmed.map(entry => entry.date);
      const valoresRegion1 = datosRegion1.confirmed.map(entry => parseInt(entry.value));
      const valoresRegion2 = datosRegion2.confirmed.map(entry => parseInt(entry.value));
      if (myChart) {
        //Si el archivo ya fue creado. 
        myChart.data.labels = fechas;
        myChart.data.datasets[0].label = region1;
        myChart.data.datasets[0].data = valoresRegion1;
        myChart.data.datasets[1].label = region2;
        myChart.data.datasets[1].data = valoresRegion2;
        myChart.update();
      } else {
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
      }
    })
    .catch(error => console.error('Error:', error));
});