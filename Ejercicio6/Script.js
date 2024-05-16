document.getElementById("comparasion").addEventListener("submit", function (evento) {
  evento.preventDefault();

  fetch("http://localhost/nuevo/JASON/data.json")
    .then(response => response.json())
    .then(data => {
      //extrayendo primera región
      const primeraRegion = data.find(region => region.region !== 'Lima' && region.region !== 'Callao');

      // Verificar que se encontró la primera región
      if (!primeraRegion) {
        console.error('No se encontró la primera región con las fechas necesarias para el gráfico.');
        return;
      }

      // Obtener las fechas de la primera región
      const fechas = primeraRegion.confirmed.map(entry => entry.date);

      // Extraer datos  de las regiones menos Lima y Callao
      const datasets = data.filter(region => region.region !== 'Lima' && region.region !== 'Callao').map(region => {
        const valores = [];
        // Llenar los valores con los datos correspondientes a las fechas de la primera región
        fechas.forEach(fecha => {
          const dato = region.confirmed.find(entry => entry.date === fecha);
          if (dato) {
            valores.push(parseInt(dato.value));
          } else {
            valores.push(null);
          }
        });
        return {
          label: region.region,
          data: valores,
          borderColor: getRandomColor(),
          backgroundColor: 'rgba(0, 0, 255, 0.1)',
          pointStyle: 'none',
          pointRadius: 0
        };
      });

      // Crear el gráfico con los datos de todas las regiones
      const ctx = document.getElementById('grafica').getContext('2d');
      myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: fechas,
          datasets: datasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    })
    .catch(error => console.error('Error:', error));
});

// Función para obtener un color aleatorio
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}



