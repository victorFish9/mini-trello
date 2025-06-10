import { useState, type FC } from "react"
import type { Column as ColumnType, Task as TaskType } from "../types/types"
import { Task } from "./Task"
import { useDroppable } from "@dnd-kit/core"

interface ColumnProps {
    column: ColumnType
    tasks: TaskType[]
    onAddTask: (columnId: string, content: string) => void
    onDeleteTask: (columnId: string, taskId: string) => void
    onEditTask: (columnId: string, newContent: string) => void
}

export const Column: FC<ColumnProps> = ({ column, tasks, onAddTask, onDeleteTask, onEditTask }) => {
    const { setNodeRef, isOver } = useDroppable({
        id: column.id
    })

    const [newTask, setNewTask] = useState("")

    const handleAdd = () => {
        if (newTask.trim() === "") return
        onAddTask(column.id, newTask)
        setNewTask("")
    }

    const columnStyle = {
        backgroundColor: isOver ? "#d2e3fc" : "#f4f5f7",
        borderRadius: "6px",
        width: "250px",
        padding: "10px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
    }
    return (
        <div ref={setNodeRef} style={columnStyle}>
            <h3 style={{ textAlign: "center", marginBottom: "10px" }}>{column.title}</h3>
            <div className="d-flex gap-2 mb-2">
                <input value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="New Task" style={{ flex: 1, padding: "4px" }} className="form-control" />
                <button onClick={handleAdd} type="button" className="btn btn-outline-success btn-sm">Add</button>
            </div>
            {tasks.map((task) => (
                <Task key={task.id}
                    task={task}
                    onEdit={(taskId, newContent) => onEditTask(taskId, newContent)}
                    onDelete={(taskId) => onDeleteTask(column.id, taskId)} />
            ))}
        </div>
    )
}
