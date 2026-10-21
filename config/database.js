import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Carga las variables del archivo .env
dotenv.config();

// Conecta la aplicación con MongoDB
const connectDB = async () => {
  try {
    // Establece la conexión usando la URL de la base de datos
    await mongoose.connect(process.env.MONGODB_URI);

    // Confirma que la conexión fue exitosa
    console.log('MongoDB connected successfully');
  } catch (error) {
    // Muestra el error si falla la conexión
    console.error('MongoDB connection error:', error.message);

    // Detiene la aplicación si no puede conectarse
    process.exit(1);
  }
};

// Exporta la función para usarla en el servidor
export default connectDB;