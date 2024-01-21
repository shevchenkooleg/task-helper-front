import cls from './CorrectionsInformation.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { getOrderFormData } from '../../model/selectors/getOrderFormData/getOrderFormData';
import { HStack, VStack } from '@/shared/ui/Stack';

interface CorrectionsInformationProps {
    className?: string
}

export const CorrectionsInformation = memo((props: CorrectionsInformationProps) => {
    const { className } = props;
    const orderFormData = useSelector(getOrderFormData)?.correctionId;

    return (
        <div className={classNames(cls.CorrectionsInformation, {}, [className])}>
            <h4>Движение материалов</h4>
            <VStack align={'start'}>
                <HStack>
                    <div>Корректировки назначения:</div>

                </HStack>
                <HStack>
                    <div>Накладные М11:</div>
                </HStack>
            </VStack>

        </div>
    );
});

CorrectionsInformation.displayName = 'CorrectionsInformation';