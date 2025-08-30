import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Users from "./users/pages/Users";
// import NewPlaces from "./places/pages/NewPlaces";
import Error from "./Error";
import RootLayout from "./RootLayout";
// import UserPlaces from "./places/pages/UserPlaces";
// import UpdatePlaces from "./places/pages/UpdatePlaces";
import Authentication from "./users/pages/Authentication";
import ProtectedRoutes from "./ProtectedRoutes";
// import NewForm from "./NewForm";
import { lazy, useContext, useEffect, Suspense } from "react";
import { Authcontext } from "./shared/Components/Context/Auth-Context";
import LoadingSpinner from "./shared/Components/UIElements/LoadingSpinner";
const Users = lazy(() => import("./users/pages/Users"));
const NewPlaces = lazy(() => import("./places/pages/NewPlaces"));
const UserPlaces = lazy(() => import("./places/pages/UserPlaces"));
const UpdatePlaces = lazy(() => import("./places/pages/UpdatePlaces"));
const NewForm = lazy(() => import("./NewForm"));
function App() {
  const { login } = useContext(Authcontext);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: (
            <Suspense
              fallback={
                <div className="center">
                  <LoadingSpinner />
                </div>
              }
            >
              <Users />
            </Suspense>
          ),
        },
        {
          path: "/:userId/places",
          element: (
            <Suspense
              fallback={
                <div className="center">
                  <LoadingSpinner />
                </div>
              }
            >
              <UserPlaces />
            </Suspense>
          ),
        },
        {
          path: "places/new",
          element: (
            <ProtectedRoutes>
              <Suspense
                fallback={
                  <div className="center">
                    <LoadingSpinner />
                  </div>
                }
              >
                <NewPlaces />
              </Suspense>
            </ProtectedRoutes>
          ),
        },

        {
          path: "places/:placeId",
          element: (
            <ProtectedRoutes>
              <Suspense
                fallback={
                  <div className="center">
                    <LoadingSpinner />
                  </div>
                }
              >
                <UpdatePlaces />
              </Suspense>
            </ProtectedRoutes>
          ),
        },
        {
          path: "newInput",
          element: (
            <ProtectedRoutes>
              <Suspense
                fallback={
                  <div className="center">
                    <LoadingSpinner />
                  </div>
                }
              >
                <NewForm />
              </Suspense>
            </ProtectedRoutes>
          ),
        },
        {
          path: "authentication",
          element: <Authentication />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
