const express = require("express");
const morgan = require("morgan");

// !Constants
const app = express();
const port = 3000




// ! Middlewear
app.use(morgan("dev"))
app.use(express.json())




// !Routes
app.get("/", (req, res) => {
    res.send("hi")
})








// ! Unknown routes hangling



// ! run app
app.listen(port, () => {
    console.log(`Listning on port ${port}`)
})