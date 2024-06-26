import cls from './StatusLine.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useState } from 'react';
import { HStack } from '../Stack';

export type StatusLineOptions = {value: string, content: string}[]

interface StatusLineProps<T> {
    className?: string
    editMode?: boolean
    onChange?: (value: T) => void
    statusOptions: StatusLineOptions
    currentStatus?: T
}

//TODO fix lost generic props with React.memo
export const StatusLine =  <T extends string> (props: StatusLineProps<T>) => {
    const { className, editMode= false, onChange , statusOptions  , currentStatus } = props;

    const currentOrderStatusIndex = statusOptions.findIndex(el=>el.value === currentStatus);
    const [hoverElementIndex, setHoverElement] = useState(-1);
    const onElementClickHandler = (newStatus: T) => {
        onChange && onChange(newStatus);
    };

    console.log('currentOrderStatusIndex ', currentOrderStatusIndex);

    console.log('statusOptions ', statusOptions);

    return (
        <HStack className={classNames(cls.OrderStatusLine, {}, [className])}>
            {statusOptions.map((el, index)=>{
                return (
                    <div className={cls.container} key={el.value}>
                        <div
                            onMouseOver={() => {
                                editMode && setHoverElement(statusOptions.findIndex(status => status.value === el.value));
                            }}
                            onMouseLeave={() => {
                                editMode && setHoverElement(-1);
                            }}
                            onClick={() => onElementClickHandler(el.value as T)}
                            className={classNames(cls.element,{ [cls[el.value]]: true,[cls.editMode]:editMode }, [currentOrderStatusIndex >= index ? cls.reached : '', hoverElementIndex >= index && currentOrderStatusIndex < index ? cls.elHover : ''])}
                        >
                            {el.content}
                        </div>
                    </div>
                );
            })}
        </HStack>
    );
};

StatusLine.displayName = 'StatusLine';
