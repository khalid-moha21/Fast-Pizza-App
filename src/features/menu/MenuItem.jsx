import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem } from "../cart/cartSlice";
import { deleteItem, getCurrentQuantityById } from "../cart/cartSlice";
import UpdateItemQuantity from "../cart/updateItemQuantity";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;
  // console.log("menurerender");

  function handleAddItem() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 2,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col py-1">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm font-medium ">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {!soldOut && (
            <>
              {isInCart && (
                <div className="flex gap-3 sm:gap-8">
                  <UpdateItemQuantity quantity={currentQuantity} pizzaId={id} />
                  <Button type="small" onClick={() => dispatch(deleteItem(id))}>
                    Delete
                  </Button>
                </div>
              )}
              {!isInCart && (
                <Button type="small" onClick={handleAddItem}>
                  Add To Cart
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
