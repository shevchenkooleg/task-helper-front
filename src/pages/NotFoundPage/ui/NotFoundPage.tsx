import cls from './NotFoundPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { type FC } from 'react';
import { Page } from '@/widgets/Page';

interface NotFoundPageProps {
    className?: string
}

export const NotFoundPage: FC<NotFoundPageProps> = (props) => {
    const { className } = props;

    return (
        <Page data-testid={'NotFoundPage'} className={classNames(cls.NotFoundPage, {}, [className])}>
            {'page not exist'}
        </Page>
    );
};
