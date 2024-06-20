const Book = require("../model/book.model");
const User = require("../model/user.model");

const registerUser = async(req,res)=>{
    const user = new User(req.body);
    try {
        await user.save();
        return res.status(200).send(user);
    } catch (error) {
        return res.status(400).send({error:error.message});
    }
}
const loginUser = async (req, res) => {
    const { reg_from, reg_id } = req.body;
    try {
        const user = await User.findOne({ reg_from, reg_id });
        if (!user) {
            return res.status(400).send({ message: "user not found" });
        }
        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const allBook = async(req,res)=>{
    try {
        const books = await Book.find()
        if(!books)
        {
            return res.status(400).send({message:"No any book available"});
        }
        return res.status(200).send(books);
    } catch (error) {
        return res.status(400).send({error:error.message});
    }
}

const bookDetail = async(req,res)=>{
    const {id} = req.params;
    try {
        const book = await Book.findOne(id)
        if(!book)
        {
            return res.status(400).send({message:"book not found"})
        }
        return res.status(200).send(book)
    } catch (error) {
        return res.status(400).send({error:error.message});
    }
}

const allUser = async(req,res)=>{
    try {
        const users = await User.find();
        if(!users)
        {
            return res.status(400).send({message:"no any user available"})
        }
        return res.status(200).send(users);
    } catch (error) {
        return res.status(400).send({error:error.message})
    }
}

const userDetail = async(req,res)=>{
    const {id} = req.params;
    try {
        const user = await User.find(id);
        if(!user)
        {
            return res.status(400).send({message:"user not found"});
        }
        return res.status(200).send(user)
    } catch (error) {
        return res.status(400).send({error:error.message})
    }
}


module.exports = {
    loginUser,
    registerUser,
    allBook,
    bookDetail,
    allUser,
    userDetail
}