import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AuthUser from '../models/index.js';

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: 'Todos los campos son obligatorios'
      });
    }

    if (typeof username !== 'string' ||
        typeof email !== 'string' ||
        typeof password !== 'string') {
      return res.status(400).json({
        message: 'Los campos deben tener un formato válido'
      });
    }

    const existingUser = await AuthUser.findOne({
      email: email.trim().toLowerCase()
    });

    if (existingUser) {
      return res.status(409).json({
        message: 'El correo ya está registrado'
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = new AuthUser({
      username,
      email,
      passwordHash
    });

    await user.save();

    return res.status(201).json({
      message: 'Usuario registrado correctamente',
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: 'El correo ya está registrado'
      });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Los datos del usuario no son válidos'
      });
    }

    return res.status(500).json({
      message: 'Error al registrar el usuario'
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: 'Correo y contraseña son obligatorios'
      });
    }

    const user = await AuthUser.findOne({
      email: email.trim().toLowerCase()
    }).select('+passwordHash');

    if (!user) {
      return res.status(401).json({
        message: 'Credenciales incorrectas'
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: 'Credenciales incorrectas'
      });
    }

    const token = jwt.sign(
      {
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        subject: user._id.toString(),
        expiresIn: process.env.JWT_EXPIRES_IN || '1h'
      }
    );

    return res.status(200).json({
      message: 'Inicio de sesión correcto',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al iniciar sesión'
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await AuthUser.findById(req.user.sub);

    if (!user) {
      return res.status(404).json({
        message: 'Usuario no encontrado'
      });
    }

    return res.status(200).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al obtener el perfil'
    });
  }
};
