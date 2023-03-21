import React, { useEffect} from "react";
import Editor from "@monaco-editor/react";


const MonacoEditor = ({ code, setCode, langState }) => {

  let javaTemplate = `public static class Solution {
        public void solve(int n, ArrayList<ArrayList<Integer>> graph) {
            //Write your code here or Use Sample Code
        }
    }
`;
  
  let cppTemplate = `#include <iostream>
using namespace std;

int main() {
    //Write Code Here
    return 0;
}`;
  
  useEffect(() => {
    langState === "Java" ? setCode(javaTemplate) : setCode(cppTemplate);
  }, [langState]);
 
  console.log(code);
  return (
    // <CodeEditor
    //   value={code}
    //   onChange={(e) => setCode(e)}
    //   theme={darculaInit({
    //     settings: {
    //       caret: "#c6c6c6",
    //       fontFamily: "monospace",
    //     },
    //     styles: [{ tag: t.comment, color: "#6272a4" }],
    //   })}
    //   height="calc(100vh - 56px)"
    //   placeholder="Please enter code"
    //   className="mb-5 overflow-auto text-sm rounded-lg "
    // />

    <Editor
      value={code}
      height="87%"
      width="100%"
      defaultLanguage={"java"}
      theme="vs-dark"
      onChange={(value, event) => setCode(value)}
      beforeMount={setEditorTheme}
    />
  );
};

function setEditorTheme(monaco) {
  monaco.editor.defineTheme("dracula", {
    base: "vs-dark",
    inherit: true,
    rules: [
      {
        token: "comment",
        foreground: "#5d7988",
        fontStyle: "italic",
      },
      { token: "constant", foreground: "#e06c75" },
    ],
    colors: {
      "editor.background": "#21252b",
    },
  });
}

export default MonacoEditor;

