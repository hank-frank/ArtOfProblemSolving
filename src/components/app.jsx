import React, { useState, useEffect } from 'react';

function App () {
    let [inputArray, setInputArray] = useState([[2], [4, 3], [3, 2, 6], [2, 9, 5, 2], [10, 5, 2, 15, 5]]);
    let [userInput, setUserInput] = useState('');
    let [possibleResults, setPossibleResults] = useState([]);
    let [expected, setExpected] = useState([]);
    let [result, setResult] = useState([]);
    let [possibleLengths, setPossibleLengths] = useState([]);

    useEffect(() => {
        let possibilities = pyramidPossibilities(inputArray);
        setPossibleResults(possibilities);

        let len = possiblePyramidLengths();
        setPossibleLengths(len);
        
        setResult(pyramidDescent(inputArray, expected));
    },[inputArray, expected])

    let possiblePyramidLengths = () => {
        let stop = 30;
        let total = 1;
        let arr = [];

        for (let i = 0; i < stop; i++) {
            total += i;
            arr.push(total);
            total++
        }
        return arr;
    }

    const pyramidDescent = (inputArray, expected) => {
        let pathFound = '';
        let resultsArray = [];

        const findPath = (workingRow = 1, parentRow = 0, workingTotal = inputArray[0], workingPath ='') => {  
            const currentRow = inputArray[workingRow];
            
            const pathOptions = [
                currentRow[parentRow],
                currentRow[parentRow + 1]
            ];

            pathOptions.forEach((number, index) => {
                const direction = index ? "R" : "L";

                workingRow++;
                workingTotal = workingTotal * number;
                workingPath = workingPath + direction;
                
                if (workingTotal === expected && workingRow === inputArray.length) {
                    pathFound = workingPath;
                    return true;
                }
                else if (workingRow < inputArray.length) {
                    parentRow = parentRow + index;
                    findPath(workingRow, parentRow, workingTotal, workingPath)
                }
                
                workingRow--;
                workingTotal = workingTotal / number;
                workingPath = workingPath.slice(0, -1);
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
        let resultsArray = [];

        const findAll = (workingRow = 1, parentRow = 0, workingTotal = inputArray[0], workingPath ='') => {  
            const currentRow = inputArray[workingRow];

            const pathOptions = [
                currentRow[parentRow],
                currentRow[parentRow + 1]
            ];

            pathOptions.forEach((number, index) => {
                workingRow++;
                workingTotal = workingTotal * number;
                
                if (workingRow === inputArray.length) {
                    resultsArray.push(workingTotal);
                }
                else if (workingRow < inputArray.length) {
                    parentRow = parentRow + index;
                    findAll(workingRow, parentRow, workingTotal, workingPath)
                }
                
                workingRow--;
                workingTotal = workingTotal / number;
                workingPath = workingPath.slice(0, -1);
            })

            if (resultsArray.length > 0) {
                return resultsArray;
            }
            else {
                return false;
            }
        };   
        
        return findAll();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let raw = userInput.split(',');
        let clean = [];
        let newPyramid = [];
        let newRow = [];
        let rowLength = 1;

        const conditionals = (inputLength) => {
            let forReturn = false;
                possibleLengths.forEach((possibleLength) => {
                    if (inputLength === possibleLength) {
                        forReturn = true;
                    }
                })
            return forReturn;
        }
        
        raw.forEach((each) => {
            if (Number(each) > 0) {
            clean.push(Number(each));
            }
        })

        if (conditionals(clean.length) === true) {
            clean.forEach((each) => {
                newRow.push(each);
                if (newRow.length === rowLength) {
                    newPyramid.push(newRow);
                    newRow = [];
                    rowLength++;
                }
            })
            setInputArray(newPyramid);
            
        } else {
            alert(`Not the right amount of numbers to make a pyramid. ex. 1, 3, 6, 10, 15, 21, 28...`);
        }
    };

    const handleChange = (event) => {
        event.preventDefault();
        setUserInput(event.target.value);
    };

    const changeExpected = (event) => {
        setExpected(Number(event.target.value));
    };

    const restoreDefault = () => {
        setInputArray([[2], [4, 3], [3, 2, 6], [2, 9, 5, 2], [10, 5, 2, 15, 5]]);
    }


    return (
        <>
            <div className="header">
                <div className="horizontal">
                        <h6>Pyramid Descent Puzzle!</h6>
                </div>
            </div>
            <div className="horizontal">
                    <h1>Pyramid descent path(s):</h1>
            </div>
            <ul className="horizontal">
                <div className="no-path-message">
                    { result.length > 0 ? result.map((path, key) => {
                        return (
                            <li className="path" key={ key }>{ path }</li>
                        ) 
                        }) : "Pick a Path below!"
                    }
                </div>
            </ul>
            <div className="horizontal">
                <h5>Select a possible pyramid descent product to see it's path:</h5>
            </div>
            <div className="horizontal">
                <select className="options" id="products" onChange={ changeExpected }>
                    {
                        possibleResults.map((possibleProduct, key) => {
                            return (
                                <option value={ possibleProduct } key={ key }>{ possibleProduct }</option>
                            )
                        })
                    }
                </select>
            </div>
            <div className="horizontal">
                    <form onSubmit={ handleSubmit }>
                            <textarea className="array-input" value={ userInput } onChange={ handleChange } placeholder="Input a pyramid of numbers like this: 2, 4, 3, 3, 2, 6, 2, 9, 5, 2, 10, 5, 2, 15, 5. Comma's are necessary, spaces and line breaks are optional."></textarea>
                            <input type="submit" value="Input your own pyramid!" />
                    </form>
            </div>
            <div className="horizontal">
                    <button onClick={ restoreDefault }>Restore default Pyramid</button>
            </div>
            <div className="horizontal">
                    <p className="default">
                        The default pyramid looks like this: <br/>
                        2 <br/>
                        4  3 <br/>
                        3  2  6 <br/>
                        2  9  5  2 <br/>
                        10  5  2  15  5 <br/>
                    </p>
            </div>
            <div className="footer">
                <div className="horizontal">
                    <h6>Thanks for checking it out!</h6>
                </div>
            </div>
        </>
        );

};

export default App;
