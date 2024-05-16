import('node-fetch').then(async (module) => {
  const fetch = module.default;
  const response = await fetch('http://localhost/nuevo/JASON/data.json');
  let mapa = new Map();
  if (response.ok) {
    const data = await response.json();
    console.log("\t Lista de Regiones");
    //Agregar datos tanto suma como region a un mapa
    for (let i = 0; i < data.length; i++) {
      let confirmados = data[i].confirmed;
      let region = data[i].region;
      let suma = 0;
      for(let c = 0; c < confirmados.length; c++){
        suma += parseInt(confirmados[c].value);
      }
      mapa.set(region,suma);
    }
    //convertir mapa en arreglo
    let arreglo = Array.from(mapa);
    //Ordenar arreglo
    arreglo.sort((a, b) => b[1] - a[1]);
    let ordenamiento = new Map(arreglo);
    let i = 0;
    //Imprimir datos del mapa
    for (let [clave, valor] of ordenamiento) {
      console.log((i + 1) + " " + clave + ": " + valor);
      i++;
      if(i >= 10){
        break;
      }
    }
  } else {
    console.error('Error en la solicitud:', response.status);
  }
}).catch(error => {
  console.error('Error:', error);
});