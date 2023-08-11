import { type FC, type ReactNode, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import {
    type ReduxStoreWithManager,
    type StateSchema,
    type StateSchemaKey
} from '@/app/providers/StoreProvider';
import { type Reducer } from '@reduxjs/toolkit';

export type ReducerList = {
    [name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>;
}

interface DynamicModuleLoaderProps {
    children: ReactNode
    reducers: ReducerList
    removeAfterUnmount?: boolean
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
    const { children, reducers, removeAfterUnmount = true } = props;
    const dispatch = useDispatch();
    const store = useStore() as ReduxStoreWithManager;


    useEffect(() => {
        const mountedReducers = store.reducerManager.getReducerMap();
        Object.entries(reducers).forEach(([name, reducer]) => {
            const mounted = mountedReducers[name as StateSchemaKey];
            if (!mounted) {
                store.reducerManager.add(name as StateSchemaKey, reducer);
                dispatch({ type: `@INIT ${name} reducer` });
            }
        });


        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(([name]) => {
                    store.reducerManager.remove(name as StateSchemaKey);
                    dispatch({ type: `@KILL ${name} reducer` });
                });
            }
        };
        // eslint-disable-next-line
    },[])

    return (
        <>{ children }</>
    );
};
