const sub2DimensionsButton = document.getElementById("submit-2-dimensions-op");

sub2DimensionsButton.addEventListener("click", () => {
    let m1Rows = document.getElementById("dimension-1").value;
    let m1Cols = document.getElementById("dimension-2").value;
    let m2Rows = document.getElementById("dimension-3").value;
    let m2Cols = document.getElementById("dimension-4").value;

    if ((m1Rows < 1) || (m1Cols < 1) || (m1Rows > 4) || (m1Cols > 4) || (m2Rows < 1) || (m2Cols < 1) || (m2Rows > 4) || (m2Cols > 4)) {
        alert("Minimum dimensions are a 1 x 1, and maximum dimensions are a 4 x 4!");
    }
    else if (m1Cols !== m2Rows) {
        alert("Cannot multiply these matrices!");
    }
    else {
        sessionStorage.setItem("matrix1Rows", m1Rows);
        sessionStorage.setItem("matrix1Cols", m1Cols);
        sessionStorage.setItem("matrix2Rows", m2Rows);
        sessionStorage.setItem("matrix2Cols", m2Cols);
        window.open("dual-matrix-inputs.html", "_self");
    }
});