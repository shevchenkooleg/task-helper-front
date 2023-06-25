// import { componentRender } from "@/shared/lib/test/componentRender/componentRender";
// import { getRouteAbout, getRouteAdminPanel, getRouteProfile } from "@/shared/const/router";
// import AppRouter from "./AppRouter";
// import { screen } from "@testing-library/react"
// import { UserRole } from "@/entities/User";
//
// describe('AppRouter.test', () => {
//     test('Page should be render', async () => {
//         componentRender(<AppRouter />, {
//             route: getRouteAbout()
//         })
//
//         const page = await screen.findByTestId('AboutPage')
//         expect(page).toBeInTheDocument()
//     })
//
//     test('NotFoundPage should be render with wrong route', async () => {
//         componentRender(<AppRouter />, {
//             route: '/sadasfsad'
//         })
//
//         const page = await screen.findByTestId('NotFoundPage')
//         expect(page).toBeInTheDocument()
//     })
//
//     test('Unauthorized user should be redirect to the MainPage', async () => {
//         componentRender(<AppRouter />, {
//             route: getRouteProfile('1')
//         })
//
//         const page = await screen.findByTestId('MainPage')
//         expect(page).toBeInTheDocument()
//     })
//
//     test('Auth require page for authorized user should be render', async () => {
//         componentRender(<AppRouter />, {
//             route: getRouteProfile('1'),
//             initialState: {
//                 user: {
//                     _isInit: true,
//                     authData: { id: 1 }
//                 }
//             }
//         })
//
//         const page = await screen.findByTestId('ProfilePage')
//         expect(page).toBeInTheDocument()
//     })
//
//     test('User without require role should be redirect to the ForbiddenPage', async () => {
//         componentRender(<AppRouter />, {
//             route: getRouteAdminPanel(),
//             initialState: {
//                 user: {
//                     _isInit: true,
//                     authData: { id: 1, roles: [UserRole.USER] }
//                 }
//             }
//         })
//
//         const page = await screen.findByTestId('ForbiddenPage')
//         expect(page).toBeInTheDocument()
//     })
//     test('For user with require role should be AdminPanelPage should be render', async () => {
//         componentRender(<AppRouter />, {
//             route: getRouteAdminPanel(),
//             initialState: {
//                 user: {
//                     _isInit: true,
//                     authData: { id: 1, roles: [UserRole.ADMIN] }
//                 }
//             }
//         })
//
//         const page = await screen.findByTestId('AdminPanelPage')
//         expect(page).toBeInTheDocument()
//     })
// })


export default () => {}
