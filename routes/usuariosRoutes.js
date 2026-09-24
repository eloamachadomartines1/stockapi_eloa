import express from 'express'
import * as controller from '../controllers/usuariosController.js'


const router = express.Router()

router.post('/usuarios/registro', controller.registrar);
router.post('/usuarios/login', controller.login)


export default router;