import mongoose from 'mongoose';

// Define la estructura de un usuario
const userSchema = new mongoose.Schema({
  // Nombre de usuario
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30
  },

  // Correo electrónico
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },

  // Contraseña del usuario
  password: {
    type: String,
    required: true
  }
});

// Crea el modelo para trabajar con los usuarios
const AuthUser = mongoose.model('User', userSchema);

// Exporta el modelo para usarlo en otros archivos
export default AuthUser;