const matrixContainer = document.getElementById("matrix-container");
const submitInputsButton = document.createElement("button");
const rows = parseInt(sessionStorage.getItem("matrixRows"));
const cols = parseInt(sessionStorage.getItem("matrixCols"));

function generateMatrix() {
    let currentRow = 1;
    let currentCol = 1;

    for (let i = 0; i < rows; i++) {
        const row = document.createElement("div");
        row.classList.add("dimensions-input");
        matrixContainer.appendChild(row);
        for (let j = 0; j < cols; j++) {
            const inputCell = document.createElement("input");
            inputCell.type = "number";
            inputCell.min = "-999";
            inputCell.max = "999";
            inputCell.value = "0";
            inputCell.classList.add("values-input-box");
            inputCell.id = `r${currentRow}c${currentCol}`;
            inputCell.autocomplete = "off";
            row.appendChild(inputCell);
            currentCol++;
        }
        currentRow++;
        currentCol = 1;
    }

    submitInputsButton.id = "submit-1-inputs-op";
    submitInputsButton.textContent = "SUBMIT INPUTS";
    matrixContainer.appendChild(submitInputsButton);
}

generateMatrix();

submitInputsButton.addEventListener("click", () => {
    const matrix = new Array(rows).fill(0).map(() => new Array(cols).fill(0));
    let currentCell = 0;
    let validInput = true;

    outer_loop:
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                currentCell = parseInt(document.getElementById(`r${i + 1}c${j + 1}`).value)
                matrix[i][j] = currentCell;
                if ((currentCell < -999) || (currentCell > 999) || (Number.isNaN(currentCell))) {
                    alert("Please keep matrix inputs between -999 and 999!");
                    validInput = false;
                    break outer_loop;
                }
            }
    }

    if (validInput) {
        sessionStorage.setItem("matrix", JSON.stringify(matrix));
        window.open("results.html", "_self");
    }
});

