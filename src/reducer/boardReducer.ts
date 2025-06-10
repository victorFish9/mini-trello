import type { BoardData } from "../types/types";

type Action =
    | { type: "MOVE_TASK"; payload: { taskId: string; sourceColId: string; destColId: string } }
    | { type: "ADD_TASK"; payload: { columnId: string; content: string; } }
    | { type: "DELETE_TASK"; payload: { taskId: string; columnId: string; } }
    | { type: "EDIT_TASK"; payload: { taskId: string; newContent: string; } }


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

        case "DELETE_TASK": {
            const { taskId, columnId } = action.payload

            const { [taskId]: _, ...updatedTasks } = state.tasks

            return {
                ...state,
                tasks: updatedTasks,
                columns: {
                    ...state.columns,
                    [columnId]: {
                        ...state.columns[columnId],
                        taskIds: state.columns[columnId].taskIds.filter(id => id !== taskId)
                    }
                }
            }
        }

        case "EDIT_TASK": {
            const { taskId, newContent } = action.payload
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [taskId]: {
                        ...state.tasks[taskId],
                        content: newContent,
                    }
                }
            }
        }

        default: return state
    }
}