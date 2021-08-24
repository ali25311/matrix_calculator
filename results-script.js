const operation = sessionStorage.getItem("operation");
const outputContainer = document.getElementById("output-container");
const matrixOutputs = ["add", "subtract", "matrix-mult", "invert"];
const scalarOutputs = ["determinant"];

function performOperation() {
    let matrix1 = [];
    let matrix2 = [];
    let resultantMatrix = [];
    let scalarOutput = 0;

    if (["add", "subtract", "matrix-mult"].includes(operation)) {
        matrix1 = JSON.parse(sessionStorage.getItem("matrix1"));
        matrix2 = JSON.parse(sessionStorage.getItem("matrix2"));
        console.log(matrix1);
        console.log(matrix2);
    }
    else {
        matrix1 = JSON.parse(sessionStorage.getItem("matrix"));
    }
    switch (operation) {
        case "add": resultantMatrix = add(matrix1, matrix2);
                generateMatrixOutput(resultantMatrix);
                break;
        case "subtract": resultantMatrix = subtract(matrix1, matrix2);
                generateMatrixOutput(resultantMatrix);
                break;
        case "matrix-mult": resultantMatrix = matrixMultiplication(matrix1, matrix2);
                generateMatrixOutput(resultantMatrix);
                break;
        case "invert": resultantMatrix = matrixInversion(matrix1);
                generateMatrixOutput(resultantMatrix);
                break;
        default: scalarOutput = computeDeterminant(matrix1);
                generateScalarOutput(scalarOutput);
    }

    
}

function generateMatrixOutput(resultantMatrix) {
    const rows = resultantMatrix.length;
    const cols = resultantMatrix[0].length;

    for (let i = 0; i < rows; i++) {
        let rowEl = document.createElement("div");
        rowEl.classList.add("row-output");
        outputContainer.appendChild(rowEl);
        for (let j = 0; j < cols; j++) {
            let numEl = document.createElement("h3");
            numEl.classList.add("output-number");
            numEl.textContent = resultantMatrix[i][j];
            rowEl.appendChild(numEl);
        }
    }
}

function generateScalarOutput(scalarOutput) {
    let numEl = document.createElement("h3");
    numEl.classList.add("output-number");
    numEl.textContent = scalarOutput;
    outputContainer.appendChild(numEl);
}

performOperation();

// FUNCTIONS BELOW WRITTEN BY ARNOLD GOZUM:

function add(matrix1, matrix2) {
    return matrix1.map((elementRow, row) => {
        return elementRow.map((element, col) => {
            return element + matrix2[row][col];
        });
    });
}



function subtract(matrix1, matrix2) {
    return matrix1.map((elementRow, row) => {
        return elementRow.map((element, col) => {
            return element - matrix2[row][col];
        });
    });
}



function scalarMultiply(matrix, scalar) {
  return matrix.map(elementRow => elementRow.map(element => element * scalar));
}



function matrixMultiplication(matrix1, matrix2) {
    let resultantMatrix = [];
    matrix1.forEach((m1Row, row) => {
        resultantMatrix.push([]);
        matrix2[0].forEach((x, col) => {
            resultantMatrix[row].push(m1Row.reduce((resultElement, curr, index) => {
                return resultElement + (curr * matrix2[index][col]);
            }, 0));
        });
    });
    return resultantMatrix;
}



function computeDeterminant(matrix) {
    let determinant = 0;
    if (matrix.length === 1) {
        return matrix[0][0];
    }
    if (matrix.length === 2) {
        return matrix[0][0] * matrix[1][1] - (matrix[0][1] * matrix[1][0]);
    }
    for (let i = 0; i < matrix.length; i++) {
        determinant += (i%2 === 0 ? 1 : -1) * matrix[0][i] * computeDeterminant(matrix.slice(1).map(x => x.filter((element, index) => index != i)));
    }
    return determinant;
}



function computeMinors(matrix) {
    return matrix.map((elementRow, row) => {
        return elementRow.map((element, col) => {
            return computeDeterminant(matrix.filter((element, index) => index != row).map(x => x.filter((element, index) => index != col)));
        });
    });
}



function transpose(matrix) {
    return matrix.map((elementRow, row) => {
        return elementRow.map((element, col) => {
            return matrix[col][row];
        });
    });
}



function matrixInversion(matrix) {  
    return scalarMultiply(transpose(computeMinors(matrix).map((elementRow, row) => {
        return elementRow.map((element, col) => {
            if (row % 2 === 0) {
                return element * (col % 2 === 0 ? 1 : -1);
            } else {
                return element * (col % 2 === 0 ? -1 : 1);
            }
        });
    })), 1/computeDeterminant(matrix));
}