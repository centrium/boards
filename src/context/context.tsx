import { createContext, useContext, useReducer, useMemo } from "react";
import { actions } from "../enums";

type AppActions =
  | {
      type: actions.SET_QUERY;
      payload: string;
    }
  | {
      type: actions.SET_TITLE_SORT;
      payload: boolean;
    }
  | {
      type: actions.SET_AVAILABLE_ONLY;
      payload: boolean;
    };

type AppProps = { children: React.ReactNode };
type Dispatch = (action: AppActions) => void;

interface State {
  query: string;
  reverse: boolean;
  filterAvailableOnly: boolean;
}

const AppContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

const initialState = {
  query: "",
  reverse: false,
  filterAvailableOnly: true,
};

function AppReducer(state: State, action: AppActions) {
  switch (action.type) {
    case actions.SET_QUERY: {
      return {
        ...state,
        query: action.payload,
      };
    }
    case actions.SET_TITLE_SORT: {
      return {
        ...state,
        reverse: action.payload,
      };
    }
    case actions.SET_AVAILABLE_ONLY: {
      return {
        ...state,
        filterAvailableOnly: action.payload,
      };
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
}

function AppProvider({ children }: AppProps) {
  const [state, dispatch] = useReducer(AppReducer, {
    ...initialState,
  });
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

function useAppProvider() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
}

export { AppProvider, useAppProvider };
