import { memo } from 'react';
import cls from './AdminPanelUserTable.module.scss';
import { AdminPanelUserData } from '@/features/getAdminPanelData';
import { useSelector } from 'react-redux';
import {
    getUsersForAdminPanel
} from '../../model/selectors/getUsersForAdminPanel/getUsersForAdminPanel';
import {
    getAdminPanelIsLoading
} from '../../model/selectors/getAdminPanelIsLoading/getAdminPanelIsLoading';
import { Skeleton } from '@/shared/ui/Skeleton';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';
import { TableGrid } from '@/shared/ui/TableGrid';

interface AdminPanelUserTableProps {
    className?: string
}

export const AdminPanelUserTable = memo((props: AdminPanelUserTableProps) => {
    const { className } = props;
    const users = useSelector(getUsersForAdminPanel);
    const isLoading = useSelector(getAdminPanelIsLoading);

    const onTableClick = (e: React.MouseEvent<HTMLTableRowElement>, el: AdminPanelUserData)=>{
        console.log(el);
    };

    console.log(users);

    const tabKeys = [
        '_id',
        'username',
        'created',
        'roles'
    ];

    if (users){
        console.log(users);
        return (
            // <Table<AdminPanelUserData>
            //     items={Object.values(users)}
            //     tabKeys={tabKeys}
            //     // exceptions={['hashedPassword', '__v', 'salt']}
            //     callback={onTableClick}
            // />
            <TableGrid<AdminPanelUserData, null, null>
                items={Object.values(users)}
                tabKeys={tabKeys}
                callback={onTableClick}
                template={'adminPanelUsersTemplate'}
            />
        );
    }

    if (isLoading) {
        return (
            <VStack max={true} gap={'16px'} className={classNames('', {}, [className])}>
                <Skeleton height={36}/>
                <Skeleton height={36}/>
                <Skeleton height={36}/>
                <Skeleton height={36}/>
            </VStack>
        );
    }


    return (
        <div className={classNames(cls.AdminPanelUserTable, {}, [className])}>

        </div>
    );



});

AdminPanelUserTable.displayName = 'AdminPanelUserTable';