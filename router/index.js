import express from 'express';

// Importa las funciones para gestionar usuarios
import {
  getUsuario,
  postUsuario,
  putUsuario,
  deleteUsuario
} from '../controller/index.js';

// Importa la función para iniciar sesión
import login from '../controller/login.js';

// Crea el enrutador
const router = express.Router();

// Obtener usuarios
router.get('/', getUsuario);

// Guardar un usuario
router.post('/save', postUsuario);

// Actualizar un usuario por su ID
router.put('/put/:id', putUsuario);

// Eliminar un usuario por su ID
router.delete('/delete/:id', deleteUsuario);

// Iniciar sesión
router.post('/login', login);

// Exporta las rutas para usarlas en el servidor
export default router;