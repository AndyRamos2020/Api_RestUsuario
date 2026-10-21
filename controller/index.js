import AuthUser from '../models/User.js';
import bcrypt from 'bcrypt';

// Obtener todos los usuarios
export const getUsuario = async (req, res) => {
  try {
    // Busca todos los usuarios y excluye el campo passwordHash
    const usuarios = await AuthUser.find().select('-passwordHash');

    // Devuelve la lista de usuarios
    return res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);

    // Error al consultar los usuarios
    return res.status(500).json({
      message: 'Error al obtener los usuarios'
    });
  }
};

// Crear un usuario
export const postUsuario = async (req, res) => {
  try {
    // Obtiene los datos enviados en la petición
    const { username, email, password } = req.body;

    // Comprueba que los datos sean válidos y estén completos
    if (
      typeof username !== 'string' ||
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      !username.trim() ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: 'Username, email y password son obligatorios'
      });
    }

    // Cifra la contraseña antes de guardarla
    const passwordHash = await bcrypt.hash(password, 12);

    // Crea el nuevo usuario con los datos recibidos
    const usuario = new AuthUser({
      username: username.trim(),
      email: email.trim().toLowerCase(),
      password: passwordHash
    });

    // Guarda el usuario en MongoDB
    await usuario.save();

    // Devuelve la confirmación y los datos del usuario
    return res.status(201).json({
      message: 'Usuario creado correctamente',
      usuario: {
        id: usuario._id,
        username: usuario.username,
        email: usuario.email
      }
    });
  } catch (error) {
    console.error(error);

    // Comprueba si el correo ya existe
    if (error.code === 11000) {
      return res.status(409).json({
        message: 'El correo ya está registrado'
      });
    }

    // Comprueba si los datos no cumplen las reglas del modelo
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Los datos del usuario no son válidos'
      });
    }

    // Error inesperado del servidor
    return res.status(500).json({
      message: 'Error al crear el usuario'
    });
  }
};

// Actualizar un usuario
export const putUsuario = async (req, res) => {
  try {
    // Obtiene el ID de la URL y los datos enviados
    const { id } = req.params;
    const { username, email } = req.body;

    // Guarda únicamente los campos que se actualizarán
    const actualizaciones = {};

    // Comprueba que se haya enviado al menos un campo
    if (username === undefined && email === undefined) {
      return res.status(400).json({
        message: 'Debes proporcionar username o email para actualizar'
      });
    }

    // Valida y prepara el nombre de usuario
    if (username !== undefined) {
      if (typeof username !== 'string' || !username.trim()) {
        return res.status(400).json({
          message: 'Username no válido'
        });
      }

      actualizaciones.username = username.trim();
    }

    // Valida y prepara el correo electrónico
    if (email !== undefined) {
      if (typeof email !== 'string' || !email.trim()) {
        return res.status(400).json({
          message: 'Email no válido'
        });
      }

      actualizaciones.email = email.trim().toLowerCase();
    }

    // Actualiza el usuario y devuelve los datos actualizados
    const usuario = await AuthUser.findByIdAndUpdate(
      id,
      actualizaciones,
      { new: true }
    ).select('-passwordHash');

    // Comprueba si el usuario existe
    if (!usuario) {
      return res.status(404).json({
        message: 'Usuario no encontrado'
      });
    }

    // Confirma la actualización
    return res.status(200).json({
      message: 'Usuario actualizado correctamente',
      usuario
    });
  } catch (error) {
    console.error(error);

    // Comprueba si el correo ya está registrado
    if (error.code === 11000) {
      return res.status(409).json({
        message: 'El correo ya está registrado'
      });
    }

    // Error inesperado al actualizar
    return res.status(500).json({
      message: 'Error al actualizar el usuario'
    });
  }
};

// Eliminar un usuario
export const deleteUsuario = async (req, res) => {
  try {
    // Obtiene el ID del usuario desde la URL
    const { id } = req.params;

    // Busca al usuario y lo elimina
    const usuario = await AuthUser.findByIdAndDelete(id);

    // Comprueba si el usuario existe
    if (!usuario) {
      return res.status(404).json({
        message: 'Usuario no encontrado'
      });
    }

    // Confirma que el usuario fue eliminado
    return res.status(200).json({
      message: 'Usuario eliminado correctamente'
    });
  } catch (error) {
    // Comprueba si el formato del ID es incorrecto
    if (error.name === 'CastError') {
      return res.status(400).json({
        message: 'ID de usuario no válido'
      });
    }

    console.error(error);

    // Error inesperado al eliminar
    return res.status(500).json({
      message: 'Error al eliminar el usuario'
    });
  }
};