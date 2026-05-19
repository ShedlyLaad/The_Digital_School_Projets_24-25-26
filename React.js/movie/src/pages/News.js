import React, { useReducer } from "react";
import './spin.css';

const reducer = (state, action) => {
  switch (action.type) {
    case "PLUSONE":
      return { count: state.count + 1 };
    case "-ONE":
      return { count: state.count - 1 };
    default:
      return state;
  }
};

const News = ({start}) => {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  
  return (
    <div>
      <p>News</p>
      <div className="stepper horizontal">
        <div onClick={() => dispatch({ type: "-ONE" })}>
          <img src="https://alikinvv.github.io/stepper/build/img/arrow.svg" className="arrow top" alt="" />
        </div>
        <div className="box">
          {state.count}
        </div>
        <div onClick={() => dispatch({ type: "PLUSONE" })}>
          <img src="https://alikinvv.github.io/stepper/build/img/arrow.svg" className="arrow bottom" alt="" />
        </div>
      </div>
    </div>
  );
};

export default News;
