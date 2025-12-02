import { useEffect, useRef, useState} from "react"
import { Colori } from "../components/Colori"
import { Mappa } from "../components/Mappa"

type colorType = {
    colorMax: number,
    colorMin: number
}

type frequencyType = {
    freq: number
}

type colorRoomType = {
    color: string
}

const freqPercentuale = (freq: number, minFreq: number, maxFreq: number, colorMax: number, colorMin: number) => {
    if(minFreq == maxFreq)
        return colorMin

    const freqPercentuale = (freq - minFreq) * (colorMax - colorMin) / (maxFreq - minFreq) + colorMin

    return Math.floor(freqPercentuale)
}

function HomePage() {

    //Ref --> access to DOM-element
    const mappaRef = useRef<SVGSVGElement>(null) //accede agli elementi di Mappa
    const coloriRef = useRef<colorType>(null) //accede agli elementi di Colori

    //State
    const [stanze, setStanze] = useState<SVGSVGElement[]>([])
    const [defaultColorValues, setDefaultColorValues] = useState<colorType>()
    const [frequenze, setFrequenze] = useState<frequencyType[]>([])
    const [coloriStanze, setColoriStanze] = useState<colorRoomType[]>([])


    //Gestione degli effetti
    useEffect(() => {
        if(mappaRef.current) { //ottenuti gli elementi SVG vengono inseriti nello stato
            setStanze(Array.from(mappaRef.current.querySelectorAll('[stroke="red"], [stroke="#fff"]')))
        }

        if(coloriRef.current) { //ottenuti i valori massimi del colore da usare per colorare le stanze, vengono salvati nello stato
            setDefaultColorValues({
                colorMax: coloriRef.current.colorMax,
                colorMin: coloriRef.current.colorMin
            })
        }
    }, [])

    useEffect(() => {
        if(!stanze.length)
            return;

        setFrequenze(stanze.map(() => ({
            freq: Math.floor(Math.random() * 101)
        })))
    }, [stanze])

    useEffect(() => {
        if(!frequenze.length || !defaultColorValues)
            return;

        const frequency = frequenze.map(f => f.freq) 
        const maxFreq = Math.max(...frequency)
        const minFreq = Math.min(...frequency)

        const nuoviColori = frequenze.map((f) => {
            const colorValue = freqPercentuale(f.freq, minFreq, maxFreq, defaultColorValues.colorMax, defaultColorValues.colorMin)

            return {
                color: 'rgb(0,0,' + colorValue + ')'
            }
        })

        setColoriStanze(nuoviColori)

    }, [frequenze, defaultColorValues])

    const cambiaColore = (i: number) => {
        if(stanze[i] && coloriStanze[i]){
            const coloreCalcolato = coloriStanze[i].color;
            stanze[i].setAttribute("fill", coloreCalcolato);
            console.log(`Stanza ${i+1} colorata di ${coloreCalcolato}`)
        }
    }

    return(
        <div>
            <Colori ref={coloriRef} />

            {frequenze.map((f, i) => (
                <p key={i}>
                    Stanza {i+1}: frequenza del {f.freq} %
                </p>
            ))}

            {stanze.map((_, i) => (
                <button key={i} onClick={() => cambiaColore(i)}>
                    Colora stanza {i+1}
                </button>
            ))}

            <Mappa ref={mappaRef} />
        </div>
    )
}
export default HomePage