import { ThunkConfig } from '@/app/providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Order, OrderMaterial } from '../../types/orderDetailsSliceSchema';
import { Material } from '@/entities/Material';

interface responseOrderInterface  {
    status: string
    order: Order
}

type responseMaterialInterface = [Material]


export const fetchOrderById = createAsyncThunk<Order, string, ThunkConfig<string> >(
    'orderDetails/fetchOrderById',
    async (orderId, thunkAPI) => {
        const { rejectWithValue, extra } = thunkAPI;
        const accessToken = thunkAPI.getState().user!.tokenAuthData!.access_token;
        try {
            if (!orderId) {
                throw new Error('Order not defined');
            }
            const orderData = await extra.api.get<responseOrderInterface>(`/order/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            if (!orderData.data) {
                throw new Error();
            }
            const materialId: Array<string> = [];
            if (orderData.data && orderData.data.order.materials!.length !== 0){
                orderData.data.order.materials!.forEach(el=>{el.materialId && materialId.push(el.materialId);});
                console.log(materialId);
            }
            const materialData = await extra.api.get<responseMaterialInterface>('/material', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    materialId: materialId
                }
            }
            );
            // console.log('orderData ', orderData);
            // console.log('material ', materialData);



            let newMaterials: Array<OrderMaterial> = [];
            if (orderData.data.order.materials){
                newMaterials = [...orderData.data.order.materials];
                console.log(materialData.data);
                newMaterials.map((el,i)=>materialData.data.forEach(
                    (material)=>{

                        if (material._id === el.materialId){
                            // console.log('el ', el);
                            // console.log('material ', material);
                            newMaterials[i]={ ...newMaterials[i], ...material };
                        }
                    }
                ));
            }
            // console.log('newMaterials ', newMaterials);
            return {
                ...orderData.data.order, materials: [...newMaterials]
            };

        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    }
);