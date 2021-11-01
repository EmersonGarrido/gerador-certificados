import { response, Router } from 'express'
import Certificado from './certificado.route';

const routes = Router();

routes.use('/certificado/', Certificado)

export default routes