import { Combobox, Transition } from '@headlessui/react';
import { Fragment, useCallback } from 'react';
import UpDownIcon from '@/shared/assets/icons/UpDownIcon.svg';
import CheckIcon from '@/shared/assets/icons/CheckIcon.svg';
import cls from './ComboBox.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

interface ComboBoxProps {
    className?: string
    placeholder?: string
    inputPlaceholder?: string
    inputStyles?: string
    inputBlockStyles?: string
    buttonStyles?: string
    buttonIconStyles?: string
    query: string
    setQuery?: (value: string)=>void
    items?: Array<string>
    callback?: (item:string)=>void
    value?: string
    width?: string
}

export const ComboBox = (props: ComboBoxProps) => {
    const { className, placeholder = 'placeholder', query, buttonStyles, buttonIconStyles,
        setQuery, items, callback, value = '', inputPlaceholder,
        inputStyles, inputBlockStyles, width } = props;

    const onOptionsElementClick = useCallback((value: string)=>{
        console.log(value);
        callback && callback(value);
    },[callback]);

    return (
        <div className={cls.ComboBox}>
            {placeholder && <div className={cls.placeholder}>{placeholder}</div>}
            <Combobox value={''} onChange={onOptionsElementClick}>
                <div className={cls.container}>
                    <div className={inputBlockStyles ? inputBlockStyles : cls.inputBlock}>
                        <Combobox.Input
                            className={inputStyles ? inputStyles : cls.input}
                            style={{ 'width': `${width}` }}
                            displayValue={() => value}
                            placeholder={inputPlaceholder}
                            onChange={(event) => {
                                const value = event.target.value;
                                setQuery && setQuery(value);
                            }}
                        />
                        <Combobox.Button className={buttonStyles ? buttonStyles : cls.button}>
                            <UpDownIcon
                                className={buttonIconStyles ? buttonIconStyles : cls.btnIcon}
                                aria-hidden="true"
                            />
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery && setQuery('')}
                    >
                        <Combobox.Options className={cls.options}>
                            {items && items.length === 0 && query !== '' ? (
                                <div className={cls.nthText}>
                                    Nothing found.
                                </div>
                            ) : (
                                items && items.map((item, key) => (
                                    <Combobox.Option
                                        key={key}
                                        className={cls.option}
                                        value={item}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={classNames(cls.optionSpan, { [cls.selected]:selected }, [])}
                                                >
                                                    {item}
                                                </span>
                                                {selected ? (
                                                    <span
                                                        className={cls.iconSpan}
                                                    >
                                                        <CheckIcon className={cls.checkIcon} aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    );
};

ComboBox.displayName = 'ComboBox';