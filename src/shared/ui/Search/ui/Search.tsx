import cls from './Search.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ChangeEvent, memo, useCallback, useEffect } from 'react';
import { Icon } from '../../Icon';
import SearchIcon from '../../../assets/icons/SearchLight.svg';
import { HStack } from '../../Stack';
import { ComboBox } from '../../Popups/ui/ComboBox/ComboBox';

interface SearchProps {
    className?: string
    value?: string
    onChange?: (newValue: string) => void
}

export const Search = memo((props: SearchProps) => {
    const { className, value, onChange } = props;

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e.currentTarget.value);
    };


    const onEnterKeyPress = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            value && console.log('search');
        }
    }, [value]);

    useEffect(() => {
        window.addEventListener('keydown', onEnterKeyPress);
        return () => { window.removeEventListener('keydown', onEnterKeyPress); };
    }, [onEnterKeyPress]);

    return (
        <HStack gap={'12px'} className={classNames(cls.Search, {}, [className])}>
            <Icon Svg={SearchIcon}/>
            <input className={cls.input} placeholder={'Поиск по заказам'} value={value} onChange={onChangeHandler}/>
            <ComboBox className={cls.input} query={''} />
        </HStack>
    );
});

Search.displayName = 'Search';