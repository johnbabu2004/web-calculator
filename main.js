// Select elements
const toggleButton = document.querySelector(".toggle-button");
const display = document.querySelector("input[type='text']");
const buttons = document.querySelectorAll(".btn");

// Initialize calculator state
let currentValue = ""; // Holds the current input
let previousValue = ""; // Holds the previous input
let operator = ""; // Stores the selected operator
let darkMode = false; // For dark mode toggle

// Update the display function
function updateDisplay(value) {
    display.value = value || "123456"; // Show "0" if value is empty
}

// Handle number and dot input
function appendNumber(number) {
    if (number === "." && currentValue.includes(".")) return; // Prevent multiple dots
    currentValue += number;
    updateDisplay(currentValue);
}

// Handle operator selection
function chooseOperator(op) {
    if (currentValue === "") return; // Prevent operator selection without a number
    if (previousValue !== "") compute(); // Compute if there's a previous operation
    operator = op;
    previousValue = currentValue;
    currentValue = ""; // Reset for the next number
}

// Perform the calculation
function compute() {
    let result;
    const prev = parseFloat(previousValue);
    const curr = parseFloat(currentValue);

    if (isNaN(prev) || isNaN(curr)) return; // Ensure valid numbers

    switch (operator) {
        case "+":
            result = prev + curr;
            break;
        case "-":
            result = prev - curr;
            break;
        case "*":
            result = prev * curr;
            break;
        case "/":
            result = curr !== 0 ? prev / curr : "Error"; // Handle divide by 0
            break;
        default:
            return;
    }

    currentValue = result.toString();
    operator = "";
    previousValue = "";
    updateDisplay(currentValue);
}

// Clear all inputs
function clearAll() {
    currentValue = "";
    previousValue = "";
    operator = "";
    updateDisplay("0");
}

// Delete the last character
function deleteLast() {
    currentValue = currentValue.slice(0, -1); // Remove the last character
    updateDisplay(currentValue || "0"); // Ensure it doesn't go below 0
}

// Toggle dark mode
function toggleDarkMode() {
    darkMode = !darkMode;
    toggleButton.innerHTML = darkMode
        ? '<i class="fa-solid fa-toggle-on"></i>'
        : '<i class="fa-solid fa-toggle-off"></i>';
    document.body.classList.toggle("dark-mode", darkMode);
    document.body.classList.toggle("light-mode", !darkMode);
}

// Convert to percentage
function percentage() {
    if (currentValue === "") return;
    currentValue = (parseFloat(currentValue) / 100).toString();
    updateDisplay(currentValue);
}

// Prefix toggle (+/-)
function togglePrefix() {
    if (currentValue === "") return;
    currentValue = currentValue.startsWith("-")
        ? currentValue.slice(1)
        : "-" + currentValue;
    updateDisplay(currentValue);
}

// Attach event listeners to buttons
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const id = button.id;

        // Handle numbers
        if (["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].includes(id)) {
            appendNumber(id);
        } 
        // Handle dot (decimal point)
        else if (id === "dot") appendNumber(".");
        // Handle operators
        else if (id === "add") chooseOperator("+");
        else if (id === "diff") chooseOperator("-");
        else if (id === "multi") chooseOperator("*");
        else if (id === "div") chooseOperator("/");
        // Handle equal sign
        else if (id === "equal") compute();
        // Handle clear button
        else if (id === "clear") clearAll();
        // Handle delete last character
        else if (id === "del") deleteLast();
        // Handle percentage
        else if (id === "percent") percentage();
        // Handle prefix toggle (+/-)
        else if (id === "prefix") togglePrefix();
    });
});

// Dark mode toggle button
toggleButton.addEventListener("click", toggleDarkMode);

// Initialize the display with "0" on page load
updateDisplay("0");
