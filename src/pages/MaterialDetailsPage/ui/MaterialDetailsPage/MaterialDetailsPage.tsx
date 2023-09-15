import cls from './MaterialDetailsPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { VStack } from '@/shared/ui/Stack';
import { EditableCard } from '@/features/editableCard';
import { Page } from '@/widgets/Page';
import { ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { deleteMaterialById, materialDetailsSliceReducer } from '@/entities/Material';
import { getRouteMaterials } from '@/shared/const/router';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { materialDetailsSliceActions } from '@/entities/Material';
import { MaterialCard } from '@/entities/Material';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { fetchMaterialById } from '@/entities/Material';
import { useSelector } from 'react-redux';
import {
    getMaterialDetailsIsLoading
} from '@/entities/Material';
import {
    getMaterialDetailsEditMode
} from '@/entities/Material';
import { updateMaterialById } from '@/entities/Material';
import {
    MaterialDetailsPageToolPanel
} from '../MaterialDetailsPageToolPanel/MaterialDetailsPageToolPanel';

interface MaterialDetailsPageProps {
    className?: string
}

const MaterialDetailsPage = memo((props: MaterialDetailsPageProps) => {
    const { className } = props;
    const { materialId } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getMaterialDetailsIsLoading) ?? false;
    const editMode = useSelector(getMaterialDetailsEditMode);
    const reducer: ReducerList = {
        materialDetails: materialDetailsSliceReducer
    };

    useInitialEffect(()=>{
        materialId && dispatch(fetchMaterialById(materialId));
    });

    const onBackClickHandler = useCallback(() => {
        navigate(getRouteMaterials());
    }, [navigate]);
    const onEditClickHandler = useCallback(() => {
        dispatch(materialDetailsSliceActions.setEditMode(true));
    }, [dispatch]);
    const onDeleteClickHandler = useCallback(() => {
        materialId && dispatch(deleteMaterialById(materialId)).then((res)=>{
            if (res.payload !== 'error'){
                navigate(getRouteMaterials());
            } else {
                //TODO implement error messages
                console.log(res.payload);
            }
        });
    }, [dispatch, materialId, navigate]);
    const onSaveClickHandler = useCallback(() => {
        materialId && dispatch(updateMaterialById(materialId));
    }, [dispatch, materialId]);
    const onCancelClickHandler = useCallback(() => {
        dispatch(materialDetailsSliceActions.setEditMode(false));
        dispatch(materialDetailsSliceActions.rollBackForm());
    }, [dispatch]);


    return (
        <VStack className={cls.layout}>
            <MaterialDetailsPageToolPanel
                onBackClick={onBackClickHandler}
                onSaveClick={onSaveClickHandler}
                onEditClick={onEditClickHandler}
                onDeleteClick={onDeleteClickHandler}
                onCancelClick={onCancelClickHandler}
                editMode={editMode}
            />
            <Page className={classNames(cls.MaterialDetailsPage, {}, [className])}>
                <VStack gap={'16px'} max={true} >
                    <EditableCard
                        removeAfterUnmount={true}
                        reducer={reducer}
                        isLoading={isLoading}
                    >
                        <MaterialCard/>
                    </EditableCard>
                </VStack>
            </Page>
        </VStack>
    );
});

MaterialDetailsPage.displayName = 'MaterialDetailsPage';

export default MaterialDetailsPage;