import { createBrowserRouter} from "react-router";
import { RouterProvider } from "react-router/dom";
import MainLayout from "./Layouts/MainLayout";
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import SignUpLayout from "./Layouts/SignUpLayout";
import PersonalInfo from "./Pages/PersonalInfo";
const App = () => {
  const router = createBrowserRouter([
    {
      Component: SignUpLayout,
      children: [
        { path: "/signin", Component: SignIn },
        { path: "/signup", Component: SignUp },
        { path:"/personal", Component: PersonalInfo}
      ],
    },
    {
      Component: MainLayout,
      children: [
        {
          path: "/",
          Component: Home
        },
        {},
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
