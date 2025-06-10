import { useState, type FC } from "react"
import type { Task as TaskType } from "../types/types"
import { useDraggable } from "@dnd-kit/core"

type Props = {
    task: TaskType
    onDelete: (taskId: string) => void
    onEdit: (taskId: string, newContent: string) => void
}

export const Task: FC<Props> = ({ task, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [editText, setEditText] = useState(task.content)

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task.id,
        disabled: isEditing
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

    const handleSave = () => {
        if (editText.trim() !== "") {
            onEdit(task.id, editText.trim())
        }
        setIsEditing(false)
    }

    return (
        <div ref={setNodeRef} style={style} className="task">
            <div
                {...attributes}
                {...listeners}
                style={{ flexGrow: 1, cursor: "grab", wordBreak: "break-word" }}
            >
                {isEditing ? (
                    <input
                        autoFocus
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onBlur={handleSave}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSave()
                            if (e.key === "Escape") setIsEditing(false)
                        }}
                        style={{ width: "100%", fontSize: "14px" }}
                    />
                ) : (
                    <div onDoubleClick={() => setIsEditing(true)}>
                        <span>{task.content}</span>
                    </div>
                )}
            </div>
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    onDelete(task.id)
                }}
                type="button"
                className="btn btn-outline-danger btn-sm"
            >
                Delete
            </button>
        </div>
    )

}
