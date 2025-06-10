import { useState, type FC } from "react"
import type { Column as ColumnType, Task as TaskType } from "../types/types"
import { Task } from "./Task"
import { useDroppable } from "@dnd-kit/core"

interface ColumnProps {
    column: ColumnType
    tasks: TaskType[]
    onAddTask: (columnId: string, content: string) => void
    onDeleteTask: (columnId: string, taskId: string) => void
}

export const Column: FC<ColumnProps> = ({ column, tasks, onAddTask, onDeleteTask }) => {
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
            <input value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="New Task" style={{ flex: 1, padding: "4px" }} />
            <button onClick={handleAdd}>+</button>
            {tasks.map((task) => (
                <Task key={task.id}
                    task={task}
                    columnId={column.id}
                    onDelete={(taskId) => onDeleteTask(column.id, taskId)} />
            ))}
        </div>
    )
}
