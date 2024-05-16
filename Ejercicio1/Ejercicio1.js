import('node-fetch').then(async (module) => {
  const fetch = module.default;
    const response = await fetch('http://localhost/nuevo/JASON/data.json');
    // Verifica si la respuesta fue exitosa
    if (response.ok) {
        const data = await response.json();
        console.log("\t Lista de Regiones");
        //Itera sobre los datos obtenidos e imprime las regiones
        for (let i = 0; i < data.length; i++) {
            console.log(data[i].region);
        }
    } else {
        console.error('Error en la solicitud:', response.status);
    }
//Captura de error
}).catch(error => {
    console.error('Error:', error);
});
