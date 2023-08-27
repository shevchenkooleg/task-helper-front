import { FC, lazy } from 'react';
import { AddMaterialToOrderFormProps } from './AddMaterialToOrderForm';

export const AddMaterialToOrderFormAsync = lazy<FC<AddMaterialToOrderFormProps>>(async () => await import('./AddMaterialToOrderForm'));