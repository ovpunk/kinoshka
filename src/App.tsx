import { createContext, useState } from "react";
import { Layout } from "./components/Lyout/Layout";

interface IAppContext {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}
export const AppContext = createContext<IAppContext>({
  page: 1,
  setPage: () => {},
});

function App() {
  const [page, setPage] = useState(1);
  return (
    <>
      <AppContext.Provider value={{ page, setPage }}>
        <Layout />
      </AppContext.Provider>
    </>
  );
}

export default App;
