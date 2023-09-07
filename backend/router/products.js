const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Products = require("../model/product.model");

const Storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/images")
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname+"-"+Date.now()+path.extname(file.originalname))
    }

})

const upload = multer({storage: Storage})

router.post("/add-product", upload.single("imageFile"), (req, res)=>{
    const imgfile = req.file.filename;
    const name = req.body.name;
    const colorram = req.body.colorram;
    const rate = req.body.rate;
    const color = req.body.color;
    const offPrice = req.body.offPrice;
    const type = req.body.type;
    console.log(name)
    console.log(req.body.name)




    const newProduct = new Products({
        imgPath: imgfile,
        name: name,
        colorram: colorram,
        rate: rate,
        color: color,
        offPrice: offPrice,
        type: type,
       
    })
    console.log(name)
    console.log(req.body.name)


    newProduct.save()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(400).json(err);
    })

})

router.get("/", (req, res) => {
    Products.find()
    .then(data =>{
        res.status(200).json(data);
    })
    .catch(err =>{
        res.status(400).json(err);
    })
})

router.post("/update-product", upload.single("imageFile"), (req, res)=>{
    Products.findById(req.body.id)
    .then((updateItem) =>{        
        updateItem.name= req.body.name,
        updateItem.colorram= req.body.colorram,
        updateItem.rate= req.body.rate,
        updateItem.color=req.body.color,
        updateItem.offPrice= req.body.offPrice,
        updateItem.type= req.body.type
        if(req.file){
            updateItem.imgPath = req.file.filename;
        }

        updateItem.save()
        .then(data =>{
            res.status(200).json(data);

        })
        .catch(err =>{
            res.status(400).json(err)
        })
    })
    .catch(err =>{
        res.status(400).json(err);
    })
})


module.exports = router;
