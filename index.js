import express from "express";
import sequelize from "./sequelize/db.js";
import cors from "cors";
import { config } from "dotenv";
import apiRouter from "./routes/apiRouter.js";
import { Socket } from "socket.io";
import { messageModel, User } from "./sequelize/models.js";

const app = express();


// io.on('message' , async (opts) => {
//     try {
//         const user = await User.findOne({
//             where: {
//                 id: opts.userId
//             }
//             });  
//         const fullname = user.firstName + ' ' + user.lastName;
//         const message = await messageModel.create({
//             text: opts.msg,
//             userId: opts.suserId,
//             contestId: opts.contestId,
//             userName: fullname
//         });
//         const newOpts = {
//             createdAt: message.createdAt,
//             newMsg: opts.msg,

//         }
//         io.emit('message' , opts)

//         return msg;
//     } catch (error) {
//         console.log(error)
//     }
// })


config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());
app.use('/api', apiRouter)



app.listen(process.env.PORT || 3003 , async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
    } catch (error) {
        console.log(error)
    }
    console.log(`App started on port ${process.env.PORT}`)
});