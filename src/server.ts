import express, {Request, Response, ErrorRequestHandler} from 'express';
import path from 'path';
import cors from 'cors';
import apiRoutes from './routes/api';

const server = express();
const port = 3333;

server.use(cors({
    origin: ['https://solus-it.com.br/','http://www.quiz.solus-it.com.br/']
}));

server.use(express.static(path.join(__dirname, '../public')));
server.use(express.json());


server.use(apiRoutes);


server.use((req: Request, res: Response) => {
    res.status(404);
    res.json({ error: 'Endpoint not found!' });
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(400); // Bad Request
    console.log(err);
    res.json({ error: 'Something wrong went!' });
}
server.use(errorHandler);


//Localhost PORT settings
server.listen(port, () => {
    console.log(`Running on Port ${port}`);
});