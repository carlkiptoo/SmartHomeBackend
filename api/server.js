import app from './app.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI).then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    })
}).catch((err) => {
    console.log('Error connecting to MongoDB:', err);
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});