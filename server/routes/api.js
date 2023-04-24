const express = require('express');
const router = express.Router();
const Products = require("../models/Products");
const Cart = require("../models/Cart")
const MongoClient = require('mongodb').MongoClient;
const CartSave = require("../models/CartSave")


router.get('/getCartSave', (req, res) => {
    CartSave.find()
        .then(product => res.json(product))
        .catch(err => res.status(404).json({ err: "No products found" }));
});

router.get('/getProducts',async (req, res) => {

    let {page,limit}=req.query
    console.log("page",page);
    if(page==0)
    page=1 
    console.log(page);
    const skip=(page-1)*10;
    if(!limit) limit=10;
    
    await Products.find().skip(skip).limit(limit).then(product => res.json(product))
    .catch(err => res.status(404).json({ err: "No products found" }));
});

router.get('/getCart', (req, res) => {
    Cart.find()
        .then(product => res.json(product))
        .catch(err => res.status(404).json({ err: "No products found" }));
});

router.post('/registerProducts', async (req, res) => {
    try {
        const { id, image, description, type, brand, size, price, category } = req.body;

        if (!id || !image || !description || !type || !brand || !size || !price || !category) {
            res.status(400).send({ err: "Please enter all fields." });
        } else {
                const newProduct = new Products({
                id: id,
                image: image,
                description: description,
                type: type,
                brand: brand,
                size: size,
                price: price,
                category: category

            });


            await newProduct.save();
            res.status(201).send({ message: "successful" })

        }
    }
    catch (error) {
        res.status(400).send({ err: "error" })
    }
})


update_cart_count = (pid, existingItem, sign) => {
    const client = new MongoClient("mongodb+srv://gauraveve:guj131313@cluster0.fpfjtoe.mongodb.net/?retryWrites=true&w=majority");


    async function run() {
        try {
            const database = client.db("test");
            const carts = database.collection("carts");

            const filter = { id: pid };

            var updateDoc;
            if (sign == 1) {
                updateDoc = {
                    $set: {
                        quantity: existingItem.quantity + 1
                    }
                };
                const result = await carts.updateOne(filter, updateDoc);

            }
            else {
                updateDoc = {
                    $set: {
                        quantity: existingItem.quantity - 1
                    }
                };
                if ((existingItem.quantity) == 1) {
                    carts.find(id);
                }
                else {
                    const result = await carts.updateOne(filter, updateDoc);

                }
            }



        } finally {
            await client.close();
        }
    }
    run().catch(console.dir);
}

router.post('/cartHandler', async (req, res) => {
    try {
        const { id, sign } = req.body;
        console.log(sign);
        if (sign == 1 || sign == -1) {
            const existingItem = await Cart.findOne({ id: id })
            update_cart_count(id, existingItem, sign)
            res.status(201).send({ message: "successful" })
        }
        else {
            await Cart.deleteOne({ id: id })

        }
    }
    catch (error) {
        res.status(400).send({ err: "error" })
    }

})

router.post('/cartSave', async (req, res) => {
    try {
        const { id, image, description, type, brand, size, price, category, quantity } = req.body;
        await Cart.deleteOne({ id: id })
        console.log(req.body);
        const newProduct = new CartSave({
            id: id,
            image: image,
            description: description,
            type: type,
            brand: brand,
            size: size,
            price: price,
            category: category,
            quantity: 1
        });


        await newProduct.save();
        res.status(201).send({ message: "successful" })
    }

    catch (error) {
        res.status(400).send({ err: "error" })
    }
})


router.post('/cart', async (req, res) => {
    try {
        const { id, image, description, type, brand, size, price, category } = req.body;
        console.log(req.body);
        const existingItem = await Cart.findOne({ id: id })


        if (existingItem) {
            update_cart_count(req.body.id, existingItem, 1)
            res.status(201).send({ message: "successful" })

        }
        else {
            console.log(id);
            const newProduct = new Cart({
                id: id,
                image: image,
                description: description,
                type: type,
                brand: brand,
                size: size,
                price: price,
                category: category,
                quantity: 1
            });

            await CartSave.deleteOne({ id: id })
            await newProduct.save();
            res.status(201).send({ message: "successful" })
        }

    }
    catch (error) {
        res.status(400).send({ err: "error" })
    }
})


module.exports = router;