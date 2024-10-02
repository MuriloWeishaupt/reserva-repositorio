import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import users from './database/mockDados.js'
import autenticaJWT from './middleware.js';
import jwt from 'jsonwebtoken'
import reservas from './database/reservas.js';



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
        const token = jwt.sign({ id: user.id, ra: user.ra, nome: user.nome}, 'segredo', { expiresIn: '1h'})
        res.status(200).json({ token, nome: user.nome });
    } else {
        res.status(401).json({ message: 'Credenciais Inválidas'});
    };
})

app.post('/quadro-reservas', autenticaJWT, (req, res) => {
    res.send('Reserva realizada com sucesso!');
});

app.post('/api/reservas', (req, res) => {

    const {id,  professor, data, horarioEntrada, horarioSaida, numeroPessoas, descricao, turma, bloco} = req.body

    if (!professor || !data || !horarioEntrada || !horarioSaida || !numeroPessoas || !descricao || turma || bloco) {
        return res.status(400).json({ message: 'Registre todos os campos'})
    }
    
    const horarioConflito = reservas.find(reserva => {
        return reserva.data === data &&
               ((horarioEntrada >= reserva.horarioEntrada && horarioEntrada < reserva.horarioSaida) ||
               (horarioSaida > reserva.horarioEntrada && horarioSaida <= reserva.horarioSaida));
    });

    if (horarioConflito) {
        return res.status(400).json({ message: 'Horário de reserva indisponível' });
    }



    const novaReserva = {
        id: reservas.length + 1,
        professor,
        data,
        horarioEntrada,
        horarioSaida,
        numeroPessoas,
        descricao,
        turma,
        bloco,
    }


    reservas.push(novaReserva)
    res.status(200).json({ message: 'Reserva criada com sucesso: ', novaReserva})
})

app.get('/api/reservas', (req, res) => {
    res.status(200).json(reservas)
})


app.listen(PORT, () => {
    console.log(`Servidor rodando no endereço: http://localhost:${PORT}`)
})
