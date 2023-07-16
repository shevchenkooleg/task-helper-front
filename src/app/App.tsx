import React from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack } from '@/shared/ui/Stack';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Sidebar } from '@/widgets/Sidebar';
import { AppRouter } from './providers/router';
import { Navbar } from '@/widgets/Navbar';

const App = () => {

    const { theme, toggleTheme } = useTheme();

    return (
        <div className={classNames('app', {},[theme])}>
            <Navbar/>
            <HStack>
                <Sidebar/>
                <AppRouter/>
            </HStack>
            {/*<Routes>*/}
            {/*</Routes>*/}
        </div>
    );
};

export default App;