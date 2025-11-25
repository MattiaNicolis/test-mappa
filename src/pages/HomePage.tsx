import { useState, useRef, useEffect } from "react"
import { Mappa } from "../components/Mappa"

type coloriStanzeType = {
    id: number,
    color: string
}

function HomePage() {

    //State
    const mappaRef = useRef<SVGSVGElement>(null)

    const [stanza, setStanza] = useState<SVGSVGElement[]>([])

    const coloriStanza = useRef<coloriStanzeType[]>([])


    const cambiaColore = (i: number, color:string) => {
        stanza[i].setAttribute("fill", color)
    }

    useEffect(() => {
        if(mappaRef.current)
            setStanza(Array.from(mappaRef.current.querySelectorAll('[stroke="red"]')))
    }, [])

    useEffect(() => {
        coloriStanza.current = stanza.map((_, i) => ({
            id: i,
            color: "#" + Math.floor(Math.random() * 16777215).toString(16)
        }))
    }, [stanza])

    //Render
    return(
        <div>
            {stanza.map((_, i) => (
                <button key={i} onClick={() => cambiaColore(i, coloriStanza.current[i].color)}> 
                    Colora stanza {i+1}
                </button>
            ))}
            <Mappa ref={mappaRef} />
        </div>
    )
}

export default HomePage