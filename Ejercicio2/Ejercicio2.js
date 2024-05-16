import('node-fetch').then(async (module) => {
  const fetch = module.default;
  const response = await fetch('http://localhost/nuevo/JASON/data.json');
  if (response.ok) {
    const data = await response.json();
    console.log("\t Lista de Regiones");
    //Itera sobre los datos obtenidos e imprime la ultima confirmación dada osea la mayor
    for (let i = 0; i < data.length; i++) { 
      let confirmados = data[i].confirmed; 
      let region = data[i].region;  
      let totalConfirmados = confirmados[confirmados.length - 1].value; 
      console.log(region + ": " + totalConfirmados); 
    } 
  } else { 
    console.error('Error en la solicitud:', response.status); 
  }
//Captura de error
}).catch(error => {
  console.error('Error:', error);
});
