import cls from './Search.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ChangeEvent, memo, useCallback, useEffect, useState } from 'react';
import { Icon } from '../../Icon';
import SearchIcon from '../../../assets/icons/SearchLight.svg';
import { HStack } from '../../Stack';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';

interface SearchProps {
    className?: string
    callBack?: (item:string)=> void
    placeholder?: string
}

export const Search = memo((props: SearchProps) => {
    const { className, callBack, placeholder } = props;
    const [searchValue, setSearchValue] = useState('');

    const debounceSearchCallback = useDebounce(
        (item: string) => {
            console.log('search', item);
            callBack && callBack(item);
        },
        1000);

    useEffect(()=>{
        debounceSearchCallback && debounceSearchCallback(searchValue);
    },[debounceSearchCallback, searchValue]);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue && setSearchValue(e.currentTarget.value);
    };


    const onEnterKeyPress = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            searchValue && console.log('search');
        }
    }, [searchValue]);

    useEffect(() => {
        window.addEventListener('keydown', onEnterKeyPress);
        return () => { window.removeEventListener('keydown', onEnterKeyPress); };
    }, [onEnterKeyPress]);

    return (
        <HStack gap={'12px'} className={classNames(cls.Search, {}, [className])}>
            <Icon Svg={SearchIcon}/>
            <input className={cls.input} placeholder={placeholder} value={searchValue} onChange={onChangeHandler}/>
        </HStack>
    );
});

Search.displayName = 'Search';