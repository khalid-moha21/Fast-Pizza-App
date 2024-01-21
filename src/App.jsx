import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Order from "./features/order/Order";
import AppLayout from "./ui/AppLayout";
import { action as createOrderAction } from "./features/order/CreateOrder";
import { loader as orderLoader } from "./features/order/Order";
import Menu, { loader as mainLoader } from "./features/menu/Menu";
import Home from "./ui/Home";
import Cart from "./features/cart/Cart";
import CreateOrder from "./features/order/CreateOrder";
import Error from "./ui/Error";

const router = createBrowserRouter([
  {
    element: <AppLayout />, //layout routes -- since it has no any path
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "menu",
        element: <Menu />,
        loader: mainLoader,
        errorElement: <Error />,
      },
      { path: "cart", element: <Cart /> },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: "order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
