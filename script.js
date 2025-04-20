class SudokuSolver {
    constructor(gridElement) {
        this.sudokuGrid = gridElement;
        this.initializeGrid();
    }

    generateSudoku() {
        let board = Array.from({ length: 9 }, () => Array(9).fill(0));
        this.solveSudoku(board); // Генерируем решенное судоку
        this.solution = JSON.parse(JSON.stringify(board)); // Сохраняем решение (опционально)
        return board; // Возвращаем заполненную доску
    }

    initializeGrid() {
        const sudokuPuzzle = this.generateSudoku(); // Получаем заполненную доску
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const cell = document.createElement('input');
                cell.type = 'text';
                cell.className = 'cell';
                cell.maxLength = 1;
                cell.value = sudokuPuzzle[i][j]; // Все ячейки будут заполнены
                cell.readOnly = true; // Делаем все ячейки неизменяемыми (опционально)
                
                // Обработка ввода (если readOnly = false)
                cell.addEventListener('input', (event) => {
                    event.target.value = event.target.value.replace(/[^1-9]/g, '');
                });

                this.sudokuGrid.appendChild(cell);
            }
        }
    }

    solveSudoku(board) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (this.isValid(board, row, col, num)) {
                            board[row][col] = num;
                            if (this.solveSudoku(board)) return true;
                            board[row][col] = 0; // Откат
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }
    
    isValid(board, row, col, num) {
        // Проверка строки и столбца
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === num || board[i][col] === num) return false;
        }
        // Проверка 3x3 блока
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[startRow + i][startCol + j] === num) return false;
            }
        }
        return true;
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const gridElement = document.getElementById('sudoku-grid');
    const sudokuSolver = new SudokuSolver(gridElement);
});
