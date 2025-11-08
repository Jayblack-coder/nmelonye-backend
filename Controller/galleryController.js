import { Gallery } from "../Modules/galleryModule.js";

export const uploadGalleryImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No image uploaded" });

    const newImage = new Gallery({
      imageUrl: req.file.path,
      caption: req.body.caption || "",
    });

    await newImage.save();
    res.status(201).json({ message: "Image uploaded successfully", data: newImage });
  } catch (error) {
    res.status(500).json({ message: "Error uploading image", error: error.message });
  }
};

export const getAllGalleryImages = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: "Error fetching images", error: error.message });
  }
};
