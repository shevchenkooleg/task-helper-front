import {useState} from 'react';
import style from './Counter.module.scss';
import MainPageIcon from '/Users/oleg/programming_training/own_projects/task-helper-front/src/MainPage.svg';

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
            <MainPageIcon/>
            <button className={style.btn} onClick={addOneHandler}>Add one</button>
            <button className={style.btn} onClick={resetHandler}>Reset</button>
        </div>
    );
};

export default Counter;