import cls from './Calendar.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text, TextSize } from '@/shared/ui/Text';

interface CalendarProps {
    className?: string
}

export const Calendar = memo((props: CalendarProps) => {
    const { className } = props;
    const ruDate = new Intl.DateTimeFormat('ru', { day: 'numeric', weekday: 'short' }).format(new Date()).replace(/(\s?г\.?)/, '').split(',');

    return (
        <HStack className={classNames(cls.Calendar, {}, [className])}>
            <VStack className={classNames(cls.dateBlock)} align={'start'}>
                <Text text={ruDate[0].trim()} size={TextSize.SIZE_S} className={cls.dayIndicator} borderTrim={true}/>
                <Text text={ruDate[1].trim()} size={TextSize.SIZE_L} className={cls.dateIndicator} borderTrim={true}/>
            </VStack>
            <div className={cls.divider}></div>
        </HStack>

    );
});

Calendar.displayName = 'Calendar';