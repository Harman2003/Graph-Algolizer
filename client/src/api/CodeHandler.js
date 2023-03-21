import axios from '../axios/axios'
import { handleRun } from "./handleRun";

export const codehandler = async (graphdata, code, lang, NavHide1, NavHide2) => {

    let javaTemplate = `

import java.util.ArrayList;
import java.util.Scanner;
class Main {
    
    ${code}
    
    public static void main(String[] args) {
        
        Scanner scn = new Scanner(System.in);
        int n= scn.nextInt();
        int edges = scn.nextInt();
      
        ArrayList<ArrayList<Integer>> graph = new ArrayList<>();
        for (int i = 0; i < edges; i++) {
            int src = scn.nextInt();
            int des = scn.nextInt();
            int weight = scn.nextInt();
            
            ArrayList<Integer> temp = new ArrayList<>();
            temp.add(src);
            temp.add(des);
            temp.add(weight);
            graph.add(temp);
        }
        Solution obj = new Solution();
        obj.solve(n, graph);
        scn.close();
    }
   
}`;

    const javaCode = manipulate(javaTemplate, 'Java');
    if (javaCode) javaTemplate = javaCode;
    
    const input = constructInput(graphdata);

    console.log(javaTemplate);

  const ext = extension(lang);

  const data = {
    lang: lang == "Java" ? "java" : "cpp",
    code: {
      stdin: input,
      files: [
        {
          name: `main.${ext}`,
          content: javaTemplate,
        },
      ],
    },
  };


  let result = await axios.post('api/code', data);

  await handleRun(result.data.stdout.split(/\n/), graphdata);
  NavHide1.current.style.display = "none";
  NavHide2.current.style.display = "none";
}

function extension(lang) {
  switch (lang) {
    case "Java":
      return "java";
    case "python":
      return "py";
    case "C++":
      return "cpp";
  }
}

function constructInput(graphdata) {

    let inputString = `${graphdata.nodes.length} ${graphdata.links.length} `;
    for (const e of graphdata.links) {
        inputString+= `${e.source} ${e.target} ${e.value} `
    }
    return inputString;
}

function manipulate(template, lang) {
    const regex = /\/.+\//g;
    const keys = template.match(regex);
    if (!keys) return;
    // for (let i = 0; i < keys.length; i++){
    //     let str = keys[i];
    //   keys[i] = str.substring(2, str.length - 2);
    // }

      for (let node of keys) {
        if (!node.includes('*')) continue;
             node = node.substring(2, node.length - 2);
        node = node.trim();
        
        let print;
        if (lang === "Java") {
          print = node.includes("*")
            ? `System.out.println("r"+${node
              .substring(1, node.length - 1)
              .trim()});`
            : `System.out.println(${node});`;
        }
        else {
          print = node.includes("*")? `cout<<"r"<<${node
              .substring(1, node.length - 1)
              .trim()}<<endl;`: `cout<<${node}<<endl;`
        }
        
            template= template.replace(/\/.+\//, print);
        }
    
    return template;
   
}