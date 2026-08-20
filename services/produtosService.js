import pool from "../config/db";

//função para criar um nivo produto
export async function criar(produto) {
    const { nome, preco, categoria_id } = produto;//propiedades de produto
    const [r] = await pool.query('INSERT INTO produtos (nome,preco,categoria_id)' + 'VALUES(?,?,?)', [nome, preco, categoria_id]);
    return r.insertId
}

//função para listar todos os produtos

export async function listar() {
    const [rows] = await pool.query('SELECT * FROM produtos')
    return rows;
}

// funçaõ para buscar profuto pelo id
export async function buscarPorId(id) {
    const [rows] = await pool.query('SELECT * FROM produtos WHERE id = ?', [id])
    return rows[0]
}

//função para atulaizar os dados de um produto
export async function atualizar(id, produto) {
    const { nome, descricao, preco, quantidade_estoque, categoria_id } = produto
    const [r] = await pool.query('UPDATE produtos SET nome=?,descricao=?, preco=?, quantidade_estoque=?, categoria_id=?', [nome, descricao, preco, quantidade_estoque, categoria_id, id])

    return r.affectedRows;
}

//função para excluir um produto
export async function deletar(id) {
    const [r] = await pool.query('DELETE FROM produtos WHERE id=', [id])
    return r.affectedRows
}