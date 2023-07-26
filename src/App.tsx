import StockFilter from "./components/filter";
import Products from "./components/products";
import Search from "./components/search";
import Sort from "./components/sort";
import { AppProvider } from "./context/context";

function App() {
  return (
    <>
      <AppProvider>
        <div className="container mx-auto w-4/5 space-y-4 p-4">
          <Search />
          <Sort />
          <StockFilter />
          <Products />
        </div>
      </AppProvider>
    </>
  );
}

export default App;
