import type { FC } from "react"
import { initialData } from "../data/initialData"
import { Column } from "./Column"

const Board: FC = () => {
    return (
        <div style={{ display: "flex", gap: "16px", padding: "20px" }}>
            {initialData.columnOrder.map((columnId) => {
                const column = initialData.columns[columnId]
                const tasks = column.taskIds.map((taskId) => initialData.tasks[taskId])

                return (
                    <Column key={column.id} column={column} tasks={tasks} />
                )
            })}
        </div>
    )

}

export default Board