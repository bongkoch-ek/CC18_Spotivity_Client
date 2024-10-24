import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import Header from '../pages/Header'
import ActivityPage from '../pages/ActivityPage'
import DetailPage from '../pages/DetailPage'
import HomePage from '../pages/HomePage'
import CreateActivity from '../pages/CreateActivity'
import SideBarProfile from '../components/SideBarProfile'
import AttendingPage from '../pages/AttendingPage'
import HostingPage from '../pages/HostingPage'
import BookmarkPage from '../pages/BookmarkPage'
import PastEventPage from '../pages/PastEventPage'
import EditActivity from '../pages/EditActivityPage'
import useUserStore from '../stores/userStore'
import HistoryLayout from '../layouts/HistoryLayout'
import HostingLayout from '../layouts/HostingLayout'
import BookmarkLayout from '../layouts/BookmarkLayout'

const guestRouter = createBrowserRouter([
    {
        path: "/",
        element: <>
            <Header />
            <div className='pt-[78px]'>
                <Outlet />
            </div>
        </>,
        children: [
            { path: "", element: <HomePage /> },
            { path: "login", element: <LoginPage /> },
            { path: "register", element: <RegisterPage /> },
            { path: "activity", element: <ActivityPage /> },
            { path: "detail", element: <DetailPage /> },
        ]
    },
    { path: "*", element: <Navigate to='/' /> },
])
const userRouter = createBrowserRouter([
    {
        path: "/",
        element: <>
            <Header />
            <div className='pt-[78px]'>
                <Outlet />
            </div>
        </>,
        children: [
            { path: "", element: <HomePage /> },
            { path: "activity", element: <ActivityPage /> },
            { path: "detail", element: <DetailPage /> },
            { path: "create-activity", element: <CreateActivity /> },
            { path: "edit-activity", element: <EditActivity /> },
            { path: "history", element: <HistoryLayout /> },
            { path: "history/edit-profile", element: <HistoryLayout /> },
            { path: "history/hosting", element: <HostingLayout /> },
            { path: "history/bookmark", element: <BookmarkLayout /> },
            { path: "history/past-event", element: <div className='flex'><SideBarProfile /> <PastEventPage /></div> },

        ]
    },
    { path: "*", element: <Navigate to='/' /> },

])
export default function AppRouter() {
    const user = useUserStore(state => state.user)
    const finalRouter = user ? userRouter : guestRouter
    return (
        <RouterProvider router={finalRouter} />
    )

    return (
        <RouterProvider router={userRouter} />
    )
}