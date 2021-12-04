import React, { useCallback, useState } from 'react';
import { Hello } from './Hello';
import { Square } from './Square';

export const CallbackHook = () => {

    const [count, setCount] = useState(0);

    const favNums = [69, 96, 696];

    // * useCallback -> to prevent functions from changing the value:
        // 1) when using React.memo() cause it checks the reference
        // 2) useEffect(()=>{}, [increment])

    // ? Whenever [dependencies] change, function will be recreated and put inside variable memory
    const increment = useCallback( (n) => { // usually when using useCallback you dont need to return something

        // * setState's updater callback function argument references state -> setState( state => state + 1);
        setCount( c => c + n );

    }, [ setCount ]); // function never changes, function doesnt get re-rendered

    return (
        <div>
            {/* function is created in every single render */}
            <Hello increment={ increment }/>
            <div>count: {count}</div>
            {
                favNums.map(n => {
                    return (
                        <Square increment={increment} n={n} key={n}/>
                    )
                })
            }
        </div>
    )
}
