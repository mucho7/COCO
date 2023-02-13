import axios from "axios";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";


const javascriptDefault = `/**
* Problem: Binary Search: Search a sorted array for a target value.
*/
// Time: O(log n)
const binarySearch = (arr, target) => {
 return binarySearchHelper(arr, target, 0, arr.length - 1);
};
const binarySearchHelper = (arr, target, start, end) => {
 if (start > end) {
   return false;
 }
 let mid = Math.floor((start + end) / 2);
 if (arr[mid] === target) {
   return mid;
 }
 if (arr[mid] < target) {
   return binarySearchHelper(arr, target, mid + 1, end);
 }
 if (arr[mid] > target) {
   return binarySearchHelper(arr, target, start, mid - 1);
 }
};
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const target = 5;
console.log(binarySearch(arr, target));
`;


function Compiler(props) {

  const [userInput, setUserInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const code =  useSelector((state) => state.compile.code) || javascriptDefault;
  
  const [processing, setProcessing] = useState(null);
  const languageId = useSelector((state) => state.compile.languageId);
  // console.log(language)

  const handleCompile = () => {
    setProcessing(true);
    const formData = {
      language_id: languageId,
      // encode source code in base64
      source_code: window.btoa(code),
      stdin: window.btoa(userInput),
    };
    const options = {
      method: "POST",
      url: process.env.REACT_APP_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        setProcessing(false);
        console.log(error);
      });
  };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token)
        }, 2000)
        return
      } else {
        setProcessing(false)
        setOutputDetails(response.data)
        console.log('response.data', response.data)
        return
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
    }
  };

  const getOutput = () => {
    let statusId = outputDetails?.status?.id;

    if (statusId === 6) {
      // compilation error
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {atob(outputDetails?.compile_output)}
        </pre>
      );
    } else if (statusId === 3) {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-green-500">
          {atob(outputDetails.stdout) !== null
            ? `${atob(outputDetails.stdout)}`
            : null}
        </pre>
      );
    } else if (statusId === 5) {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {`Time Limit Exceeded`}
        </pre>
      );
    } else {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {atob(outputDetails?.stderr)}
        </pre>
      );
    }
  };
  

  return (
    <Box sx={{ height: 300, display: "flex" }}>
      <Paper
        sx={{ width: "50%", background: "#D9D9D9", color: "black", p: '2px 4px', borderRadius: "15px" }}
      >
        <InputBase
          placeholder="input..."
          sx={{ ml: 1, flex: 1 }}
          multiline
          maxRows={4}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button
          onClick={handleCompile}
          disabled={!code}
        >
          {processing ? "Processing..." : "Compile and Execute"}
        </button>
      </Paper>
      <Paper
        sx={{ width: "50%", background: "#D9D9D9", color: "black", p: '2px 4px', display: 'flex', alignItems: 'center', borderRadius: "15px" }}
      >
        {outputDetails ? <>{getOutput()}</> : null}
      </Paper>
    </Box>
  )
}

export const statuses = [
  {
    id: 1,
    description: "In Queue",
  },
  {
    id: 2,
    description: "Processing",
  },
  {
    id: 3,
    description: "Accepted",
  },
  {
    id: 4,
    description: "Wrong Answer",
  },
  {
    id: 5,
    description: "Time Limit Exceeded",
  },
  {
    id: 6,
    description: "Compilation Error",
  },
  {
    id: 7,
    description: "Runtime Error (SIGSEGV)",
  },
  {
    id: 8,
    description: "Runtime Error (SIGXFSZ)",
  },
  {
    id: 9,
    description: "Runtime Error (SIGFPE)",
  },
  {
    id: 10,
    description: "Runtime Error (SIGABRT)",
  },
  {
    id: 11,
    description: "Runtime Error (NZEC)",
  },
  {
    id: 12,
    description: "Runtime Error (Other)",
  },
  {
    id: 13,
    description: "Internal Error",
  },
  {
    id: 14,
    description: "Exec Format Error",
  },
];

export default Compiler;