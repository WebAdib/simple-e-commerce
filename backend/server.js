import express from 'express'; // Import the Express framework
import dotenv from "dotenv"; // Import dotenv to load environment variables from a .env file into process.env
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';


dotenv.config();// Load environment variables from the .env file (e.g., database connection URI)

const app = express();// Initialize an Express application

app.use(express.json()); // allow us to access the json data

app.use('/api/products', productRoutes);// Get products

const PORT = process.env.PORT || 5000;





// Start the Express server on port 5000 and log a message when the server is running
app.listen(5000, () => {
    connectDB(); // Connect to the MongoDB database using the provided URI
    console.log('Server started at http://localhost:'+PORT);
});
