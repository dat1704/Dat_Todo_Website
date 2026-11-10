import Task from "../model/Task.js"

export const getAlltasks= async(req,res)=>{
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        console.error("loi goi getAlltasks",error);
        res.status(500).json({message:"loi he thong"});
    }
    
}
export const CreateTasks =async(req,res)=>{
    try {
        const {title} = req.body;
        if(typeof title !== "string" || !title.trim()){
            return res.status(400).json({message:"tieu de khong duoc de trong"});
        }
        const task = new Task({title});

        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (error) {
        console.error("loi goi CreateTasks",error);
        res.status(500).json({message:"loi he thong"});
    }
    
}
export const UpdateTasks =async (req,res)=>{
    try {
        const {title, status} = req.body;
        const update = {};
        if(title !== undefined) update.title = title;
        if(status !== undefined){
            update.status = status;
            // server tu quan ly thoi diem hoan thanh
            update.completedAt = status === "complete" ? new Date() : null;
        }
        const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        update,
        { new: true, runValidators: true }
        );
        if(!updatedTask){
            return res.status(404).json({message:"nhiem vu khong ton tai"})
        }
        res.status(200).json(updatedTask)
    } catch (error) {
        if(error.name === "ValidationError" || error.name === "CastError"){
            return res.status(400).json({message:"du lieu khong hop le"});
        }
        console.error("loi goi UpdateTasks",error);
        res.status(500).json({message:"loi he thong"});
    }
    
}
export const DeleteTasks =async(req,res)=>{
    try {
        const deletetask = await Task.findByIdAndDelete(req.params.id);
        if(!deletetask){
            return res.status(404).json({message:"nhiem vu khong ton tai"})
        }
        res.status(200).json(deletetask)
    } catch (error) {
        console.error("loi goi DeleteTasks",error);
        res.status(500).json({message:"loi he thong"});
    }
}