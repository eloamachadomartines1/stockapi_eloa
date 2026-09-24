export function validarCliente(req, res, next) {
  const { nome, email } = req.body;
  const erros = []; // vamos juntando aqui os problemas encontrados

  // nome precisa existir, ser string, e não pode ser só espaços em branco
  if (!nome || typeof nome !== 'string' || !nome.trim()) {
    erros.push('nome é obrigatório e deve ser um texto');
  }

  // email é opcional (pode não vir, ou vir null) — mas SE vier, precisa
  // ser um texto não vazio.
  if (email !== undefined && email !== null && (typeof email !== 'string' || !email.trim())) {
    erros.push('email, se enviado, deve ser um texto não vazio');
  }

  // Se juntamos pelo menos um erro, a requisição para aqui com 400 Bad
  // Request e a lista de tudo que está errado.
  if (erros.length > 0) {
    return res.status(400).json({ erros });
  }

  // Passou em todas as checagens: segue para o controller.
  next();
}