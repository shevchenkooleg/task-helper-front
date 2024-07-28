import { memo } from 'react';
import { VStack } from '@/shared/ui/Stack';
import { BaseUnitInformation } from '../BaseUnitInformation/BaseUnitInformation';
import { MaintenanceUnitInformation } from '../MaintenanceUnitInformation/MaintenanceUnitInformation';

interface UnitDataCardProps {
    className?: string
    setModalOpen?: (isOpen: boolean) => void
}

export const UnitDataCard = memo((props: UnitDataCardProps) => {
    const { className , setModalOpen } = props;



    return (
        <VStack gap={'12px'} max>
            <BaseUnitInformation/>
            <MaintenanceUnitInformation setModalOpen={setModalOpen}/>
        </VStack>

    );
});

UnitDataCard.displayName = 'UnitDataCard';