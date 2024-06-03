const express = require('express');
const mongoose = require('mongoose');
const adminRoute = require('./routes/admin.route.js'); // Adjust the path accordingly
const categoryRoute = require('./routes/category.route.js')
require('dotenv').config()

const app = express();


app.use(express.json());

app.use('/api/admin', adminRoute); 
app.use('/api/category',categoryRoute) ;

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};
const PORT = process.env.PORT
app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on port ${PORT}`);
});