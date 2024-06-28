import cls from './StructurePage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { StructurePageReducer } from '../../model/slice/structurePageSlice';
import { VStack } from '@/shared/ui/Stack';
import { Page } from '@/widgets/Page';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';

interface StructurePageProps {
    className?: string
}

const StructurePage = (props: StructurePageProps) => {
    const { className } = props;


    const reducers: ReducerList = {
        structure: StructurePageReducer
    };

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <VStack className={cls.layout} max align={'start'}>
                <Page data-testid={'StructurePage'} className={classNames(cls.StructurePage, {}, [className])}>
                    <VStack align={'start'} max>
                        <Button
                            theme={ButtonTheme.BACKGROUND_GREEN}
                            rounded
                            size={ButtonSize.SIZE_S}
                        >
                            Добавить объект
                        </Button>
                    </VStack>
                </Page>
            </VStack>
        </DynamicModuleLoader>
    );
};

export default memo(StructurePage);