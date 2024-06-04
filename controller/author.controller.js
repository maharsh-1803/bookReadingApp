const Author = require('../model/author.model.js');
const generateToken = require('../token/generateToken.js');

const registerAuthor = async(req,res)=>{
    const {name,dob,city,state,country,gender,status,mobile,email} = req.body
    const file = req.file;
    try {
        const newAuthor = new Author({
            name,
            dob,
            city,
            state,
            country,
            gender,
            photo:file.filename,
            status,
            mobile,
            email
        })
        const tokenData = await generateToken({ _id: Author._id });

        
        await newAuthor.save();
        res.status(201).json({
            newAuthor,
            token:tokenData.token
        });
    } catch (error) {
        res.status(400).send({error:error.message})
    }
}

const profileDisplay = async(req,res)=>{
    const {id} = req.params;
    try {
        const author = await Author.findById(id);
        res.status(200).send(author)
    } catch (error) {
        res.status(400).send({error:error.message})
    }
}

const loginAuthor = async(req,res)=>{
    const {mobile,name} = req.body;
    if(!mobile || !name)
    {
        res.status(400).json({message:"please provide name and mobile number"})
    }
    try {
        const author = await Author.findOne({mobile,name})
        if(!author)
        {
            return res.status(400).json({message:"invalid credetials"})
        }
        const tokenData = await generateToken({ _id: Author._id });


        res.status(200).json({message:"login successfully",author,token:tokenData.token})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
    
}

const allAuthor = async(req,res)=>{
    try {
        const author = await Author.find();
        if(!author)
        {
            res.status(400).send({message:"no any author"})
        }
        res.status(200).send(author)
    } catch (error) {
        res.status(400).send({error:error.message})
    }
}

const authorDetail = async(req,res)=>{
    const {id} = req.params;
    try {
        const author = await Author.findById(id)
        if(!author){
            res.status(404).send({message:"author not found with this id"})
        }
        res.status(200).send(author);
    } catch (error) {
        res.status(400).send({error:error.message})
    }
}

const changeStatus = async(req,res)=>{
    const {id} = req.params
    const {status} = req.body
    try {
        const author = await Author.findById(id);
        if(!author)
        {
            res.status(400).send({message:"author not found with this id"})
        }
        author.status = status;
        await author.save();
        res.status(200).send(author)
        
    } catch (error) {
        res.status(400).send({error:error.message})
    }
}

module.exports = {
    registerAuthor,
    profileDisplay,
    loginAuthor,
    allAuthor,
    authorDetail,
    changeStatus
}