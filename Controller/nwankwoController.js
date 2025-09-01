import {Nwankwo} from "../Modules/nwankwoModule.js";

//GET ALL PRODUCT
export const getNwankwo = async (req, res) => {
    try {
        const family = await Nwankwo.find({});
        res.status(200).json(family)
    } catch (error) {
     res.status(500).json({message: error.message});   
    }
};

// export const updateNwankwo = async (req, res) => {
//     try {
//         const family = await Nwankwo.updateMany({}, {$set:{"residence":""}});
//         res.status(200).json(family)
//     } catch (error) {
//      res.status(500).json({message: error.message});   
//     }
// };


export const  getNwankwoById = async (req, res) => {
    try {
        const {id} = req.params;
        const family = await Nwankwo.findById(id);
        res.status(200).json(family);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};


 export const findByIdAndUpdate = async (req,res) => {
    try {
        const {id} = req.params;
        const updatedfamily = await Nwankwo.findByIdAndUpdate(id, req.body);
        if (!updatedfamily) {
            return res.status(404).json({message:"Product not found"});
        }
        res.status(200).json(updatedfamily);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};


export const Create = async (req, res) => {
  try {
    const family = await Nwankwo.create(req.body);

    res.status(201).json({
      success: true,
      message: "Family member created successfully",
      data: { family }, // model wrapped inside "data"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const findByIdAndDelete = async (req,res) => {
    try {
        const {id} = req.params;
        const family = await Nwankwo.findByIdAndDelete(id, req.body);
        if (!family) {
            return res.status(404).json({message:"Product not found"});
        }
        res.status(200).json({ message: "Product Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}

// module.exports = {
//     getNwankwo,
//     getNwankwoById,
//     findByIdAndUpdate,
//     Create,
//     findByIdAndDelete
// }