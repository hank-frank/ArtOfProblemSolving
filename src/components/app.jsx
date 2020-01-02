import React, { useState, useEffect } from 'react';
// import { HashRouter as Router, Route } from 'react-router-dom';
// import { render } from 'react-dom';

function App () {
    // [480, 240, 1080, 720, 540, 432, 288, 216, 160, 120, 360, 1200, 900, 2700, 1080, 360]
    let [inputArray, setInputArray] = useState([[2], [4, 3], [3, 2, 6], [2, 9, 5, 2], [10, 5, 2, 15, 5]]);
    let [possibleResults, setPossibleResults] = useState([]);
    let [expected, setExpected] = useState(1080);
    let [result, setResult] = useState(["test"]);

    useEffect(() => {
        let possibilities = pyramidPossibilities(inputArray);
        setPossibleResults(possibilities);
    },[])

    const pyramidDescent = (inputArray, expected) => {
        let pathFound = '';
        let resultsArray = [];

        const findPath = (currentRow = 1, parentIndex = 0, runningTotal = inputArray[0], runningDirection ='') => {  
            const row = inputArray[currentRow];
            // console.log(`Row: `, row);
            // console.log(`parent index: `, parentIndex);
            // console.log(`runningTotal: `, runningTotal);
            // console.log(`runningDirection: `, );
            // console.log(`resultsArray: `, resultsArray)
            
            const pathOptions = [
            row[parentIndex],
            row[parentIndex + 1]
            ];

            pathOptions.forEach((number, index) => {
            const direction = index ? "R" : "L";

            currentRow++;
            runningTotal = runningTotal * number;
            runningDirection = runningDirection + direction;
            
            if (runningTotal === expected && currentRow === inputArray.length) {
                pathFound = runningDirection;
                return true;
            }
            else if (currentRow < inputArray.length) {
                parentIndex = parentIndex + index;
                findPath(currentRow, parentIndex, runningTotal, runningDirection)
            }
            
            currentRow--;
            runningTotal = runningTotal / number;
            runningDirection = runningDirection.slice(0, -1);

            })

            if (pathFound) {
            resultsArray.push(pathFound);
            pathFound = '';
            }

            if (resultsArray.length > 0) {
                return resultsArray;
            }
            else {
                return false;
            }
        };
            return findPath();
    };

    const pyramidPossibilities = (inputArray) => {
        let pathFound = '';
        let resultsArray = [];

        const findAll = (currentRow = 1, parentIndex = 0, runningTotal = inputArray[0], runningDirection ='') => {  
            const row = inputArray[currentRow];
            //console.log(`Row: `, row);
            //console.log(`parent index: `, parentIndex);
            //console.log(`runningTotal: `, runningTotal);
            // console.log(`runningDirection: `, );
            // console.log(`resultsArray: `, resultsArray)
            
            const pathOptions = [
            row[parentIndex],
            row[parentIndex + 1]
            ];

            pathOptions.forEach((number, index) => {
            // const direction = index ? "R" : "L";

            currentRow++;
            runningTotal = runningTotal * number;
            // runningDirection = runningDirection + direction;
            
            if (currentRow === inputArray.length) {
                console.log(`runningTotal from if: `, runningTotal);
                resultsArray.push(runningTotal);
                
            }
            else if (currentRow < inputArray.length) {
                parentIndex = parentIndex + index;
                console.log(`runningTotal from else: `, runningTotal)
                console.log(`parentIndex from else: `, parentIndex)
                findAll(currentRow, parentIndex, runningTotal, runningDirection)
            }
            
            currentRow--;
            runningTotal = runningTotal / number;
            runningDirection = runningDirection.slice(0, -1);

            })

            if (pathFound) {
            resultsArray.push(pathFound);
            pathFound = '';
            }

            if (resultsArray.length > 0) {
                return resultsArray;
            }
            else {
                return false;
            }
        };
            console.log(`possible results: `, resultsArray);    
        // setPossibleResults(resultsArray);
            return findAll();
    };

    let final = () => {
        let theValue = pyramidDescent(inputArray, expected);
        console.log(`value: `, theValue)
        setResult(theValue);
    }

    let testValue = pyramidDescent(inputArray, expected);
    
    

    const changeExpected = (event) => {
        setExpected(Number(event.target.value));
        
    };

    console.log(`possibleResults: `, possibleResults)

    return (
        <>
            <h1>{result}</h1>
            <h1>{testValue}</h1>
            {/* <h1>{allPossibilities}</h1> */}
            <button onClick={final}>Testing!</button>
            <select className="options" onChange={changeExpected}>
                {
                    possibleResults.map((possibleProduct) => {
                        return (
                            <option value={possibleProduct}>{possibleProduct}</option>
                        )
                    })
                }
            </select>

        </>
        );

};

export default App;
