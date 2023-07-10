import cls from './AboutPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

interface AboutPageProps {
    className?: string
}

const AboutPage = (props: AboutPageProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.AboutPage, {}, [className])}>
            About_Page
        </div>
    );
};

export default AboutPage;