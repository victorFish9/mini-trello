import type { FC } from "react"
import type { Task as TaskType } from "../types/types"

interface TaskProps {
    task: TaskType
}

export const Task: FC<TaskProps> = ({ task }) => {
    return (
        <div
            style={{
                backgroundColor: "white",
                padding: "8px",
                marginBottom: "8px",
                borderRadius: "4px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                fontSize: "14px"
            }}
        >
            {task.content}
        </div>
    )
}
