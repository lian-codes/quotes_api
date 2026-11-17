import express from 'express';

import quoteRouter from './routes/qouteRouter.js';
import  biodataRouter from './routes/biodataRouter.js';


const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use('/api/quotes', quoteRouter);
app.use('/api/biodata', biodataRouter);


// export app for use in main.js and for testing
export { app };

