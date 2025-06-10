import { useEffect, useReducer, type FC } from "react"
import { DndContext, closestCenter } from "@dnd-kit/core"
import type { DragEndEvent } from "@dnd-kit/core"

import { initialData } from "../data/initialData"
import { boardReducer } from "../reducer/boardReducer"
import { Column } from "./Column"
import type { BoardData } from "../types/types"

const LOCAL_STORAGE_KEY = "task.board"

const Board: FC = () => {

    const getInitialState = (): BoardData => {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
        return saved ? JSON.parse(saved) : initialData
    }

    const [state, dispatch] = useReducer(boardReducer, getInitialState())

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state))
    }, [state])

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        if (!over || active.id === over.id) return


        let sourceColId = ""
        let destColId = over.id

        for (const col of Object.values(state.columns)) {
            if (col.taskIds.includes(active.id.toString())) {
                sourceColId = col.id
                break
            }
        }

        if (!sourceColId || !destColId) return

        dispatch({
            type: "MOVE_TASK",
            payload: {
                taskId: active.id.toString(),
                sourceColId,
                destColId: destColId.toString()
            }
        })

        console.log(`Moved ${active.id} to ${over.id}`)
    }

    const handleDeleteTask = (columnId: string, taskId: string) => {
        dispatch({ type: "DELETE_TASK", payload: { columnId, taskId } })
    }

    const handleAddTaask = (columnId: string, content: string) => {
        dispatch({ type: "ADD_TASK", payload: { columnId, content } })
    }

    const handleEditTask = (taskId: string, newContent: string) => {
        dispatch({ type: "EDIT_TASK", payload: { taskId, newContent } })
    }

    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <div style={{ display: "flex", gap: "16px", padding: "20px" }}>
                {state.columnOrder.map((columnId) => {
                    const column = state.columns[columnId]
                    const tasks = column.taskIds.map((taskId) => state.tasks[taskId])

                    return <Column key={column.id} column={column} tasks={tasks} onAddTask={handleAddTaask} onDeleteTask={handleDeleteTask} onEditTask={handleEditTask} />
                })}
            </div>
        </DndContext>
    )

}

export default Board