import express from 'express';
import cors from 'cors';
import taskRoute from "./routes/tasksRouters.js"
import dns from 'dns';

dns.setServers(['8.8.8.8', '8.8.4.4']);
import { ConnectDB } from './config/db.js';
import dotenv from "dotenv"
dotenv.config();
const port = process.env.PORT || 5001
const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }))
app.use(express.json())
app.use("/api/tasks",taskRoute)
ConnectDB().then(()=>{
    app.listen(port,()=>{
    console.log(`Server bat dau tren cong ${port}`);
    });
});



