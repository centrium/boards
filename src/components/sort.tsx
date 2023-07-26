import { useAppProvider } from "../context/context";
import { actions } from "../enums";

const Sort = () => {
  const { dispatch } = useAppProvider();

  const handleSortSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: actions.SET_TITLE_SORT,
      payload: e.target.value === "ASCENDING" ? false : true,
    });
  };

  return (
    <>
      <div className="flex justify-start gap-4">
        <label htmlFor="search" className="text-2xl">
          Sort Title
        </label>
        <select
          onChange={handleSortSelection}
          className="border rounded py-2 px-4"
        >
          <option value="ASCENDING">Ascending</option>
          <option value="DESCENDING">Descending</option>
        </select>
      </div>
    </>
  );
};

export default Sort;
