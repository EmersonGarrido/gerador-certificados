import { Router } from 'express'
import Queue from '../libs/Queue';
const certificadoRoute = Router();

interface UserProps {
  nome: string;
  email: string;
}

certificadoRoute.post("/cards/feed", async (request, response) => {
  var Data = require('./certificados_01.json');
  // var Data = require('./teste.json');

  const mapping = Data.map(async (isUser: UserProps) => {

    const full_name = isUser.nome;
    const email = isUser.email;

    const user = {
      full_name,
      email,
    }
    console.log(`Criando certificado da ${isUser.nome}`);

    await Queue.add('CreatePDF', { user });

  })
  return response.send({
    message: "sucess",
  });

});


export default certificadoRoute