import { useAppProvider } from "../context/context";
import { actions } from "../enums";

const Search = () => {
  const { dispatch } = useAppProvider();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      dispatch({ type: actions.SET_QUERY, payload: " " });
    }

    dispatch({ type: actions.SET_QUERY, payload: e.target.value });
  };

  return (
    <>
      <div className="flex justify-start gap-4">
        <label htmlFor="search" className="text-2xl">
          Search Products
        </label>
        <input
          type="text"
          className="text-2xl border border-gray-200"
          onChange={handleSearch}
        />
      </div>
    </>
  );
};

export default Search;
