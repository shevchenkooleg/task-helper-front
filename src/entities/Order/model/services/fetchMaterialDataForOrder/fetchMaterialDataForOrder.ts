import { ThunkConfig } from '@/app/providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Order } from '../../types/orderDetailsSliceSchema';
import { Material, MaterialToOrderTab } from '@/entities/Material';
import { Dimension } from '@/entities/Dimension';
import { filterObject } from '@/shared/lib/filterObject/filterObject';

interface responseOrderInterface  {
    status: string
    order: Order
}

type responseMaterialInterface = {
    material: Array<Material>, _newMaterialInstanceId: string
}


export const fetchMaterialDataForOrder = createAsyncThunk<Material, Order, ThunkConfig<string> >(
    'orderDetails/fetchMaterialDataForOrder',
    async (order, thunkAPI) => {
        const { rejectWithValue, extra } = thunkAPI;
        // console.log('order ', order);
        const accessToken = thunkAPI.getState().user!.tokenAuthData!.access_token;
        try {
            if (!order) {
                throw new Error('Order not defined');
            }
            if (order && order.materials!.length !== 0) {
                const materialId: Array<string> = [];
                if (order && order.materials!.length !== 0){
                    order.materials!.forEach(el=>{el.materialId && materialId.push(el.materialId);});
                    // console.log(materialId);
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



                let newMaterials: Array<MaterialToOrderTab> = [];
                if (order.materials){
                    // console.log('order.materials ', order.materials);
                    newMaterials = [...order.materials];
                    // console.log('newMaterials ', newMaterials);
                    // console.log('materialData.data ', materialData.data);
                    newMaterials.map((el,i)=>materialData.data.material.forEach(
                        (material)=>{
                            // console.log(material);
                            if (material._id === el.materialId){
                                //             // console.log('el ', el);
                                //             console.log('material ', material);
                                console.log('material_____', material);
                                newMaterials[i]={ ...newMaterials[i], ...filterObject<Order>(material, ['_id']) };
                                //             newMaterials[i]={ ...newMaterials[i], ...material };
                            }
                        }
                    ));
                }
                newMaterials.map((material, i) => {
                    if (material.materialName === undefined){
                        material = { ...material, materialName: '', fullVolume: '0', dimension: Dimension.UNIT, KSUId: 'null' };
                        // material = { ...material };
                    }
                    // console.log(material);
                });
                // console.log('newMaterials ', newMaterials);
                return {
                    ...order, materials: [...newMaterials]
                };
            } else {
                return order;
            }


        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    }
);