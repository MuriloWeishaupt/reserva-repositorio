import * as chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js';
import Professor from '../src/models/professores.js';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Teste da API de login', () => {
    let professorCriado;

    beforeEach(async () => {
        professorCriado = await Professor.create({
            nome: 'Francalino Bigas da Silva',
            email: 'misterbigas@gmail.com',
            senha: 'bigas123',
            ra: 202020,
        });
    });

    afterEach(async () => {
        if (professorCriado) {
            await Professor.deleteOne({ _id: professorCriado._id });
        }
    });

    it('Autentica usuário e retorna token JWT', (done) => {
        chai.request(app)
            .post('/api/login')
            .send({ email: 'misterbigas@gmail.com', senha: 'bigas123' })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('token');
                expect(res.body).to.have.property('nome', 'Francalino Bigas da Silva');
                done();
            });
    });

    it('Retorna erro 401 devido a credenciais inválidas', (done) => {
        chai.request(app)
            .post('/api/login')
            .send({ email: 'misterbigas@gmail.com', senha: 'senhaErrada123' })
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.have.property('message', 'Credenciais inválidas'); // Corrigido
                done();
            });
    });
});
