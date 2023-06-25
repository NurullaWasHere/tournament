import express from "express";
import sequelize from "./sequelize/db.js";
import cors from "cors";
import { config } from "dotenv";
import apiRouter from "./routes/apiRouter.js";
import { createServer } from 'http';
import { Server } from "socket.io";
import { messageModel } from "./sequelize/models.js";

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on('connection',async (socket) => {

    socket.on('join', (contestId) => {
        socket.join(contestId);
    }) 
    socket.on('message', (opts) => {
        console.log(opts);
      io.to(opts.contestId).emit('chat message', msg);
    });
  
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });

  console.log(io)
config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());
app.use('/api', apiRouter)



server.listen(process.env.PORT || 3003 , async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({alter: true});
    } catch (error) {
        console.log(error)
    }
    console.log(`App started on port ${process.env.PORT}`)
});