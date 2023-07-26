import { useAppProvider } from "../context/context";
import { actions } from "../enums";

const StockFilter = () => {
  const { state, dispatch } = useAppProvider();

  const handleStockFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: actions.SET_AVAILABLE_ONLY, payload: e.target.checked });
  };

  return (
    <>
      <div className="flex justify-start gap-4">
        <label htmlFor="stock-filter">Show only in stock</label>
        <input
          checked={state.filterAvailableOnly}
          type="checkbox"
          name="stock-filter"
          id="stock-filter"
          onChange={handleStockFilter}
        />
      </div>
    </>
  );
};

export default StockFilter;
