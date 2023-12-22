import { useEffect, useReducer } from "react";
import { iEndpoint, listEndpoints } from "../storage";

interface iState {
  endpoints: iEndpoint[];
  loading: boolean;
}

const useHome = () => {
  const [state, dispatch] = useReducer(
    (state: iState, action: any) => {
      switch (action.type) {
        case "changeEndpoints":
          return { ...state, endpoints: action.payload, loading: false };
      }
      return state;
    },
    { endpoints: [], loading: false }
  );
  useEffect(() => {
    listEndpoints().then((endpoints) => {
      dispatch({ type: "changeEndpoints", payload: endpoints });
    });
  });
  return { state };
};

function HomePage() {
  const { state } = useHome();
  return (
    <div className="w-full h-screen">
      <div className="mx-auto max-w-[960px] flex flex-wrap">
        {state.endpoints.map((endpoint: iEndpoint, index: number) => (
          <div key={index} className="w-[360px] px-4">
            <div>{endpoint.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
