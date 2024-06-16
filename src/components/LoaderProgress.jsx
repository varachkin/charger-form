import { useEffect, useState } from "react"
import {BATARY_SIZE, COST} from "../constants";

export const LoaderProgress = ({full = 0}) => {
    const [counter, setCounter] = useState(full);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCounter(prevCounter => {
                if (prevCounter >= 100) {
                    clearInterval(intervalId);
                    return 100;
                }
                return prevCounter + 1;
            });
        }, 3000);

        return () => clearInterval(intervalId); // Cleanup the interval on component unmount
    }, []);

    return (
        <>
            <div className="station-card-icon-wrapper">
                <span className="loader-counter">{counter} %</span>
                <div className={`station-card-icon charging`}></div>
            </div>
            <h1 className='title'>
                <span className='color-title'>+ {(BATARY_SIZE / 100 * counter).toFixed(2)} kW/h</span>
                <span> = {((BATARY_SIZE / 100 * counter)* COST).toFixed(2)} zł</span>
            </h1>
        </>

    )
}