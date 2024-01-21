import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";

function Home() {
  const username = useSelector((store) => store.user.username);
  return (
    <div className="m-10 flex flex-col items-center gap-8 ">
      <h1 className="text-center text-xl font-semibold text-yellow-500 md:text-3xl">
        The best pizza.
        <br />
        Straight out of the oven, straight to you.
      </h1>
      {username ? (
        <Button
          to="/menu"
          type="primary"
          className="text-center"
        >{`continue ordering, ${username}`}</Button>
      ) : (
        <CreateUser />
      )}
    </div>
  );
}

export default Home;
