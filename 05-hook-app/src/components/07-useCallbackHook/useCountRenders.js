import { useRef } from "react";

export const useCountRenders = () => { // Gets called each time component is re/rendered
    const renders = useRef(0);
    console.log('renders:', renders.current++);
}
