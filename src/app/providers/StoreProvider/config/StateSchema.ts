import { type UserSchema } from '@/entities/User';
import { LoginSchema } from '@/features/authByUsername';
import { PageSchema } from '@/widgets/Page';
import {
    type AnyAction,
    type CombinedState,
    type EnhancedStore,
    type Reducer,
    type ReducersMapObject
} from '@reduxjs/toolkit';
import { type AxiosInstance } from 'axios';
import { AdminPanelDataSchema } from '@/features/getAdminPanelData';
import { OrdersPageSchema } from '@/pages/OrdersPage';
import { AddNewOrderSliceSchema } from '@/features/addNewOrder';
import { OrderDetailsSliceSchema } from '@/entities/Order';
import { MaterialsPageSchema } from '@/pages/MaterialsPage';
import { AddNewMaterialSliceSchema } from '@/features/addNewMaterial';
import { MaterialDetailsSliceSchema } from '@/entities/Material';
import { MaterialToOrderSliceSchema } from '@/features/addMatarialToOrder';
import { OrderListFiltersSchema } from '@/features/orderListFilters';
import { ReportsPageSchema } from '@/pages/ReportsPage';
import { StructurePageSchema } from '@/pages/StructurePage';
import { AddNewUnitSliceSchema } from '@/features/addNewUnit';
import { UnitDetailsSliceSchema } from '@/entities/Unit';


export interface StateSchema {
    user: UserSchema
    page: PageSchema
    // [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>

    // Async reducers
    loginForm?: LoginSchema
    adminPanel?: AdminPanelDataSchema
    orders?: OrdersPageSchema
    newOrder?: AddNewOrderSliceSchema
    orderDetails?: OrderDetailsSliceSchema
    materials?: MaterialsPageSchema
    newMaterial?: AddNewMaterialSliceSchema
    materialDetails?: MaterialDetailsSliceSchema
    materialToOrder?: MaterialToOrderSliceSchema
    orderFilters?: OrderListFiltersSchema
    reports?: ReportsPageSchema
    structure?: StructurePageSchema
    newUnit?: AddNewUnitSliceSchema
    unitDetails?: UnitDetailsSliceSchema
    // profile?: ProfileSchema
    // articleDetails?: ArticleDetailsSchema
    // articleDetailsComments?: ArticleDetailsCommentSchema
    // addCommentForm?: AddCommentFormSchema
    // articlesPage?: ArticlesPageSchema
    // articlesPageFilters?: ArticlesPageFiltersSchema

}


export type StateSchemaKey = keyof StateSchema

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager
}

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>
    add: (key: StateSchemaKey, reducer: Reducer) => void
    remove: (key: StateSchemaKey) => void
}

export interface ThunkExtraArg {
    api: AxiosInstance
}

export interface ThunkConfig<T> {
    rejectValue: T
    extra: ThunkExtraArg
    state: StateSchema
}
