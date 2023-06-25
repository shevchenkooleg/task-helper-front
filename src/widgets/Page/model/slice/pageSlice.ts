import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type PageSchema } from '../types/pageSchema'


const initialState: PageSchema = {
    scroll: {}
}

export const pageSlice = createSlice({
    name: 'pageSlice',
    initialState,
    reducers: {
        setScrollPosition: (state, { payload }: PayloadAction<{ path: string, position: number }>) => {
            // state.scroll[payload.path] = payload.position
        }
    },
    extraReducers: (builder) => {
        // builder
        // .addCase(loginByUsername.pending, (state) => {
        //    state.error = undefined
        //    state.isLoading = true
        // })
        // .addCase(loginByUsername.fulfilled, (state) => {
        //    state.isLoading = false
        // })
        // .addCase(loginByUsername.rejected, (state, action) => {
        //    state.isLoading = false
        //    state.error = action.payload
        // })
    }
})

// Action creators are generated for each case reducer function
export const { actions: pageSliceActions } = pageSlice
export const { reducer: pageSliceReducer } = pageSlice
