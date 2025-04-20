class SudokuSolver {
    constructor(gridElement) {
        this.sudokuGrid = gridElement;
        this.initializeGrid();
    }

    initializeGrid() {
        // Создаем пустую сетку 9x9
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const cell = document.createElement('input');
                cell.type = 'text';
                cell.className = 'cell';
                cell.maxLength = 1; // Позволяет вводить только одну цифру
                
                // Обработка события ввода - разрешаем только цифры 1-9
                cell.addEventListener('input', (event) => {
                    const value = event.target.value;
                    event.target.value = value.replace(/[^1-9]/g, '');
                });

                this.sudokuGrid.appendChild(cell); // Добавляем ячейку в сетку
            }
        }
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const gridElement = document.getElementById('sudoku-grid');
    const sudokuSolver = new SudokuSolver(gridElement);
});
