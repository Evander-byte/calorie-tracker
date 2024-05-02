import { useMemo } from "react"
import { Activity } from "../types"
import Quantyties from "./Quantyties"

type CalorieTrackerProps = {
    activities: Activity[]
}

const CalorieTracker = ({ activities }: CalorieTrackerProps) => {
    // Contadores
    const caloriesConsum = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0), [activities])
    const caloriesExpended = useMemo(() => activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0), [activities])
    const caloriesTotal = useMemo(() => caloriesConsum - caloriesExpended, [activities])
    return (
        <>
            <h2 className="text-4xl font-black text-center text-white">Resumen de Calorias</h2>
            <div className="flex flex-col items-center md:justify-between md:flex-row mt-5">
                <Quantyties
                    calories={caloriesConsum}
                    text="Calorias Consumidas"
                />
                <Quantyties
                    calories={caloriesExpended}
                    text="Calorias Gastadas"
                />
                <Quantyties
                    calories={caloriesTotal}
                    text="Total Calorias"
                />
            </div>
        </>
    )
}

export default CalorieTracker
