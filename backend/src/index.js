import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";

dotenv.config({
  path: "./env",
});

connectDB()
.then(() => {
    app.listen(process.env.PORT || 4000, ()=>{
        console.log(`server running at: http://localhost:${process.env.PORT}`)
    })
}).catch((error) => {
    console.log("MongoDB connection failed !!" , error)
});