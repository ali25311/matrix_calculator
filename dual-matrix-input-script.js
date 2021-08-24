const matrix1Container = document.getElementById("matrix-1-wrapper");
const matrix2Container = document.getElementById("matrix-2-wrapper");
const submitInputsButton = document.getElementById("submit-2-inputs-op");
let rows1 = 0;
let cols1 = 0;
let rows2 = 0;
let cols2 = 0;

function generateMatrix(container, r, c) {
    let currentRow = 1;
    let currentCol = 1;
    let currentMatrix = (container === matrix1Container) ? ("m1") : ("m2");

    for (let i = 0; i < r; i++) {
        const row = document.createElement("div");
        row.classList.add("dimensions-input");
        container.appendChild(row);
        for (let j = 0; j < c; j++) {
            const inputCell = document.createElement("input");
            inputCell.type = "number";
            inputCell.min = "-999";
            inputCell.max = "999";
            inputCell.value = "0";
            inputCell.classList.add("values-input-box");
            inputCell.autocomplete = "off";
            inputCell.id = `${currentMatrix}r${currentRow}c${currentCol}`;
            row.appendChild(inputCell);
            currentCol++;
        }
        currentRow++;
        currentCol = 1;
    }
}

if (sessionStorage.getItem("operation") !== "matrix-mult") {
    rows1 = parseInt(sessionStorage.getItem("matrixRows"));
    cols1 = parseInt(sessionStorage.getItem("matrixCols"));
    generateMatrix(matrix1Container, rows1, cols1);
    generateMatrix(matrix2Container, rows1, cols1);
}
else {
    rows1 = parseInt(sessionStorage.getItem("matrix1Rows"));
    cols1 = parseInt(sessionStorage.getItem("matrix1Cols"));
    rows2 = parseInt(sessionStorage.getItem("matrix2Rows"));
    cols2 = parseInt(sessionStorage.getItem("matrix2Cols"));
    generateMatrix(matrix1Container, rows1, cols1);
    generateMatrix(matrix2Container, rows2, cols2);
}


function fillMatrix(targetMatrix, r, c) {
    let matrix = new Array(r).fill(0).map(() => new Array(c).fill(0));

    for (let i = 0; i < r; i++) {
        for (let j = 0; j < c; j++) {
            currentCell = parseInt(document.getElementById(`${targetMatrix}r${i + 1}c${j + 1}`).value)
            matrix[i][j] = currentCell;
            if ((currentCell < -999) || (currentCell > 999) || (Number.isNaN(currentCell))) {
                alert("Please keep matrix inputs between -999 and 999!");
                return "-1";
            }
        }
    }

    return matrix;
}




submitInputsButton.addEventListener("click", () => {
    let matrix1 = null;
    let matrix2 = null;
    let validInput = false;

    if (sessionStorage.getItem("operation") !== "matrix-mult") {
        matrix1 = fillMatrix("m1", rows1, cols1);
        matrix2 = fillMatrix("m2", rows1, cols1);
    }
    else {
        matrix1 = fillMatrix("m1", rows1, cols1);
        matrix2 = fillMatrix("m2", rows2, cols2);
    }
    
    validInput = ((matrix1 != "-1") && (matrix2 != "-1")); 

    if (validInput) {
        sessionStorage.setItem("matrix1", JSON.stringify(matrix1));
        sessionStorage.setItem("matrix2", JSON.stringify(matrix2));
        window.open("results.html", "_self");
    }
});