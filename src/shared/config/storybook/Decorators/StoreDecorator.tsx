import { type Story } from "@storybook/react";
import { type StateSchema, StoreProvider } from "@/app/providers/StoreProvider";
import { type ReducerList } from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { userReducer } from "@/entities/User/testing";
import { pageSliceReducer } from "@/widgets/Page/testing";

const defaultAsyncReducers: ReducerList = {
    user: userReducer,
    page: pageSliceReducer
}

export const StoreDecorator = (
    state: DeepPartial<StateSchema>,
    asyncReducers?: ReducerList
    // eslint-disable-next-line react/display-name
) => (StoryComponent: Story) => (
    <StoreProvider initialState={state as StateSchema} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
        <StoryComponent/>
    </StoreProvider>
)



