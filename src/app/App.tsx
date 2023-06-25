import { classNames } from '@/shared/lib/classNames/classNames';
// import { AppRouter } from "./providers/router";
// import { Navbar } from "@/widgets/Navbar";
// import { Sidebar } from "@/widgets/Sidebar";
// import { useSelector } from "react-redux";
// import { getUserIsInit, useUserActions } from "@/entities/User";
// import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';


const App = () => {
    // const { theme } = useTheme();
    // const isInit = useSelector(getUserIsInit)
    // const { initAuthData } = useUserActions()

    // useEffect(() => {
    //     initAuthData()
    // }, [initAuthData])

    return (
        // <div className={classNames('app', {}, [theme])}>
        // eslint-disable-next-line i18next/no-literal-string
        <div className={classNames('app', {}, [])}>
            dfsasf
            {/* <Suspense fallback=''> */}

            {/* <Navbar/> */}
            {/* <div className="content-page"> */}
            {/*    <Sidebar/> */}
            {/*    {isInit && <AppRouter/>} */}
            {/* </div> */}
            {/* </Suspense> */}
        </div>
    );
};

export default App;
