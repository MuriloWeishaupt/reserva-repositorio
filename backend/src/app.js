import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import users from './database/mockDados.js'
import autenticaJWT from './middleware.js';
import jwt from 'jsonwebtoken'



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
        const token = jwt.sign({ id: user.id, ra: user.ra}, 'segredo', { expiresIn: '1h'})
        res.status(200).json({ token });
    } else {
        res.status(401).json({ message: 'Credenciais Inválidas'});
    };
})


app.post('/reservar', autenticaJWT, (req, res) => {
    res.send('Reserva realizada com sucesso!');
});


app.listen(PORT, () => {
    console.log(`Servidor rodando no endereço: http://localhost:${PORT}`)
})
