import * as service from '../services/produtosService.js'

//Função para criar um novo produto - chama a função criar do service
export async function criar(req, res) {
    try {
        const { nome, preco } = req.body
        
        if (!nome || !preco) {
            return res.status(400).json({ erro: 'campos nome e preco são obrigatótios' })
        }
        const id = await service.criar(req.body)
    } catch (err) {
        res.status(500).json({ erro: err.message })
    }
}

//função para listar todos os produtos
export async function listar(req, res) {
    try {
        const produtos = await service.listar()
        res.json(produtos)
    } catch (err) {
        res.status(500).json({ erro: err.message })
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
        res.status(500).json({ erro: err.message })
    }
}


//função para atualizar os dados de um produto
export async function atualizar(req, res) {
    try {
        const { id } = req.params
        const n = await service.atualizar(id, req.body);

        if (n === 0) {
            return res.status(404).json({ erro: 'Produto não existe' })
        }
        res.json({ id, ...req.body })
    } catch (err) {
        res.status(500).json({ erro: err.message })
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
        res.status(500).json({erro: err.message})
    }
}