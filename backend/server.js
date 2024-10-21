import express from 'express'; // Import the Express framework
import dotenv from "dotenv"; // Import dotenv to load environment variables from a .env file into process.env
import path from 'path'; //
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';



dotenv.config();// Load environment variables from the .env file (e.g., database connection URI)

const app = express();// Initialize an Express application
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json()); // allow us to access the json data

app.use('/api/products', productRoutes);// Get products

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    });
}




// Start the Express server on port 5000 and log a message when the server is running
app.listen(5000, () => {
    connectDB(); // Connect to the MongoDB database using the provided URI
    console.log('Server started at http://localhost:'+PORT);
});
