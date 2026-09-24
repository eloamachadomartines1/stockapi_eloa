import express from 'express'
import * as controller from '../controllers/usuariosController.js'


const router = express.Router()

router.post('/usuarios', controller.registrar);


export default router;