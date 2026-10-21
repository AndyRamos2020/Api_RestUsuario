import User from '../models/user.js';
import bcrypt from 'bcrypt';

// Función para iniciar sesión
const login = async (req, res) => {
    try {
        // Obtiene el correo y la contraseña enviados
        const { email, password } = req.body;

        // Comprueba que los campos no estén vacíos
        if (!email || !password) {
            return res.status(400).json({
                message: 'El correo y la contraseña son obligatorios'
            });
        }

        // Busca al usuario por su correo
        const user = await User.findOne({ email });

        // Comprueba si el usuario existe
        if (!user) {
            return res.status(401).json({
                message: 'Credenciales incorrectas'
            });
        }

        // Compara la contraseña con la contraseña cifrada guardada
        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        // Comprueba si la contraseña es correcta
        if (!passwordMatch) {
            return res.status(401).json({
                message: 'Credenciales incorrectas'
            });
        }

        // Responde que el inicio de sesión fue exitoso
        return res.status(200).json({
            message: 'Inicio de sesión exitoso',
            user: {
                id: user._id,
                email: user.email
            }
        });

    } catch (error) {
        // Muestra el error en la consola
        console.error(error);

        // Responde si ocurre un error en el servidor
        return res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
};

// Exporta la función para usarla en las rutas
export default login;