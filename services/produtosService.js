import pool from "../config/db.js";

const CAMPOS_PRODUTO = ['nome', 'descricao', 'preco', 'quantidade_estoque', 'categorias_id']
//função para criar um nivo produto
export async function criar(produto) {
    const { nome, descricao, preco, quantidade_estoque, categorias_id } = produto;//propiedades de produto
    const [r] = await pool.query(' INSERT INTO produtos (nome, descricao, preco, quantidade_estoque, categorias_id) ' +  ' VALUES(?,?,?,?,?)', [nome, descricao ?? null, preco, quantidade_estoque ?? 0, categorias_id]);
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
export async function atualizar(id, camposAtualizados) {
   const camposParaAtualizar = Object.keys(camposAtualizados).filter((campo) => CAMPOS_PRODUTO.includes(campo))

   const setClause = camposParaAtualizar.map((campo) => `${campo} = ?`).join(', ')

   const valores = camposParaAtualizar.map((campo) => camposAtualizados[campo]);

   const [r] = await pool.query(
    `UPDATE produtos set ${setClause} WHERE id =?`,
    [...valores, id] // o .. espalha o conteudo do array valores
   )

   return r.affectedRows;
}

//função para excluir um produto
export async function deletar(id) {
    const [r] = await pool.query('DELETE FROM produtos WHERE id=', [id])
    return r.affectedRows
}