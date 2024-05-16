import('node-fetch').then(async (module) => {
  const fetch = module.default;
    const response = await fetch('http://localhost/nuevo/JASON/data.json');
}).catch(error => {
    console.error('Error:', error);
});
