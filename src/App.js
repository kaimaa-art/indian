import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";

import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

import AllContact from "./routerPath/AllContact";
import AddContact from "./routerPath/AddContact";
import Home from "./routerPath/Home";
import AllBatch from "./routerPath/AllBatch";
import AddBatch from "./routerPath/AddBatch";
import BatchDetail from "./routerPath/BatchDetail";
import StudentDetail from "./routerPath/StudentDetail";
import UpdateStudent from "./routerPath/UpdateStudent";

const myRoute = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
    children: [
      {
        path: "",
        Component: Home,
      },
      {
        path: "home",
        Component: Home,
      },
      {
        path: "allcontact",
        Component: AllContact,
      },
      {
        path: "addcontact",
        Component: AddContact,
      },
      {
        path: "allbatch",
        Component: AllBatch,
      },
      {
        path: "addbatch",
        Component: AddBatch,
      },
      {
        path: "batchdetail",
        Component: BatchDetail,
      },
      {
        path: "studentDetail",
        Component: StudentDetail,
      },
      {
        path: "updatestudent",
        Component: UpdateStudent,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={myRoute} />

      <Toaster
        richColors
        position="top-right"
        duration={2500}
        closeButton
      />
    </>
  );
}

export default App;