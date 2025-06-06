import type { FC } from "react"
import type { Task as TaskType } from "../types/types"
import { useDraggable } from "@dnd-kit/core"

interface TaskProps {
    task: TaskType
}

export const Task: FC<TaskProps> = ({ task }) => {

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
            {task.content}
        </div>
    )
}
