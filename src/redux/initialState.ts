export const REDUX_LC = "redux_superStore";

export interface IInitialData {
  search: string;
}

export const initialData: IInitialData = {
  search: "",
};

export const getInitialData = () => {
  const data = localStorage.getItem(REDUX_LC);
  return data ? JSON.parse(data) : initialData;
};
