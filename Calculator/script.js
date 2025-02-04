// Get the display element
const display = document.getElementById('display');
let currentInput = '';
let previousInput = '';
let operator = '';

// Function to update the display
function updateDisplay(value) {
    // If value is empty, set it to '0'
    if (value === '' || value === null) {
        value = '0';
    }
    display.textContent = value;
}

// Get all buttons and add click event listeners
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (value === 'C') {
            // Reset all inputs when "C" is pressed
            currentInput = '';
            previousInput = '';
            operator = '';
            updateDisplay('0'); // Display '0' after reset
        } else if (value === '=') {
            // Perform calculation
            if (previousInput && operator && currentInput !== '') {
                calculate();
            }
        } else if (['+', '-', '*', '/'].includes(value)) {
            // Handle operator input
            if (currentInput) {
                if (previousInput) {
                    calculate();  // Calculate if there is already an operator
                }
                operator = value;
                previousInput = currentInput;
                currentInput = '';
            }
        } else if (value === '.') {
            // Prevent multiple decimal points in the same number
            if (!currentInput.includes('.')) {
                currentInput += value;
                updateDisplay(currentInput);
            }
        } else {
            // Handle number input
            currentInput += value;
            updateDisplay(currentInput);
        }
    });
});

// Function to perform the calculation
function calculate() {
    let result = 0;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                result = 'Error'; // Avoid division by zero
            } else {
                result = prev / current;
            }
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = '';
    previousInput = '';
    updateDisplay(currentInput);
}
