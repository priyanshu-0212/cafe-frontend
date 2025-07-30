// import React from 'react'
// export default function Temp(){
//   const handleClick = ()=>{
//     alert("Hello World");
//   }
//   const handleSubmit = (name)=>{
//     alert(`Hello ${name}`);
//   }
//   return(
//     <div>
//       <button onClick={handleClick}>Click</button>
//       <button onClick={() => handleSubmit("John")}>Submit</button>
//     </div>
//   )
// }


import { useState } from 'react';
export default function Temp() {
    const [score,setScore]=useState(0);
    const IncreaseScore = () => {
        setScore(score + 1);
    };
    const DecreaseScore = () => {
        setScore(score - 1);
    };
    return(
        <div>
            {score}
            <p>
            <button onClick={IncreaseScore}>Increase Score</button>
            <button onClick={DecreaseScore}>Decrease Score</button>
            </p>
            </div>
        );
    }
