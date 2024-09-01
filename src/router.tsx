import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import AppProviders from "./providers";
import Store from "./pages/home/Home";

export type InitializeRouterProps = RouteObject & {
  title: string;
};

export const routes: InitializeRouterProps[] = [
  {
    id: "store",
    path: "/",
    title: "Store",
    element: (
      <AppProviders>
        <Store></Store>
      </AppProviders>
    ),
  },
];

function InitialRouterModule() {
  const content = createBrowserRouter(routes);
  return <RouterProvider router={content} />;
}

export default InitialRouterModule;
