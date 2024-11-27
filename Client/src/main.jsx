// React
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Context providers
import { Provider } from "./components/ui/provider.jsx";
import { ColorModeProvider } from "./components/ui/color-mode";
import UserProvider from "./Users/UserProvider.jsx";
import ToDoListOverviewProvider from "./my_components/ToDoListOverviewProvider.jsx";
// My components
import ToDoListOverview from "./pages/ToDoListOverview.jsx";
import ShoppingListDetail from "./pages/ShoppingListDetail.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
// CSS
import "./main.css";
//import "./i18n"

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
      <ColorModeProvider>
        <UserProvider>
          <ToDoListOverviewProvider>
            <RouterProvider router={router} />
          </ToDoListOverviewProvider>
        </UserProvider>
      </ColorModeProvider>
    </Provider>
  </StrictMode>
);
