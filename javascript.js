const calculadora = {
    display: 0,
    firstOperator: null,
    operando: false,
    operator: null
}

const operadores = {
    '+': function(a, b) {
        return a + b
    },
    '-': function(a, b) {
        return a - b
    },
    '*': function(a, b) {
        return a * b
    },
    '/': function(a, b) {
        return a / b
    },
}


var boton = document.querySelectorAll('.boton');
for (var i = 0; i < boton.length; i++) {
    buttonPressed(boton[i]);

}

function updateDisplay() {
    document.querySelector('.display').textContent = calculadora.display;

}

function buttonPressed(id) {
    id.addEventListener('click', function() {
        if (!isNaN(id.textContent)) { ///Si la tecla apretada es un numero
            if (calculadora.operando) {
                calculadora.display = 0;
                calculadora.operando = false;
                updateDisplay();
            }
            if (String(calculadora.display).search("\\.") == -1) {
                calculadora.display = 10 * calculadora.display + parseFloat(id.textContent);
            } else {
                console.log('entro');
                calculadora.display = calculadora.display + String(id.textContent);
            }
            console.log(parseFloat(calculadora.display));
            updateDisplay();

        } else {
            switch (id.textContent) {
                case ".":
                    if (String(calculadora.display).search("\\.") == -1) {
                        calculadora.display = calculadora.display + ".";
                        updateDisplay()
                    }
                    break;
                case "DEL":
                    if (calculadora.display > 10) {
                        calculadora.display = parseFloat(String(calculadora.display).slice(0, -1));
                    } else calculadora.display = 0;
                    updateDisplay();
                    break;
                case "C":
                    calculadora.display = 0;
                    calculadora.firstOperator = null;
                    calculadora.operator = null;
                    calculadora.operando = false;
                    updateDisplay();
                    break;
                case "+":
                case "-":
                case "/":
                case "*":
                    calculadora.firstOperator = calculadora.display;
                    operador = id.textContent;
                    calculadora.operando = true;
                    break;
                case "=":
                    console.log(calculadora.display);
                    console.log(calculadora.firstOperator);
                    switch (operador) {
                        case "*":
                        case "/":
                        case "+":
                        case "-":
                            var tag = document.createElement("p");
                            var text = document.createTextNode(calculadora.firstOperator + " "+operador+" "+ calculadora.display+" = " +operadores[operador](calculadora.firstOperator, calculadora.display));
                            tag.appendChild(text);
                            var element = document.getElementById("memory");
                            tag.classList.add("elementos-memoria");
                            element.appendChild(tag);
                            calculadora.display = operadores[operador](calculadora.firstOperator, calculadora.display);
                            updateDisplay();
                            break;
                        default:
                            break;
                    }
                    break;
                case "+/-":
                    calculadora.display = -1 * calculadora.display;
                    updateDisplay();
                    break;

            }
        }
    });
}