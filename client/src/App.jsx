import {Navigate, Outlet, RouterProvider, createBrowserRouter} from "react-router-dom"
import "./index.css"
import Main from "./main/Main"
import Book from "./book/Book"
import Reg from "./entry/Reg"
import Auth from "./entry/Auth"
import NewBook from "./newBook/NewBook"
import MyBook from "./myBook/MyBook"
import Admin from "./admin/Admin"
import { useSelector } from "react-redux"

const routerUser = createBrowserRouter([
  {
    path: '/',
    element: <Outlet />,
    children: [
      {
        path: "/",
        element: <Main />
      },
      {
        path: '/book/:id',
        element: <Book />
      },
      {
        path: "/reg",
        element: <Reg />
      },
      {
        path: "/auth",
        element: <Auth />
      },
      {
        path: "/newBook",
        element: <NewBook />
      },
      {
        path: '/myBook',
        element: <MyBook />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" />
  }
])

const adminRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
      <Outlet />
    </>,
    children: [
      {
        path: '/admin',
        element: <Admin />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/admin" />
  }
])

export default function App(){
  const token = useSelector((state) => state.auth.token);
  const roleid = useSelector((state) => state.auth.roleid);
  if (token) {
    if (roleid === 2) {
      return <RouterProvider router={adminRouter} />;
    } else {
      return <RouterProvider router={routerUser} />;
    }
  } else {
    return <RouterProvider router={routerUser} />;
  }
}