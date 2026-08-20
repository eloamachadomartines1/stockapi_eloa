import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import produtosRoutes from './routes/protudosRoutes.js'


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1/stockapi', produtosRoutes)
//app.get('/', (req, res) => res.send('StockAPI no ar'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
