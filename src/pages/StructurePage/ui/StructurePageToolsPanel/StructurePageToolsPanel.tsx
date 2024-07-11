import cls from './StructurePageToolsPanel.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { VStack } from '@/shared/ui/Stack';

interface StructurePageToolPanelProps {
    className?: string
    addUnitCallback?: ()=>void
}

export const StructurePageToolsPanel = memo((props: StructurePageToolPanelProps) => {
    const { className , addUnitCallback } = props;

    return (
        <VStack gap={'24px'} className={classNames(cls.StructurePageToolPanel, {}, [className])} max align={'start'}>
            <Button theme={ButtonTheme.BACKGROUND_GREEN} rounded size={ButtonSize.SIZE_S} onClick={addUnitCallback}>
                Добавить объект
            </Button>
        </VStack>
    );
});

StructurePageToolsPanel.displayName = 'StructurePageToolsPanel';