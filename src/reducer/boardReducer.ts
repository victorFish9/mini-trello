import type { BoardData } from "../types/types";

type Action = | { type: "MOVE_TASK"; payload: { taskId: string; sourceColId: string; destColId: string } } |
{ type: "ADD_TASK"; payload: { columnId: string; content: string; } }


export const boardReducer = (state: BoardData, action: Action): BoardData => {
    switch (action.type) {
        case "MOVE_TASK": {
            const { taskId, sourceColId, destColId } = action.payload

            if (sourceColId === destColId) return state

            const source = state.columns[sourceColId]
            const destination = state.columns[destColId]

            return {
                ...state,
                columns: {
                    ...state.columns,
                    [sourceColId]: {
                        ...source,
                        taskIds: source.taskIds.filter((id) => id !== taskId)
                    },
                    [destColId]: {
                        ...destination,
                        taskIds: [...destination.taskIds, taskId]
                    }
                }
            }
        }

        case "ADD_TASK": {
            const { columnId, content } = action.payload
            const newId = `task-${Date.now()}`
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [newId]: { id: newId, content }
                },
                columns: {
                    ...state.columns,
                    [columnId]: {
                        ...state.columns[columnId],
                        taskIds: [...state.columns[columnId].taskIds, newId]
                    }
                }
            }
        }

        default: return state
    }
}