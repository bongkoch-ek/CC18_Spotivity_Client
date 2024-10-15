import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
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

const userRouter = createBrowserRouter([
    {
        path: "/",
        element: <>
            <Header />
            <Outlet />
        </>,
        children: [
            { path: "", element: <HomePage /> },
            { path: "/login", element: <LoginPage /> },
            { path: "/register", element: <RegisterPage /> },
            { path: "/activity", element: <ActivityPage /> },
            { path: "/detail", element: <DetailPage /> },
            { path: "/create-activity", element: <CreateActivity /> },
            { path: "/edit-activity", element: <EditActivity /> },
            { path: "/history", element: <div className='flex'><SideBarProfile /> <AttendingPage /></div> },
            { path: "/history/edit-profile", element: <div className='flex'><SideBarProfile /> <AttendingPage /></div> },
            { path: "/history/hosting", element: <div className='flex'><SideBarProfile /> <HostingPage /></div> },
            { path: "/history/bookmark", element: <div className='flex'><SideBarProfile /> <BookmarkPage /></div> },
            { path: "/history/past-event", element: <div className='flex'><SideBarProfile /> <PastEventPage /></div> },

        ]
    }
])
export default function AppRouter() {
    return (
        <RouterProvider router={userRouter} />
    )
}