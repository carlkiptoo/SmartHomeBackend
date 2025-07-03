import express from 'express';
import morgan from 'morgan';
import lightingRoutes from './routes/lightingRoutes.js';
import errorHandler from './middlewares/errorHandler.js';


const app = express();


app.use(express.json());
app.use(morgan('dev'));

app.use('/api/lighting', lightingRoutes);

app.use((req, res, next) =>{
    const error = new Error(`Not found ~ ${req.originalUrl}`);
    error.status = 404;
    next(error);
})

app.use(errorHandler);

export default app;