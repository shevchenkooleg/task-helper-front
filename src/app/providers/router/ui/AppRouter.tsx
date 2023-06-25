// import { memo, Suspense, useCallback } from 'react';
// import { Route, Routes } from "react-router-dom";
// import { PageLoader } from "@/widgets/PageLoader";
// import { RequireAuth } from "../../router/ui/RequireAuth";
// import { routeConfig } from "../../router/config/routeConfig";
// import { type AppRoutesProps } from "@/shared/types/router";
//
// const AppRouter = () => {
//     const renderWithWrapper = useCallback((route: AppRoutesProps) => {
//         const element = (
//             <Suspense fallback={<PageLoader />}>
//                 {route.element}
//             </Suspense>
//         )
//
//         return (
//             <Route
//                 key={route.path}
//                 element={route.authOnly ? <RequireAuth roles={route.roles}>{element}</RequireAuth> : element}
//                 path={route.path}
//             />
//         )
//     }, [])
//
//     return (
//         <Suspense fallback={<PageLoader/>}>
//             <Routes>
//                 {Object.values(routeConfig).map(renderWithWrapper)}
//             </Routes>
//         </Suspense>
//     );
// };
//
// export default memo(AppRouter);


export default () => {}
