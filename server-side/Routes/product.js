const express = require("express")
const productModel = require("../Models/Product")
const UserModel = require("../Models/User");

const router = express.Router();

router.get("/", async (req, res) =>{
    try{
        const response = await productModel.find({})
        res.json(response)
    }catch (err){
        console.error(err)
    }
})

router.post("/add-product", async (req, res) => {
     const productData = {
        name: req.body.name,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        stock: req.body.stock,
        description: req.body.description,
        category: req.body.category,
        Sizes:{
            small: req.body.Sizes.small,
            medium: req.body.Sizes.medium,
            large: req.body.Sizes.large,
        },
        userOwner: req.body.userOwner,
        userOwnerName: req.body.userOwnerName,
     }  
    const product = new productModel(productData)
    console.log(product);


    try {
      const response = await product.save();
      res.json(response);
    } catch (err) {
      res.json(err);
    }
  });

  router.get("/product/id/:productID", async (req, res) =>{
    try{
      const response = await productModel.findById( req.params.productID);
       res.json(response)
    }
    catch(err){
      console.error(err)
    }
  })

   router.put("/", async (req, res) =>{
    try{
        const product = {
          productId: req.body.selectedProductID,
    productName: req.body.productName,
    productStock: req.body.productStock,
    productPrice: req.body.productPrice,
    productSize: req.body.productSize,
    productImageUrl: req.body.productImageUrl
};
         const productData = await productModel.findById(product.productId) 
         productData.stock -= product.productStock;

    // Save the updated product data
    await productData.save();
        
        const user = await UserModel.findById(req.body.userID)
        user.cartProducts.push(product);
        await user.save();
        res.json({cartProducts: user.cartProducts, message: "Data saved successfully."})

    }catch(err){
      console.error(err)
    }
   })

   router.get("/cartProducts/ids/:userID", async (req, res) =>{
    try{
        const user = await UserModel.findById(req.params.userID);
        res.json({cartProducts: user?.cartProducts})
    }catch (err){
        res.json(err)
    }
})
router.get("/cartProducts/:userID", async(req, res) =>{
  try{
    const user = await UserModel.findById(req.params.userID);
    res.json({cartProducts: user.cartProducts})
      }catch (err){
      res.json(err)
  }
})
   
  router.get("/myProducts/ids/:userID", async (req, res) =>{
    try{
      const userOwner = req.params.userID;
         const products = await productModel.find({userOwner})
         res.json(products)
    }catch(err){
      console.error(err)
    }
  })
  
  router.get("/cartProducts/:userID", async(req, res) =>{
    try{
        const user = await UserModel.findById(req.params.userID);
        const savedRecipes = await RecipesModel.find({
            _id:{$in: user.savedRecipes},
        })
        res.json({savedRecipes});
    }catch (err){
        res.json(err)
    }
})

router.delete("/cartProducts/:userID/:productID", async (req, res) => {
  try {
    const userID = req.params.userID;
    const productID = req.params.productID;
    const productStock = req.query.productStock;
    const productData = await productModel.findById(productID)

    const productStockFull =  Number(productData.stock) + Number(productStock);
    productData.stock = productStockFull;
    await productData.save();
    
      const updatedUser = await UserModel.findByIdAndUpdate(
      userID,
      { $pull: { cartProducts: { productId: productID } } },
      { new: true } 
    );

    res.json({ message: 'Product removed from the cart', updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get("/updateProduct/id/:productID", async (req, res)=>{
  try{
    const response = await productModel.findById( req.params.productID);
      res.json(response)
  }catch(err){
    console.error(err)
  }
})

router.put("/updateProduct/:productID", async (req, res)=>{
  try{
    const id = req.params.productID;

    const productData = {
      name: req.body.name,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
      stock: req.body.stock,
      description: req.body.description,
      category: req.body.category,
      Sizes:{
          small: req.body.Sizes.small,
          medium: req.body.Sizes.medium,
          large: req.body.Sizes.large,
      },
      userOwner: req.body.userOwner,
      userOwnerName: req.body.userOwnerName,
   }  
     await productModel.findByIdAndUpdate({_id: id},productData)
    res.json({message: "data updated successfully"})
      
  }catch(err){
    console.error(err)
  }
})

module.exports = router