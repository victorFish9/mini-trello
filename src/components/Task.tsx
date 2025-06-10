import type { FC } from "react"
import type { Task as TaskType } from "../types/types"
import { useDraggable } from "@dnd-kit/core"

type Props = {
    task: TaskType
    onDelete: (taskId: string) => void
}

export const Task: FC<Props> = ({ task, onDelete }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task.id
    })

    const style = {
        backgroundColor: "white",
        padding: "8px",
        marginBottom: "8px",
        borderRadius: "4px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        fontSize: "14px",
        transform: transform
            ? `translate(${transform.x}px, ${transform.y}px)`
            : undefined,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "8px"
    }

    return (
        <div ref={setNodeRef} style={style} className="task">
            <div
                {...attributes}
                {...listeners}
                style={{ flexGrow: 1, cursor: "grab", wordBreak: "break-word" }}
            >
                <div>
                    <span>{task.content}</span>
                </div>
            </div>
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    console.log("Delete button clicked", task.id)
                    onDelete(task.id)
                }}
                style={{
                    flexShrink: 0,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "16px"
                }}
            >
                🗑️
            </button>
        </div>
    )
}
