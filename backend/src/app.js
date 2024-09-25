import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import users from './database/mockDados.js'

const app = express()
const PORT = 3001

app.use(cors());
app.use(bodyParser.json())

app.post('/api/login', (req, res) => {
    console.log('Requisição recebida:', req.body);
    const { email, senha, ra} = req.body;

    const user = users.find(
        (user) => user.email === email && user.senha === senha && user.ra === ra
    );

    if (user) {
        res.status(200).json({ id: user.id, ra: user.ra});
    } else {
        res.status(401).json({ message: 'Credenciais Inválidas'});
    };
})

app.listen(PORT, () => {
    console.log(`Servidor rodando no endereço: http://localhost:${PORT}`)
})
