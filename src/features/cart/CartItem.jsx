import { useDispatch } from "react-redux";
import { formatCurrency } from "../../utils/helpers";
import { deleteItem } from "./cartSlice";

import Button from "../../ui/Button";
import UpdateItemQuantity from "./UpdateItemQuantity";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const dispatch = useDispatch();

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="sm: flex items-center justify-between sm:gap-6">
        <p className="text-sm font-semibold">{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity pizzaId={pizzaId} quantity={quantity} />
        <Button type="small" onClick={() => dispatch(deleteItem(pizzaId))}>
          Delete
        </Button>
      </div>
    </li>
  );
}

export default CartItem;
