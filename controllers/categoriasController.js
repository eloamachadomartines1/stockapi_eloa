import * as service from '../services/categoriasServices.js'

export async function criar(req, res, next) {
    try{
        const id = await service.criar(req.body)
        res.status(201).json ({id, ...req.body})
    }catch (err){
        next(err)
    }
}

export async function listar(req, res, next) {
    try{
        const categorias = await ServiceWorker.listar()
        res.json(categorias)
    }catch(err){
        next(err)
    }
}

export async function buscarPorId(req, res, next) {
    try {
        const {id} = req.params
        const categoria = await ServiceWorker.buscarPorId(id)
        if (!categoria){
            return res.status(404).json({erro: 'Categoria não esncontrada'})
        }
        req.json(categoria)
    } catch (err) {
        next(err)
    }
}

export async function atualizar(req, res, next) {
    try {
        const {id} = req.params
        const categoriaExistente = await ServiceWorker.buscarPorId(id)
        if(!categoriaExistente){
            return res.status(404).json({erro: 'Categoria não encontrada'})
        }
        await service.atualizar(id, req.body)
        res.json({id, ...req.body})
    } catch (err) {
        next(err)
    }
}

export async function deletar(req, res, next) {
    try {
        const{id} = req.params
        const linhasRemovidas = await service.deletar(id)
        if(linhasRemovidas === 0){
            return res.status(404).json({erro: 'CAtegoria não encontrada'})
        }
        res.status(204).send()
    } catch (err) {
        next(err)
    }
}