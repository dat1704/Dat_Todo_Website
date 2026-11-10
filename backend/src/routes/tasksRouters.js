import express from "express"
import { getAlltasks, CreateTasks,UpdateTasks,DeleteTasks } from "../controller/tasksController.js";

const router = express.Router();

router.get("/",getAlltasks);
router.post("/",CreateTasks);
router.put("/:id",UpdateTasks);
router.delete("/:id",DeleteTasks);
export default router;