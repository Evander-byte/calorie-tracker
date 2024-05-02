import { Activity } from "../types"

export type ActivityActions =
    { type: 'save-activity', payload: { newActivity: Activity } } |
    { type: 'set-activeId', payload: { id: Activity['id'] } } |
    { type: 'delete-activity', payload: { id: Activity['id'] } } |
    { type: 'restart-app' }
// Definimos el tipo de dato que vamos a utilizar
export type ActivityState = {
    activities: Activity[],
    activeId: Activity['id']
}

const localStorgaeActivities = (): Activity[] => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}
// Asignamos el tipo de dato al state
export const initialState: ActivityState = {
    activities: localStorgaeActivities(),
    activeId: ''
}

export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
) => {
    // Este código maneja la lógica para actualizar el state
    if (action.type === 'save-activity') {
        // Antes del return se puede manejar la logica de la acción
        let updatedActivities: Activity[] = []
        if (state.activeId) {
            updatedActivities = state.activities.map(activity => activity.id === state.activeId ? action.payload.newActivity : activity)
        } else {
            updatedActivities = [...state.activities, action.payload.newActivity]
        }
        return {
            ...state,
            activities: updatedActivities,
            activeId: ''
        }
    }

    if (action.type === 'set-activeId') {
        return {
            ...state,
            activeId: action.payload.id
        }

    }

    if (action.type === 'delete-activity') {
        return {
            ...state,
            activities: state.activities.filter(activity => activity.id !== action.payload.id)
        }
    }

    if (action.type === 'restart-app') {
        return {
            activities: [],
            activeId: ''
        }
    }
    return state
}