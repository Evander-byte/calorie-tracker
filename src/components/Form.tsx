import { categories } from "../data/categories"
import { v4 as uuidv4 } from "uuid"
import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react";
import { Activity } from "../types";
import { ActivityActions, ActivityState } from "../reducers/activityReducer";

type FormProps = {
    state: ActivityState,
    dispatch: Dispatch<ActivityActions>

}

// Componente 
const Form = ({ dispatch, state }: FormProps) => {
    const initialState: Activity = {
        id: uuidv4(),
        category: 1,
        name: '',
        calories: 0
    }

    const [activity, setActivity] = useState<Activity>(initialState);
    useEffect(() => {
        if (state.activeId) {
            const selectedActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]
            setActivity(selectedActivity)
        }
    }, [state.activeId])

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id)
        console.log(isNumberField)
        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    }

    const isValidActivity = () => {
        const { name, calories } = activity
        return name.trim() !== '' && calories > 0
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({ type: 'save-activity', payload: { newActivity: activity } })
        setActivity(initialState)
    }
    return (
        <form
            className="space-y-5 bg-white shadow p-10 rounded-lg"
            onSubmit={handleSubmit}
        >
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category" className="font-bold">Categoría:</label>
                <select className="border border-slate-300 p-2 rounded-lg w-full bg-white" id="category" value={activity.category} onChange={handleChange}>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name" className="font-bold">Actividad:</label>
                <input type="text" id="name" className=" border border-slate-300 p-2 rounded-lg" placeholder="Ej. Comida, Juego de naranja, Ensalada, Ejercicio, Pesas, Bicicleta" value={activity.name} onChange={handleChange} />
            </div>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories" className="font-bold">Calorias:</label>
                <input type="number" id="calories" className=" border border-slate-300 p-2 rounded-lg" placeholder="Calorias Ej. 300 o 500" value={activity.calories} onChange={handleChange} />
            </div>
            <input type="submit" className="bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10" value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'} disabled={!isValidActivity()} />
        </form>
    )
}

export default Form
