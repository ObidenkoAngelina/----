class SudokuSolver {
    constructor(gridElement, solveButtonElement) {
        this.sudokuGrid = gridElement;
        this.solveButton = solveButtonElement;
        this.solution = []; // Массив для хранения решения
        this.initializeGrid();
        this.solveButton.addEventListener('click', () => this.checkSolution());
    }

    isValid(board, row, col, num) {
        // Проверка строки
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === num) {
                return false;
            }
        }

        // Проверка столбца
        for (let i = 0; i < 9; i++) {
            if (board[i][col] === num) {
                return false;
            }
        }

        // Проверка 3x3 квадрата
        const startRow = row - row % 3;
        const startCol = col - col % 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i + startRow][j + startCol] === num) {
                    return false;
                }
            }
        }

        return true;
    }

    solveSudoku(board) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (this.isValid(board, row, col, num)) {
                            board[row][col] = num;

                            if (this.solveSudoku(board)) {
                                return true;
                            }

                            board[row][col] = 0; // Возврат к предыдущему состоянию
                        }
                    }
                    return false; // Если не удалось найти число, вернуть false
                }
            }
        }
        return true; // Если все ячейки заполнены
    }

    generateSudoku() {
        let board = Array.from({ length: 9 }, () => Array(9).fill(0));
        this.solveSudoku(board);
        this.solution = JSON.parse(JSON.stringify(board)); // Сохраняем решение

        // Удаляем числа для создания головоломки
        let attempts = 60; // Количество удаляемых ячеек
        while (attempts > 0) {
            let row = Math.floor(Math.random() * 9);
            let col = Math.floor(Math.random() * 9);
            if (board[row][col] !== 0) {
                board[row][col] = 0; // Удаляем число
                attempts--;
            }
        }
        
        return board;
    }

    initializeGrid() {
        const sudokuPuzzle = this.generateSudoku(); // Генерируем новую головоломку
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const cell = document.createElement('input');
                cell.type = 'text';
                cell.className = 'cell';
                cell.maxLength = 1; // Позволяет вводить только одну цифру
                cell.value = sudokuPuzzle[i][j] !== 0 ? sudokuPuzzle[i][j] : ''; // Заполняем ячейки
                cell.isInitial = sudokuPuzzle[i][j] !== 0;
                cell.readOnly = cell.isInitial; // Делаем ячейки с изначальными значениями недоступными для редактирования

                // Обработка события ввода
                cell.addEventListener('input', (event) => {
                    const value = event.target.value;
                    // Удаляем все символы, кроме цифр от 1 до 9
                    event.target.value = value.replace(/[^1-9]/g, '');
                });

                this.sudokuGrid.appendChild(cell); // Добавляем ячейку в сетку
            }
        }
    }

    checkSolution() {
        const inputs = document.querySelectorAll('.cell');
        inputs.forEach((input, index) => {
            const row = Math.floor(index / 9);
            const col = index % 9;
            const userValue = parseInt(input.value, 10);

            if (userValue === this.solution[row][col]) {
                input.classList.add('valid'); // Правильный ответ
                input.classList.remove('invalid');
                input.readOnly = true; // Делаем ячейку недоступной для редактирования
            } else if (input.value !== '') {
                input.classList.add('invalid'); // Неправильный ответ
            } else {
                // Если ячейка пустая, убираем классы
                input.classList.remove('valid');
                input.classList.remove('invalid');
            }
        });
    }
}

// Инициализируем решатель Судоку при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const gridElement = document.getElementById('sudoku-grid');
    const solveButtonElement = document.getElementById('solve-button');
    const sudokuSolver = new SudokuSolver(gridElement, solveButtonElement);
});
