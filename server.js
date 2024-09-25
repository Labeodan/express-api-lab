const express = require("express");
const morgan = require("morgan");

// !Constants
const app = express();
const port = 3000

// Dummy DB
const products = [
    { name: "Apple", category: "Fruit", price: 1.2 },
    { name: "Carrot", category: "Vegetable", price: 0.5 },
    { name: "Laptop", category: "Electronics", price: 999 },
    { name: "Desk Chair", category: "Furniture", price: 150 },
  ];
  



// ! Middlewear
app.use(morgan("dev"))
app.use(express.json())




// !Routes
// index "/products"
app.get("/products", (req, res) => {
    try{
        res.send(products)
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")

    }
})

// show "/products/:prodId"
app.get("/products/:prodId", (req, res) => {
    
    const id = Number(req.params.prodId) 
    const product = products[id]

    try{
        if (product){
            res.send(product)
        } else if (!product) {
            res.status(404).send("Product not found")
        }
    
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")

    }
})

// create "/product"
app.post("/products", (req, res) => {
    try {
        products.push(req.body)
        res.status(201).send("Product Added")
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
})


// put "/product/:prodId"
app.put("/products/:prodId", (req, res) => {
    const id = Number(req.params.prodId)
    products[id].name = req.body.name ? req.body.name : products[id].name
    products[id].category = req.body.category ? req.body.category : products[id].category
    products[id].price = req.body.price ? req.body.price : products[id].price

    try {
        res.status(200).send("Product Updated Successfully")
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
})


// delete "product/:id" 
app.delete("/products/:prodId", (req, res) => {
    const id = Number(req.params.prodId)
    products.splice(id, 1);
    try {
        res.send("Removed Successfully")        
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
})





// ! Unknown routes hangling
app.get("*", (req, res) => {
    res.status(404).send("Page not found")
})

app.use("*", (req, res) => {
    res.status(404).send("Resource not found")
})



// ! run app
app.listen(port, () => {
    console.log(`Listning on port ${port}`)
})