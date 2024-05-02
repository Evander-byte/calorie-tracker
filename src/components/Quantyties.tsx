
type QuantytiesProps = {
    calories: number,
    text: string
}

const Quantyties = ({ calories, text }: QuantytiesProps) => {
    return (
        <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
            <span className="font-black text-6xl text-orange-400">{calories}
            </span>
            {text}
        </p>
    )
}

export default Quantyties
