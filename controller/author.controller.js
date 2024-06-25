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
        return res.status(201).json({
            newAuthor,
            token:tokenData.token
        });
    } catch (error) {
        return res.status(400).send({error:error.message})
    }
}

const profileDisplay = async (req, res) => {
    const { id } = req.params;
    const baseURL = 'https://bookingreadingapp.onrender.com/uploads'; 

    try {
        const author = await Author.findById(id);

        if (!author) {
            return res.status(404).send({ error: 'Author not found' });
        }

        let authorWithPhotoURL = {
            ...author._doc,
            photoURL: author.photo ? `${baseURL}/${author.photo}` : null
        };

        return res.status(200).send(authorWithPhotoURL);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
};


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


// const editAuthor = async (req, res) => {
//     const { id } = req.params;
//     const updateFields = req.body; 
//     console.log(req.body);
//     const file = req.file; 

//     try {
//         let author = await Author.findById(id);
//         if (!author) {
//             return res.status(404).send({ message: "Author not found with this ID" });
//         }
//         if (updateFields.name) {
//             author.name = updateFields.name;
//         }
//         if (updateFields.dob) {
//             author.dob = updateFields.dob;
//         }
//         if (updateFields.city) {
//             author.city = updateFields.city;
//         }
//         if (updateFields.state) {
//             author.state = updateFields.state;
//         }
//         if (updateFields.country) {
//             author.country = updateFields.country;
//         }
//         if (updateFields.gender) {
//             author.gender = updateFields.gender;
//         }
//         if (updateFields.status) {
//             author.status = updateFields.status;
//         }
//         if (updateFields.mobile) {
//             author.mobile = updateFields.mobile;
//         }
//         if (updateFields.email) {
//             author.email = updateFields.email;
//         }

//         if (file) {
//             author.photo = file.filename;
//         }
        
//         await author.save();

//         res.status(200).json({ message: "Author updated successfully", author });
//     } catch (error) {
//         res.status(400).send({ error: error.message });
//     }
// }
const editAuthor = async (req, res) => {
    const { id } = req.params;
    const updateFields = { ...req.body }; 
    const file = req.file; 

    try {
        let author = await Author.findById(id);
        if (!author) {
            return res.status(404).send({ message: "Author not found with this ID" });
        }
        if (file) {
            updateFields.photo = file.filename;
        }

        // Find and update the author
        author = await Author.findByIdAndUpdate(id, updateFields, { new: true });

        res.status(200).json({ message: "Author updated successfully", author });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

const deleteAuthor = async(req,res)=>{
    const {id} = req.params;
    try {
        const author = await Author.findByIdAndDelete(id);
        res.status(200).send(author);
    } catch (error) {
        res.status(400).send({error:error.message})
    }
}


module.exports = {
    registerAuthor,
    profileDisplay,
    loginAuthor,
    allAuthor,
    editAuthor,
    deleteAuthor
}