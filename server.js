const express = require('express');
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Puerto del servidor
const PORT = 3000;

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API de Numerología funcionando');
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
