import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menus = useLoaderData();

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menus.map((menu) => (
        <MenuItem pizza={menu} key={menu.id} />
      ))}
    </ul>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
