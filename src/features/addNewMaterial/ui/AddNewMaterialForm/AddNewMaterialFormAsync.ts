import { FC, lazy } from 'react';
import { AddNewMaterialFormProps } from './AddNewMaterialForm';

export const AddNewMaterialFormAsync = lazy<FC<AddNewMaterialFormProps>>(async () => await import('./AddNewMaterialForm'));