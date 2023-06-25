import { MainPage } from "@/pages/MainPage";
import {
    AppRoutes,
    getRouteMain
} from "@/shared/const/router";
import { type AppRoutesProps } from "@/shared/types/router";

export const routeConfig: OptionalRecord<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <MainPage/>
    }
    // [AppRoutes.ABOUT]: {
    //     path: getRouteAbout(),
    //     element: <AboutPage/>
    // },
    // [AppRoutes.PROFILE]: {
    //     path: getRouteProfile(':id'),
    //     element: <ProfilePage/>,
    //     authOnly: true
    // },
    // [AppRoutes.ARTICLES]: {
    //     path: getRouteArticles(),
    //     element: <ArticlesPage/>,
    //     authOnly: true
    // },
    // [AppRoutes.ARTICLE_DETAILS]: {
    //     path: getRouteArticleDetails(':id'),
    //     element: <ArticleDetailsPage/>,
    //     authOnly: true
    // },
    // [AppRoutes.ARTICLE_CREATE]: {
    //     path: getRouteArticleCreate(),
    //     element: <ArticleEditPage/>,
    //     authOnly: true
    // },
    // [AppRoutes.ARTICLE_EDIT]: {
    //     path: getRouteArticleEdit(':id'),
    //     element: <ArticleEditPage/>,
    //     authOnly: true
    // },
    // [AppRoutes.ADMIN_PANEL]: {
    //     path: getRouteAdminPanel(),
    //     element: <AdminPanelPage/>,
    //     authOnly: true,
    //     roles: [UserRole.MANAGER, UserRole.ADMIN]
    // },
    // [AppRoutes.FORBIDDEN_PAGE]: {
    //     path: getRouteForbiddenPage(),
    //     element: <ForbiddenPage/>,
    //     authOnly: true
    // },

    // last
    // [AppRoutes.NOT_FOUND]: {
    //     path: '*',
    //     element: <NotFoundPage/>
    // }
}
