import { createRoot } from "react-dom/client";
import "./index.css";
import App from "../src/App/App";
import { store } from "./App/app.store";
import { Provider } from "react-redux";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
 

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <>
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
   <ToastContainer position="top-right" theme="colored" autoClose={4000} />
    </Provider>
  </QueryClientProvider>
  </>
);
