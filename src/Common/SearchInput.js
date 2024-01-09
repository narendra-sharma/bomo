import React from "react";

const SearchInput = ({placeholder,handleSearch}) => {
  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 1000);
    };
  };

  const optimizedFn = debounce(handleSearch);
  return (
    <div className="input-group search">
      <input
        type="text"
        onChange={(e) => optimizedFn(e.target.value)}
        className="form_control"
        placeholder={placeholder}
      />
      <span className="input-group-text">
        <i className="fas fa-search"></i>
      </span>
    </div>
  )
}

export default SearchInput;
