import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrdersPageSchema } from '../types/ordersPage';
import { getOrdersList } from '@/features/getOrdersList';
import { Order } from '@/entities/Order';
import { filterObject } from '@/shared/lib/filterObject/filterObject';

const initialState: OrdersPageSchema = {
    error: '',
    isLoading: false,
    orders: [],
    searchInOrders: [],
    _isInit: false
};

export const ordersPageSlice = createSlice({
    name: 'ordersPageSlice',
    initialState,
    reducers: {
        setIsInit: (state)=>{
            state._isInit = true;
        },
        searchInOrders: (state, action: PayloadAction<string>) => {
            if (action.payload === ''){
                state.searchInOrders = [ ...state.orders ];
            } else {
                state.searchInOrders = state.orders;
                const reg = new RegExp(action.payload.toLowerCase());
                const result: Order[] = [];
                state.searchInOrders.map(order=>{
                    const orderForSearch = filterObject(order, ['_id', 'userId', 'modified', 'yearOfExecution']);
                    const values = Object.values(orderForSearch);
                    let matchingFlag = false;

                    function findMatch(el: string){
                        if (typeof el === 'string'){
                            console.log('el, ', el);
                            console.log('reg,', reg );
                            if (reg.test(el.toLowerCase())){
                                console.log('el.toLowerCase(), ', el.toLowerCase());
                                console.log('ADD ORDER, ', JSON.stringify(order));
                                result.push(order);
                                matchingFlag = true;
                            }
                        }
                    }
                    values.forEach((el,i)=>{
                        if (matchingFlag) return;
                        console.log('index = ', i);

                        if (el instanceof Object){
                            const subElement = Object.values(el);
                            subElement.forEach((el,i)=>{
                                console.log(JSON.stringify(el));
                            });
                            // console.log('i= ',i);
                        } else if (typeof el === 'string')  {
                            // console.log('el, ', el);
                            // console.log('reg,', reg );
                            // if (reg.test(el.toLowerCase())){
                            //     console.log('el.toLowerCase(), ', el.toLowerCase());
                            //     console.log('ADD ORDER, ', JSON.stringify(order));
                            //     result.push(order);
                            //     matchingFlag = true;
                            // }
                            findMatch(el);
                        }
                    });
                });
                // console.log(JSON.stringify(result));
                state.searchInOrders = [ ...result ];
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOrdersList.pending, (state) => {
                state.error = '';
                state.isLoading = true;
            })
            .addCase(getOrdersList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orders = action.payload;
                state.searchInOrders = action.payload;
            })
            .addCase(getOrdersList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

// Action creators are generated for each case reducer function
export const { actions: ordersPageSliceActions } = ordersPageSlice;
export const { reducer: ordersPageSliceReducer } = ordersPageSlice;
