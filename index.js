require('dotenv').config();
const express = require('express');
const pool = require('./config/database');

const app = express();
app.use(express.json());

// Rutas
app.use('/api/usuarios', require('./routes/usuarioRoutes'));
app.use('/api/pagos', require('./routes/pagoRoutes'));
app.use('/api/lecturas', require('./routes/lecturaRoutes'));

// verificar membresías
const verificarMembresias = async () => {
  try {
    const [pagos] = await pool.execute('SELECT usuario_id FROM pagos WHERE fecha_vencimiento < CURDATE()');
    for (const pago of pagos) {
      await pool.execute('UPDATE usuarios SET estado = "inactivo" WHERE id = ?', [pago.usuario_id]);
    }
    console.log('Membresías verificadas');
  } catch (error) {
    console.error('Error al verificar membresías:', error);
  }
};

// Llama a la función
verificarMembresias();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
