import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home/Home.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Films } from "./pages/Films/Films.tsx";
import { CurrentFilm } from "./pages/CurrentFilm/CurrentFilm.tsx";
//import { Provider } from "react-redux";

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
        path: "/:type",
        element: <Films />,
      },
      {
        path: "/films/:kinopoiskId",
        element: <CurrentFilm />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  //<React.StrictMode>
  //<Provider store={store}>
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
  //</Provider>
  //</React.StrictMode>
);
