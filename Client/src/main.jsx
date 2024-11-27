// React
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Context providers
import { Provider } from "./components/ui/provider.jsx";
import { ColorModeProvider } from "./components/ui/color-mode";
import UserProvider from "./Users/UserProvider.jsx";
import ShoppingListOverviewProvider from "./my_components/ShoppingListOverviewProvider.jsx";
// My components
import ShoppingListOverview from "./pages/ShoppingListOverview.jsx";
import ShoppingListDetail from "./pages/ShoppingListDetail.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
// CSS
import "./main.css";
//import "./i18n"

const router = createBrowserRouter([
  {
    path: "/",
    element: <ShoppingListOverview />,
    //errorElement: <NotFoundPage />,
    children: [
      {
        path: "/:shoppingListId",
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
          <ShoppingListOverviewProvider>
            <RouterProvider router={router} />
          </ShoppingListOverviewProvider>
        </UserProvider>
      </ColorModeProvider>
    </Provider>
  </StrictMode>
);
