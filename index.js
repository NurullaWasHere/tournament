import express from "express";
import sequelize from "./sequelize/db.js";
import cors from "cors";
import { config } from "dotenv";
import apiRouter from "./routes/apiRouter.js";

const app = express();

config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());
app.use('/api', apiRouter)



app.listen(process.env.PORT || 3003 , async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({force:true})
    } catch (error) {
        console.log(error)
    }
    console.log(`App started on port ${process.env.PORT}`)
});