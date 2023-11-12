import { Combobox, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import UpDownIcon from '@/shared/assets/icons/UpDownIcon.svg';
import CheckIcon from '@/shared/assets/icons/CheckIcon.svg';
import cls from './ComboBox.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

interface ComboBoxProps<T> {
    className?: string
    placeholder?: string
    query: string
    setQuery?: (value: string)=>void
    items?: Array<T>
    callback?: (item:T)=>void
    value?: string
}

//TODO do refactoring making code universal (without Material generic)

export const ComboBox = <T extends { materialName?: string, KSUId?: string }>(props: ComboBoxProps<T>) => {
    const { className, placeholder = 'placeholder', query, setQuery, items, callback, value = '' } = props;

    const [selected, setSelected] = useState({} as T);

    useEffect(()=>{
        callback && callback(selected);
    },[callback, selected]);

    console.log('selected ', selected);

    return (
        <div className={cls.ComboBox}>
            <div className={cls.placeholder}>{placeholder}</div>

            <Combobox value={selected} onChange={setSelected}>
                <div className={cls.container}>
                    <div className={cls.inputBlock}>
                        <Combobox.Input
                            className={cls.input}
                            displayValue={(material: T) => material.materialName ?? value}
                            onChange={(event) => {
                                const value = event.target.value;
                                setQuery && setQuery(value);
                            }}
                        />
                        <Combobox.Button className={cls.button}>
                            <UpDownIcon
                                className={cls.btnIcon}
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
                                items && items.map((material) => (
                                    <Combobox.Option
                                        key={material.KSUId}
                                        // className={({ active }) =>
                                        //     `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                        //         active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                        //     }`
                                        // }
                                        className={cls.option}
                                        value={material}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                {/*<span*/}
                                                {/*    className={`block truncate ${*/}
                                                {/*        selected ? 'font-medium' : 'font-normal'*/}
                                                {/*    }`}*/}
                                                {/*>*/}
                                                <span
                                                    className={classNames(cls.optionSpan, { [cls.selected]:selected }, [])}
                                                >
                                                    {material.materialName}
                                                </span>
                                                {selected ? (
                                                    // <span
                                                    //     className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                    //         active ? 'text-white' : 'text-teal-600'
                                                    //     }`}
                                                    // >
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