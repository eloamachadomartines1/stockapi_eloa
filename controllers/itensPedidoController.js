

import * as service from '../services/itensPedidoService.js';

export async function criar(req, res, next) {
  try {
    const id = await service.criar(req.body);
   
    res.status(201).json({ id, ...req.body });
  } catch (erro) {
    next(erro);
  }
}

// GET /itens_pedido
export async function listar(req, res, next) {
  try {
    const itens = await service.listarTodos();
    res.json(itens); // 200 OK é o status padrão, não precisa escrever
  } catch (erro) {
    next(erro);
  }
}

// GET /itens_pedido/:id
export async function buscarPorId(req, res, next) {
  try {
    const { id } = req.params; // o :id da URL vem aqui
    const item = await service.buscarPorId(id);

    if (!item) {
     
      return res.status(404).json({ erro: 'Item de pedido não encontrado' });
    }

    res.json(item);
  } catch (erro) {
    next(erro);
  }
}

// PUT /itens_pedido/:id

export async function atualizar(req, res, next) {
  try {
    const { id } = req.params;

    
    const itemExistente = await service.buscarPorId(id);
    if (!itemExistente) {
      return res.status(404).json({ erro: 'Item de pedido não encontrado' });
    }

    await service.atualizar(id, req.body);
    res.json({ id, ...req.body });
  } catch (erro) {
    next(erro);
  }
}

// DELETE /itens_pedido/:id
export async function deletar(req, res, next) {
  try {
    const { id } = req.params;
    const linhasRemovidas = await service.deletar(id);

    if (linhasRemovidas === 0) {
      return res.status(404).json({ erro: 'Item de pedido não encontrado' });
    }

   
    res.status(204).send();
  } catch (erro) {
    next(erro);
  }
}