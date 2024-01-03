import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home/Home.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Content } from "./pages/Content/Content.tsx";
import { CurrentFilm } from "./pages/CurrentFilm/CurrentFilm.tsx";

import { Collections } from "./pages/Collections/Collections.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/content/:type",
        element: <Content />,
      },
      {
        path: "/film/:kinopoiskId",
        element: <CurrentFilm />,
      },

      {
        path: "/collections",
        element: <Collections />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  //<React.StrictMode>
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </Provider>
  //</React.StrictMode>
);
