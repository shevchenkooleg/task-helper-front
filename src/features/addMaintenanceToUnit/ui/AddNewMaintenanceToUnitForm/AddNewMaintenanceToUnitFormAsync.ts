import { lazy, FC } from 'react';
import {
    AddNewMaintenanceToUnitFormProps
} from './AddNewMaintenanceToUnitForm';

export const AddNewMaintenanceToUnitFormAsync = lazy<FC<AddNewMaintenanceToUnitFormProps>>(async ()=> await import('./AddNewMaintenanceToUnitForm'));