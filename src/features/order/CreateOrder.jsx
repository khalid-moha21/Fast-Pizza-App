import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";
import { isValidPhone } from "../../utils/helpers";

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const navigation = useNavigation();
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: locationError,
  } = useSelector((store) => store.user);
  console.log(Object.keys(position).length);

  const isLoadingAddress = addressStatus === "loading";

  const isSubmmiting = navigation.state === "submitting";

  const formErrors = useActionData();
  const dispatch = useDispatch();
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      {/* <Form method="POST"  action="/order/new">   */
      /* since it submmit the data to the closest url it is not nessecary */}
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <div className="grow">
            <input
              type="text"
              name="customer"
              defaultValue={username}
              required
              className="input"
            />
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" className="input" required />
            {formErrors?.phone && (
              <p className="  mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              className="input"
              disabled={isLoadingAddress}
              defaultValue={address}
              required
            />
            {locationError && (
              <p className="   mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700 ">
                {locationError}
              </p>
            )}{" "}
            <input
              type="hidden"
              name="position"
              value={
                Object.keys(position).length &&
                `${position.latitude},${position.longtiude}`
              }
            />
          </div>
          {Object.keys(position).length === 0 && (
            <span className=" absolute right-[3px] top-[38px] z-10 sm:top-[4px]">
              <Button
                disabled={isLoadingAddress}
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get Location
              </Button>
            </span>
          )}
        </div>

        <div className=" mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className=" h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className=" font-medium">
            Want to give your order priority?
          </label>
        </div>
        <input
          type="hidden"
          name="cart"
          id="cart"
          value={JSON.stringify(cart)}
        />

        <div>
          <Button type="primary" disabled={isSubmmiting || isLoadingAddress}>
            {isSubmmiting
              ? "Submmiting..."
              : `Order now - ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  /* react router will pass the request to it when the form is submmited behined the sence ---need to be registered in the routes object first */
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority,
  };
  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone = "please provide a valid phone number";
  }

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
