import React from "react";
import { RxCross1 as X } from "react-icons/rx";

const Modal = ({ setIsModal }) => {
  return (
    <div className="font-openSans fixed z-20 top-0 left-0 w-screen h-screen bg-black/25 flex justify-center items-center">
      <div className="absolute z-20 flex flex-col w-[50%] h-[90%] sm:h-[95%] bg-white rounded-lg shadow-2xl overflow-y-scroll">
        <X
          className="absolute right-3 top-3"
          onClick={() => {
            setIsModal(false);
          }}
        />
        <div className="text-3xl font-bold mb-6 mt-3 ml-3">How It Works</div>
        <img src="help1.png" alt="image1" className="w-[95%] self-center" />
        <div className="text-2xl font-bold mt-3 mb-1 ml-3">Steps:-</div>
        <div className="ml-3 mb-1">
          1. Generate any sample graph using 'Generate Sample' or Input your own
          graph in 'User Input' region.
        </div>
        <div className="ml-3 mb-1">
          2. Choose any algorithm from 'Algorithm' popup.
        </div>
        <div className="ml-3 mb-1">
          3. Enter any number in 'Enter Source Node' to choose a source node.
          Make sure source node number is present in the Graph
        </div>
        <div className="ml-3 mb-1">
          4. Hurray ! Now you can run your algorithm by pressing 'Run
          Visualizer'
        </div>

        <div className="text-2xl font-bold mt-3 mb-1 ml-3">
          Use your Own Depth First Search Code To visualize:-{" "}
        </div>
        <img src="help2.png" alt="image2" className="w-[95%] self-center" />

        <div className="ml-3 mb-1">
          1. Give your own graph input or simply use 'Sample Generator'
        </div>
        <div className="ml-3 mb-1">
          2. Write your own code in Editor or use{" "}
          <strong>'Sample Java Code'</strong> for a moment .
        </div>

        <div className="text-2xl font-bold mt-3 mb-1 ml-3">
          Commands In Editor:-
        </div>

        <img src="help3.png" alt="image3.png" className="w-[95%] self-center" />

        <div className="mt-2 ml-3 mb-1 font-semibold">
          {"/*src*/  => Means We are visiting a node"}
        </div>
        <div className="ml-3 mb-1 font-semibold">
          {"/**src**/  => Means We are Unvisiting a node (BackTracking)"}
        </div>

        <div className="mt-3">
          Note: /*src*/ inside the loop (InOrder) is only used to show the
          movement of Depth First Search
        </div>

        <div className="text-2xl font-bold mt-8 mb-3 ml-3">
          Try Out Without Unvisiting while BackTracking:-
        </div>
        <img src="help4.png" alt="image4" className="w-[95%] self-center" />
        
              <div className="text-lg my-3 ml-3">Now Go on and Try It Out !</div>

        <div className="flex justify-end w-full h-14 rounded-b-md mt-auto bg-gray-200">
          <button
            onClick={() => setIsModal(false)}
            className="mx-4 my-2 px-2 py-1 rounded-lg bg-orange-500 text-gray-100 font-semibold"
          >
            Thank You
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
