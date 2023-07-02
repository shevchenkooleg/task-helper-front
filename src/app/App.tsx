import React from 'react';
import { Button } from '@/shared/ui/Button/Button';
import { classNames } from '@/shared/lib/classNames/classNames';

const App = () => {
    return (
        <div className={classNames('app', {},['app_light_theme'])}>
            {/*<Routes>*/}
            {/*<Counter/>*/}
            <Button square={true}>Click me</Button>
            dmlebvkjdsd
            {/*</Routes>*/}
        </div>
    );
};

export default App;