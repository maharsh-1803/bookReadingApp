const express = require('express');
const mongoose = require('mongoose');
const adminRoute = require('./routes/admin.route.js'); // Adjust the path accordingly

const app = express();
const URL = "mongodb://localhost:27017/bookReadingApp";

app.use(express.json());

app.use('/api/admin', adminRoute);

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(URL);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};

app.listen(5000, () => {
    connectToMongoDB();
    console.log("Server is running on port 5000");
});
