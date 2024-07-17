import cls from './AdminPanelPageToolPanel.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { AdminPanelContentMode } from '../../model/type/adminPanel';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { VStack } from '@/shared/ui/Stack';
import { adminPanelSelectorBtn, AdminPanelView } from '@/shared/const/adminPanelConsts';
import { useSelector } from 'react-redux';
import { getAdminPanelView } from '../..';
import { adminPanelDataActions } from '../../model/slice/adminPanelSlice';

interface AdminPanelPageToolPanelProps {
    className?: string
    // onToggle: (newValue: AdminPanelView) => void
    contentMode: AdminPanelContentMode
}

export const AdminPanelPageToolPanel = memo((props: AdminPanelPageToolPanelProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const currenView = useSelector(getAdminPanelView);

    // const onUsersButtonClick = () => {
    //     onToggle(AdminPanelView.USERS);
    //     dispatch(getUsersForAdminPanel(null));
    // };


    //
    // const onMaintenanceButtonClick = () => {
    //     onToggle(AdminPanelView.MAINTENANCE);
    // };

    return (
        <VStack className={classNames(cls.AdminPanelBar, {}, [className])} gap={'32px'}>
            <VStack gap={'12px'}>
                { adminPanelSelectorBtn.map((btn)=> {
                    return (
                        <Button
                            theme={currenView === btn.value ? ButtonTheme.BACKGROUND : ButtonTheme.OUTLINE}
                            key={btn.value}
                            size={ButtonSize.SIZE_S}
                            trimPadding={false}
                            rounded={true}
                            className={cls.btn}
                            disabled={false}
                            onClick={()=>{
                                dispatch(adminPanelDataActions.setAdminPanelView(btn.value as AdminPanelView));
                            }}
                        >
                            {btn.content}
                        </Button>
                    );
                })
                }
            </VStack>
        </VStack>
    );
});

AdminPanelPageToolPanel.displayName = 'AdminPanelPageToolPanel';