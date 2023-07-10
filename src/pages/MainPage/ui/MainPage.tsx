import cls from './MainPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

interface MainPageProps {
    className?: string
}

const MainPage = (props: MainPageProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.MainPage, {}, [className])}>
            MAIN_PAGE
        </div>
    );
};

export default MainPage;

