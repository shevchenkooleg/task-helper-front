import { type CombinedState, configureStore, type Reducer, type ReducersMapObject } from '@reduxjs/toolkit';
import { type StateSchema } from './StateSchema';
import { createReducerManager } from '../config/reducerManager';
import { $api } from '@/shared/api/api';
import { userReducer } from '@/entities/User';
import { pageSliceReducer } from '@/widgets/Page';
// import { rtkApi } from '@/shared/api/rtkApi';

export function createReduxStore (
    initialState?: StateSchema,
    asyncReducers?: DeepPartial<ReducersMapObject>
) {
    const rootReducer: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        user: userReducer,
        page: pageSliceReducer,
        // [rtkApi.reducerPath]: rtkApi.reducer
    };

    const reducerManager = createReducerManager(rootReducer);

    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>, // ReducerMapObject<StateSchema>
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: getDefaultMiddleware => getDefaultMiddleware({
            thunk: {
                extraArgument: {
                    api: $api
                }
            }
        })
        // .concat((rtkApi.middleware))
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    store.reducerManager = reducerManager;

    return store;
}


export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']

