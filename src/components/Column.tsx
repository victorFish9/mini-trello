import type { FC } from "react"
import type { Column as ColumnType, Task as TaskType } from "../types/types"
import { Task } from "./Task"
import { useDroppable } from "@dnd-kit/core"

interface ColumnProps {
    column: ColumnType
    tasks: TaskType[]
}

export const Column: FC<ColumnProps> = ({ column, tasks }) => {
    const { setNodeRef, isOver } = useDroppable({
        id: column.id
    })

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
            {tasks.map((task) => (
                <Task key={task.id} task={task} />
            ))}
        </div>
    )
}
