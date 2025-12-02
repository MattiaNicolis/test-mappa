import { forwardRef, useImperativeHandle } from "react";

export const Frequenze = forwardRef((props, ref) => {

    /* const freq1 = useRef(Math.floor(Math.random() * 101))
    const freq2 = useRef(Math.floor(Math.random() * 101))
    const freq3 = useRef(Math.floor(Math.random() * 101))
    const freq4 = useRef(Math.floor(Math.random() * 101)) */

    useImperativeHandle(ref, () => ({

    }))


    return(
        <div {...props}>

        </div>
    )
})