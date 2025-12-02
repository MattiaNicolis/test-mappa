import { forwardRef, useImperativeHandle, useRef } from "react"

export const Colori = forwardRef((props, ref) => {
    const blueMax = useRef(139)
    const blueMin = useRef(255)

    useImperativeHandle(ref, () => ({
        colorMax: blueMax.current,
        colorMin: blueMin.current
    }))

    return(
        <div {...props}>
            <h1>Colori mappa</h1>
            <p>Blue scuro: {blueMax.current} (da asssegnare a valori con frequenza massima)</p>
            <p>Blue chiaro: {blueMin.current} (da assegnare a valori con freuquenza minima)</p>
        </div>
    )
})