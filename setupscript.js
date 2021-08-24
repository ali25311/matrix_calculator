const subOpButton = document.getElementById("submit-operation");
const selectMenu = document.getElementById("operations");


subOpButton.addEventListener("click", () => {
    let operation = "";
    operation = selectMenu.value;
    document.getElementById("operation-selection").remove();
    generateSetup(operation);
    sessionStorage.setItem("operation", operation);
});

function generateSetup(operation) {
    if (operation !== "matrix-mult") {
        window.open("single-matrix-dimensions-input.html", "_self");
    }
    else {
        window.open("dual-matrix-dimensions-input.html", "_self");
    }
}