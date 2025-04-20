class SudokuSolver {
    constructor(gridElement) {
        this.sudokuGrid = gridElement;
        this.initializeGrid();
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
                cell.maxLength = 1;
                // Заполнение ячейки числом (или пустой строкой, если 0)
                cell.value = sudokuPuzzle[i][j] !== 0 ? sudokuPuzzle[i][j] : '';
                cell.isInitial = sudokuPuzzle[i][j] !== 0;
                cell.readOnly = cell.isInitial; // Блокировка редактирования начальных чисел
    
                // Обработка ввода (разрешаем только цифры 1-9)
                cell.addEventListener('input', (event) => {
                    event.target.value = event.target.value.replace(/[^1-9]/g, '');
                });
    
                this.sudokuGrid.appendChild(cell); // Добавление ячейки в DOM
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
