import { Provider } from "./components/ui/provider.jsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ToDoListOverview from "./pages/ToDoListOverview.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ShoppingListDetail from "./pages/ShoppingListDetail.jsx";
import UserProvider from "./Users/UserProvider.jsx";
import ToDoListOverviewProvider from "./my_components/ToDoListOverviewProvider.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ToDoListOverview />,
    //errorElement: <NotFoundPage />,
    children: [
      {
        path: "/:toDoListId",
        element: <ShoppingListDetail />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <UserProvider>
        <ToDoListOverviewProvider>
          <RouterProvider router={router} />
        </ToDoListOverviewProvider>
      </UserProvider>
    </Provider>
  </StrictMode>
);
