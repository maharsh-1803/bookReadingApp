const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path')
// const multer = require('multer')
// const upload = multer();
const adminRoute = require('./routes/admin.route.js'); // Adjust the path accordingly
const categoryRoute = require('./routes/category.route.js')
const authorRoute = require('./routes/author.route.js')
const bookRoute = require('./routes/book.route.js')
const userRoute = require('./routes/user.router.js')
const bookMark = require('./routes/bookmark.route.js')
const readBook = require('./routes/readBook.route.js')
require('dotenv').config()

const app = express();

app.use('/uploads', (req, res, next) => {
    console.log(`Serving static file: ${req.url}`);
    next();
  });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
// app.use(upload.array());

app.use('/api/admin', adminRoute); 
app.use('/api/category',categoryRoute);
app.use('/api/author',authorRoute);
app.use('/api/book',bookRoute);
app.use('/api/user',userRoute);
app.use('/api/bookmark',bookMark);
app.use('/api/read',readBook);

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB is connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};
const PORT = process.env.PORT
app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on port ${PORT}`);
});