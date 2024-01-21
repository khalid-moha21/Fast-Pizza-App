import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search order number"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="w-30 rounded-full bg-yellow-100 px-4 py-2 text-sm outline-none transition-all duration-300 placeholder:text-stone-400 focus:ring-2 focus:ring-yellow-100 sm:w-64 sm:focus:w-72"
      />
    </form>
  );
}

export default SearchOrder;
