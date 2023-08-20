import cls from './MaterialsPageTable.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { Material } from '@/entities/Material';
import { useNavigate } from 'react-router-dom';
import { VStack } from '@/shared/ui/Stack';
import { Table } from '@/shared/ui/Table';
import { MaterialTabHeaderKeys } from '@/features/addNewMaterial';
import { materialsTitlesMapper } from '../../../../shared/lib/titleMappers/materialsTitlesMapper';
import { getRouteMaterialDetails } from '@/shared/const/router';

interface MaterialsPageTableProps {
    className?: string
    materials?: Material[]
}

export const MaterialsPageTable = memo((props: MaterialsPageTableProps) => {
    const { className, materials } = props;
    const navigate = useNavigate();

    // const materialsForRendering = materials?.map((el)=>({ ...el, modified: timeConverter(el.modified!) }));
    const materialTabHeaderKeys = [
        MaterialTabHeaderKeys.MATERIAL_NAME,
        MaterialTabHeaderKeys.KSU_ID,
        MaterialTabHeaderKeys.FULL_VOLUME,
        MaterialTabHeaderKeys.DIMENSION,
    ];

    const onDoubleClickHandler = (e: React.MouseEvent<HTMLTableRowElement>, el: Material) => {
        el._id && navigate(getRouteMaterialDetails(el._id));
    };

    if (materials){
        return (
            <VStack gap={'32px'}>
                <Table<Material>
                    tabKeys={materialTabHeaderKeys}
                    headerKeysMapper={materialsTitlesMapper}
                    items={Object.values(materials)}
                    callback={onDoubleClickHandler}
                />
            </VStack>

        );
    }

    return (
        <div className={classNames(cls.OrdersPageTable, {}, [className])}>
            Materials Table should be here but some things going wrong
        </div>
    );
});

MaterialsPageTable.displayName = 'MaterialsPageTable';