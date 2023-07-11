import { makepuzzle } from 'sudoku'

export const SAVED_SUDOKU_BOARD_KEY = 'saved-sudoku-board'

export const state = () => ({
    board: []
})

export const getters = {
    incorrectRow({ board }) {
        for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
            const row = board
                .slice(rowIndex * 9, (rowIndex + 1) * 9)
                .map((cell) => cell.value)
                .filter((value) => value !== null)

            if (row.length !== [...new Set(row)].length) return rowIndex
        }
        return null
    },
    incorrectColumn({ board }) {
        for (let columnIndex = 0; columnIndex < 9; columnIndex++) {
            const column = board
                .filter((_, index) => index % 9 === columnIndex)
                .map((cell) => cell.value)
                .filter((value) => value !== null)

            if (column.length !== [...new Set(column)].length) return columnIndex
        }
        return null
    },
    incorrectSegments(state) {
        const board = Array.from({ length: 9 }, (_, rowIndex) => state.board.slice(rowIndex * 9, rowIndex * 9 + 9))
        const incorrectSegments = []

        for (let segmentIndex = 0; segmentIndex < 9; segmentIndex++) {
            const row = Math.floor(segmentIndex / 3) * 3
            const column = (segmentIndex % 3) * 3
            const segment = [
                ...board.at(row).slice(column, column + 3),
                ...board.at(row + 1).slice(column, column + 3),
                ...board.at(row + 2).slice(column, column + 3)
            ]
                .map((cell) => cell.value)
                .filter((value) => value !== null)

            if (segment.length !== [...new Set(segment)].length) incorrectSegments.push(segmentIndex)
        }

        return incorrectSegments
    }
}

export const mutations = {
    updateBoard(state, board) {
        state.board = board
    },
    updateCell(state, { index, value }) {
        if (value === null || /^\d$/.test(value)) {
            state.board = state.board.map((cell) =>
                cell.index === index && !cell.initial ? { ...cell, value: value !== null ? parseFloat(value) : null } : cell
            )
        }
    }
}

export const actions = {
    generateBoard({ commit }) {
        commit(
            'updateBoard',
            makepuzzle().map((value, index) => ({ value, index, initial: value !== null }))
        )
    }
}
