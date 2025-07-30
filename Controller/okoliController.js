import {Okoli} from "../Modules/okoliModule.js";

//GET ALL PRODUCT
export const getOkoli = async (req, res) => {
    try {
        const family = await Okoli.find({});
        res.status(200).json(family)
    } catch (error) {
     res.status(500).json({message: error.message});   
    }
};


export const  getOkoliById = async (req, res) => {
    try {
        const {id} = req.params;
        const family = await Okoli.findById(id);
        res.status(200).json(family);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

 export const findByIdAndUpdate = async (req,res) => {
    try {
        const {id} = req.params;
        const updatedfamily = await Okoli.findByIdAndUpdate(id, req.body);
        if (!updatedfamily) {
            return res.status(404).json({message:"Product not found"});
        }
        res.status(200).json(updatedfamily);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

export const Create = async (req,res) => {
    try{
        const family = await Okoli.create(req.body);
        res.status(200).json(family);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const findByIdAndDelete = async (req,res) => {
    try {
        const {id} = req.params;
        const family = await Okoli.findByIdAndDelete(id, req.body);
        if (!family) {
            return res.status(404).json({message:"Product not found"});
        }
        res.status(200).json({ message: "Product Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}
