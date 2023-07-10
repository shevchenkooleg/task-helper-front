import React from 'react';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Theme } from '@/shared/const/theme';
import { Sidebar } from '@/widgets/Sidebar/ui/Sidebar';

const App = () => {

    const { theme, toggleTheme } = useTheme();

    return (
        <div className={classNames('app', {},[theme])}>
            {/*<Routes>*/}
            <Sidebar/>
            <VStack max gap={'16px'}>
                <Button theme={ButtonTheme.CLEAR}>Clear</Button>
                <Button theme={ButtonTheme.OUTLINE}
                    onClick={(e)=>(
                        toggleTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT))}
                >
                    Toggle theme
                </Button>
            </VStack>
            {/*</Routes>*/}
        </div>
    );
};

export default App;