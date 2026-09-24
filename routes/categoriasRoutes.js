import express from 'express'
import * as controller from '../controllers/categoriasController.js'

import { validarCategoria } from '../middlewares/validarCategoria.js'

const router = express.Router()

router.post('/categoria', validarCategoria, controller.criar)
router.get('/categorias', controller.listar)
router.get('/categorias/:id', controller.buscarPorId)
router.put('/categoria/:id', validarCategoria, controller.atualizar)
router.delete('/categoria/:id', controller.deletar)

export default router;