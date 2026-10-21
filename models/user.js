import mongoose from 'mongoose';

// Define la estructura de un usuario
const userSchema = new mongoose.Schema({
    // Correo electrónico del usuario
    email: {
        type: String,
        required: true,
        unique: true
    },

    // Contraseña del usuario
    password: {
        type: String,
        required: true
    }
});

// Crea el modelo o reutiliza el que ya existe
const User = mongoose.models.User || mongoose.model('User', userSchema);

// Exporta el modelo para usarlo en otras partes del proyecto
export default User;