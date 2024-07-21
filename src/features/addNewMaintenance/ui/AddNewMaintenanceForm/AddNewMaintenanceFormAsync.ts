import { lazy, FC } from 'react';
import { AddNewMaintenanceFormProps } from './AddNewMaintenanceForm';

export const AddNewMaintenanceFormAsync = lazy<FC<AddNewMaintenanceFormProps>>(async ()=> await import('./AddNewMaintenanceForm'));