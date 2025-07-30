import Family from "../Modules/familyModule" // Product

//GET ALL FAMILY
const getNwankwos = async (req, res) => { //getProducts
    try {
        const family = await Family.find({}); //product
        res.status(200).json(family)
    } catch (error) {
     res.status(500).json({message: error.message});   
    }
};

// GET BY ID
const getNwankwosById = async (req, res) => { //getProductById
    try {
        const {id} = req.params;
        const family = await Family.findById(id);
        res.status(200).json(family);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};


// UPDATE BY ID
const NwankwosByIdAndUpdate = async (req,res) => {
    try {
        const {id} = req.params;
        const updatedFamily = await Family.findByIdAndUpdate({id}, req.body);
        if (! updatedFamily) {
            return res.status(404).json({message:"family not found"});
        }
        res.status(200).json(updatedFamily);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

// POST REQUEST
const CreateNwankwos = async (req,res) => {
    try{
        const family = await Family.create(req.body);
        res.status(200).json(family);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


// DELETE BY ID
const NwankwosByIdAndDelete = async (req,res) => {
    try {
        const {id} = req.params;
        const family = await Family.findByIdAndDelete({id}, req.body);
        if (!family) {
            return res.status(404).json({message:"Family not found"});
        }
        res.status(200).json({ message: "Family Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}

module.exports = {
    getNwankwos,
    getNwankwosById,
    NwankwosByIdAndUpdate,
    CreateNwankwos,
    NwankwosByIdAndDelete
}