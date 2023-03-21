import React from "react";

const Data = ({inputData, setInputArea}) => {

  const textHandler = (e) => {
    setInputArea(e.target.value);
  };

  const placeholder = 
`<number of nodes>
[
  (source, target, weight),
  (source', target' , weight')
]

Example:-
10
[
  [1, 2, 5],
  [3, 4, 6]
]
`

  return (
    <textarea
      name="area"
      id="graphinput"
      onChange={textHandler}
      value={inputData}
      placeholder={placeholder}
      className="w-full h-[calc(100vh-56px)] mb-5 rounded-lg self-center p-4 bg-[#2B2B2B] text-white placeholder:text-slate-50/30"
    ></textarea>
  );
};

export default Data;
