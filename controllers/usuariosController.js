import * as service from '../services/usuariosService.js'

//função que cria um usuario
export async function registrar(req, res, next) {
    try {
        const { email } = req.body;
        const existe = await service.buscarPorEmail(email);
        if (existe) {
            return res.status(400).json({ erro: 'email em uso' });
        }
        const id = await service.criar(req.body);
        res.status(201).json({ id, email });
    } catch (erro) { next(erro); }
}

//fazer login no sistema
export async function login(req, res, next) {
    try {
        const { email, senha } = req.body;
        const usuario = await service.buscarPorEmail(email);
        if (!usuario) {
            return res.status(401).json({ erro: 'invalido' });
        }
        const ok = await bcrypt.compare(
            senha, usuario.senha_hash
        );
        
        if (!ok) {
            return res.status(401).json({ erro: 'invalido' });
        }

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.json({ token });
    
    } catch (erro) { next(erro); }

}