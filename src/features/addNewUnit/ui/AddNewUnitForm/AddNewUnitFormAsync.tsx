import { type FC, lazy } from 'react';
import { AddNewUnitFormProps } from './AddNewUnitForm';

export const AddNewUnitFormAsync = lazy<FC<AddNewUnitFormProps>>(async ()=>await import ('./AddNewUnitForm'));