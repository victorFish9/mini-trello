import type { FC } from "react"
import type { Task as TaskType } from "../types/types"
import { useDraggable } from "@dnd-kit/core"

interface TaskProps {
    task: TaskType
    onDelete: (taskId: string) => void
    columnId: string
}

export const Task: FC<TaskProps> = ({ task, onDelete }) => {

    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: task.id
    })

    const style = {
        backgroundColor: "white",
        padding: "8px",
        marginBottom: "8px",
        borderRadius: "4px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        fontSize: "14px",
        cursor: "grab",
        opacity: isDragging ? 0.5 : 1,
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined
    }

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <span>{task.content}</span>
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    console.log("Delete button clicked", task.id)
                    onDelete(task.id)
                }}
            >
                Delete
            </button>
        </div>
    )
}
