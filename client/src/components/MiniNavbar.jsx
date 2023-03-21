import React, { useState,useContext, useRef } from "react";
import { addNodes } from "../controller/addData";
import { GoTriangleDown } from "react-icons/go";
import { AppContext } from "./Home";
import { codehandler } from "../api/CodeHandler";
import JavaCode from "../sample/test";
import Modal from "./Modal";
import {BsQuestionOctagon as Ques} from 'react-icons/bs'

const MiniNavbar = ({popup, show, popupState,langState,setLang, setpopupState, inputData, code, setCode}) => {

  const { graphdata, setgraph , NavHide1, NavHide2} = useContext(AppContext);
  
  const [langpopup, setlangpopup] = useState(false);
  const showlang = () => setlangpopup(!langpopup)
  
  const [isModal, setIsModal] = useState(false);
  

  return (
    <>
      <div className="relative toolbar flex px-3 py-3 rounded-b-md h-[10%]">
        <div
          className="absolute top-0 left-0 w-full h-full bg-gray-100/60 z-20 hidden"
          ref={NavHide2}
        ></div>
        <div className="ml-3 relative">
          <button
            className="border-2 border-gray-200 hover:bg-gray-200 rounded-full px-2 py-0.5 flex place-items-center relative z-10"
            onClick={show}
          >
            {popupState} <GoTriangleDown />
          </button>
          {popup && (
            <ul className="w-36 m-1 p-2 absolute rounded-lg shadow-2xl  ml-auto text-sm bg-gray-200 z-10">
              <div
                onClick={(e) => {
                  setpopupState(e.target.innerHTML);
                  show();
                }}
                className="hover:bg-slate-100 cursor-pointer"
              >
                {popupState === "User Input" ? "Editor" : "User Input"}
              </div>
            </ul>
          )}
        </div>
        <button
          className="border-2 text-sm px-2 rounded-full ml-auto mx-2"
          onClick={() => setIsModal(true)}
        >
          <div className="flex items-center">
            <Ques size={16} className="mr-2" />
            <div>How It Works</div>
          </div>
        </button>
        {popupState === "User Input" ? (
          <button
            className="bg-[#44a2e5] hover:bg-[#1b81ca] text-white text-sm px-2 py-0.5 rounded-full"
            onClick={(e) => addNodes(inputData, setgraph)}
          >
            Add Nodes
          </button>
        ) : (
          <div className="ml-3 relative">
            <button
              className="border-2 border-gray-200 hover:bg-gray-200 rounded-full px-2 py-2 flex place-items-center relative z-10"
              onClick={showlang}
            >
              {langState} <GoTriangleDown />
            </button>
            {langpopup && (
              <ul className="w-36 m-1 p-2 absolute rounded-lg shadow-2xl  ml-auto text-sm bg-gray-200 z-10">
                <div
                  onClick={(e) => {
                    setLang(e.target.innerHTML);
                    showlang();
                  }}
                  className="hover:bg-slate-100 cursor-pointer"
                >
                  {langState === "Java" ? "C++" : "Java"}
                </div>
              </ul>
            )}
          </div>
        )}

        <button
          className="bg-[#44a2e5] hover:bg-[#1b81ca] text-white text-sm px-2 py-0.5 rounded-full mx-2"
          onClick={() => {
            NavHide1.current.style.display = "block";
            NavHide2.current.style.display = "block";
            codehandler(graphdata, code, langState, NavHide1, NavHide2)
          }}
        >
          Run Code
        </button>
        {popupState === "Editor" && langState == "Java" && (
          <button
            className="bg-[#44a2e5] hover:bg-[#1b81ca] text-white text-sm px-2 py-0.5 rounded-full mx-2"
            onClick={() => setCode(JavaCode)}
          >
            Sample Java Code
          </button>
        )}
      </div>

      {/* How It Works */}
      {isModal && <Modal setIsModal={setIsModal} />}
    </>
  );
};

export default MiniNavbar;
