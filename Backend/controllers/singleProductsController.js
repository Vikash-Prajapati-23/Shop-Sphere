import product from "../models/productModel.js";

export async function getSingleProduct(req, res) {
    const { id } = req.params; // Fix: match route param name
    try {
        const foundProduct = await product.findById(id); // Use await syntax
        if (!foundProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json(foundProduct);
    } catch (error) {
        console.log(error.message, "error in getting single product");
        return res.status(500).json({ message: "Internal server error" });
    }
}