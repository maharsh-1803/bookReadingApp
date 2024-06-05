const Category = require('../model/category.model.js');
const addCategory = async(req,res)=>{
    
    const category = new Category(req.body)
    try {
        await category.save();
        return res.status(201).send(category)
    } catch (error) {
        return res.status(400).send({error:error.message})
    }
}

const deleteCategory = async(req,res)=>{
    const {id} = req.params
    try {
        const category = await Category.findByIdAndDelete(id);
        if(!category)
        {
            return res.status(404).send({message:"Category doesn't exists"})
        }
        return res.send(category);
    } catch (error) {
        return res.send(400).send(error.message)
    }
}

const updateCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
    
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        
        if (req.body.category_name != null) {
            category.category_name = req.body.category_name;
        }
        
        const updatedCategory = await category.save();
    
        return res.status(200).json(updatedCategory);   
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const readAllCategory = async (req,res)=>{
    try {
        const category = await Category.find();
        if(!category){
            return res.status(500).json({message:"no any category"})
        }
        return res.json(category);
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

module.exports = {
    addCategory,
    deleteCategory,
    updateCategory,
    readAllCategory
}