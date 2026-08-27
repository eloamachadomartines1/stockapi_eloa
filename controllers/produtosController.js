import * as service from '../services/produtosService.js'

//Função para criar um novo produto - chama a função criar do service
export async function criar(req, res) {
    try {
        const id = await service.criar(req.body)
        res.status(201).json({id, ...req.body})
    } catch (err) {
        next(err)
    }
}

//função para listar todos os produtos
export async function listar(req, res) {
    try {
        const produtos = await service.listar()
        res.json(produtos)
    } catch (err) {
        next(err)
    }
}

//função para buscar produto pelo id
export async function buscarPorId(req, res) {
    try {
        const { id } = req.params
        const produto = await service.buscarPorId(id)

        if (!produto) {
            return res.status(404).json({ erro: 'Produto não encontrado!' })
        }
        res.json(produto)
    } catch (err) {
        next(err)
    }
}


//função para atualizar os dados de um produto
export async function atualizar(req, res) {
    try {
        const { id } = req.params

        const produtoExistente = await service.buscarPorId(id)
        if(!produtoExistente){
            return res.status(404).json({err: "Produto nao encontardo"})
        }
        await service.atualizar(id, req.body)
        
        const  produtoAtualizado = await service.buscarPorId(id)
        res.json({ produtoAtualizado })

    } catch (err) {
        next(err)
    }
}

//funções para excluir um produto
export async function deletar(req, res) {
    try{
        const [id] = req.params
        const n = await service.deletar(id)

        if(n===0){
            return res.status(404).json({erro: 'Produto não existe'})
        }
        res.status(204).send()
    }catch(err){
        next(err)
    }
}