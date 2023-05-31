import { Router } from 'express';
import auth from './routes/userRoute';
import user from './routes/userRoute';
import rota from './routes/rotaRoute'
import camiao from './routes/camiaoRoute'
import planeamento from './routes/planeamentoRoute'

export default () => {
	const app = Router();

	auth(app);
	user(app);
	rota(app);
	camiao(app);
	planeamento(app);
	
	return app
}