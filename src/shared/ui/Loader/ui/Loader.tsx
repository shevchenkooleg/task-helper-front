import { classNames } from "@/shared/lib/classNames/classNames";
import type { FC } from 'react';
import './Loader.scss'

interface LoaderProps {
    className?: string
}

export const Loader: FC<LoaderProps> = (props) => {
    const { className } = props

    return (
        <div className={classNames('lds-ellipsis', {}, [className])}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};
