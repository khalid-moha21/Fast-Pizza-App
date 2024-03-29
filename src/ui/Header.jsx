import { Link } from "react-router-dom";
import UserName from "../features/user/UserName";
import SearchOrder from "../features/order/SearchOrder";

function Header() {
  return (
    <header className="flex items-center justify-between border-b border-stone-200 bg-yellow-500 px-4 py-3 uppercase">
      <Link to="/" className=" tracking-widest">
        Fast Pizza
      </Link>
      <SearchOrder />
      <UserName />
    </header>
  );
}

export default Header;
