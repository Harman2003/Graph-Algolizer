import React, { useState} from "react";
import InputArea from "./InputArea";
import Editor from "./Editor";
import MiniNavbar from "./MiniNavbar";


const TextArea = () => {

  const [popup, setpopup] = useState(false);
  const show = () => {
    popup ? setpopup(false) : setpopup(true);
  };

  const [popupState, setpopupState] = useState("User Input");

  const [langState, setLang] = useState("Java");
  //User Input Data
  const [inputData, setInputArea] = useState("");
  const [code, setCode] = useState("");

  return (
    <>
      {popup && (
        <div
          className="blocker fixed w-screen h-screen z-0"
          onClick={show}
        ></div>
      )}

      <div className="font-OpenSans h-[calc(100vh-56px)] w-full px-5 bg-gray-100 flex flex-col m-auto">
        <MiniNavbar
          popup={popup}
          show={show}
          langState={langState}
          setLang={setLang}
          popupState={popupState}
          setpopupState={setpopupState}
          inputData={inputData}
          code={code}
          setCode={setCode}
        />

        {popupState === "User Input" ? (
          <InputArea inputData={inputData} setInputArea={setInputArea} />
        ) : (
          <Editor code={code} setCode={setCode} langState={langState} />
        )}
      </div>
    </>
  );
};


export default TextArea;
