import type { FC } from "react"
import { DndContext, closestCenter } from "@dnd-kit/core"
import type { DragEndEvent } from "@dnd-kit/core"

import { initialData } from "../data/initialData"
import { Column } from "./Column"

const Board: FC = () => {

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (!over) return
        if (active.id === over.id) return

        console.log(`Moved ${active.id} to ${over.id}`)
    }

    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <div style={{ display: "flex", gap: "16px", padding: "20px" }}>
                {initialData.columnOrder.map((columnId) => {
                    const column = initialData.columns[columnId]
                    const tasks = column.taskIds.map((taskId) => initialData.tasks[taskId])

                    return <Column key={column.id} column={column} tasks={tasks} />
                })}
            </div>
        </DndContext>
    )

}

export default Board