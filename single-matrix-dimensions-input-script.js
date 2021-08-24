const sub1DimensionsButton = document.getElementById("submit-1-dimensions-op");

sub1DimensionsButton.addEventListener("click", () => {
    let matrixRows = document.getElementById("dimension-1").value;
    let matrixCols = document.getElementById("dimension-2").value;
    let operation = sessionStorage.getItem("operation");

    if ((matrixRows < 1) || (matrixCols < 1) || (matrixRows > 4) || (matrixCols > 4)) {
        alert("Minimum dimensions are a 1 x 1, and maximum dimensions are a 4 x 4!");
    }
    else if ((operation === "invert") && (matrixRows !== matrixCols)) {
        alert("Remember, inversion only works on square matrices!");
    }
    else if ((operation === "determinant") && (matrixRows !== matrixCols)) {
        alert("Remember, determinants only work on square matrices!");
    }
    else {
        sessionStorage.setItem("matrixRows", matrixRows);
        sessionStorage.setItem("matrixCols", matrixCols);
        if ((operation === "invert") || (operation === "determinant")) {
            window.open("single-matrix-inputs.html", "_self");
        }
        else {
            window.open("dual-matrix-inputs.html", "_self");
        }
    }
});