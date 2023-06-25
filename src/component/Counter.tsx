import {useState} from 'react';
import style from './Counter.module.scss';

const Counter = () => {

    const [count, setCount] = useState(0);

    const addOneHandler = () => {
        setCount(count + 1);
    };
    const resetHandler = () => {
        setCount(0);
    };

    return (
        <div>
            <h1>
                {count}
            </h1>
            <button className={style.btn} onClick={addOneHandler}>Add one</button>
            <button className={style.btn} onClick={resetHandler}>Reset</button>
        </div>
    );
};

export default Counter;