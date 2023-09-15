import cls from './MaterialsPageToolsPanel.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { ToolBar } from '@/widgets/ToolBar';
import { HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';

interface MaterialsPageToolsPanelProps {
    className?: string
    addMaterialCallback: () => void
    refreshMaterialsCallback: () => void
}

export const MaterialsPageToolsPanel = memo((props: MaterialsPageToolsPanelProps) => {
    const { t } = useTranslation();
    const { className, addMaterialCallback, refreshMaterialsCallback } = props;

    return (
        <ToolBar>
            <HStack
                gap={'32px'}
                justify={'between'}
                max
                className={classNames(cls.MaterialsPageToolsPanel, {}, [className])}>
                <Text text={'Material Filters block'}/>
                <HStack gap={'32px'}>
                    <Button onClick={refreshMaterialsCallback}>загрузить материалы</Button>
                    <Button onClick={addMaterialCallback}>добавить материал</Button>
                </HStack>
            </HStack>
        </ToolBar>
    );
});

MaterialsPageToolsPanel.displayName = 'MaterialsPageToolsPanel';