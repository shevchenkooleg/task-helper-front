import { type FC, lazy } from 'react';
import { AddNewOrderFormProps } from './AddNewOrderForm';


export const AddNewOrderFormAsync = lazy<FC<AddNewOrderFormProps>>(async () => await import('./AddNewOrderForm'));
