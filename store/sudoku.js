import { makepuzzle, solvepuzzle } from 'sudoku'

export const state = () => ({
    boardHistoryIndex: 0,
    boardHistory: []
})

export const getters = {
    board(state) {
        return state.boardHistory.at(state.boardHistoryIndex)
    },
    incorrectRows(state, getters) {
        const incorrectRows = []

        for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
            const row = getters.board
                .slice(rowIndex * 9, (rowIndex + 1) * 9)
                .map((cell) => cell.value)
                .filter((value) => value !== null)

            if (row.length !== [...new Set(row)].length) incorrectRows.push(rowIndex)
        }

        return incorrectRows
    },
    incorrectColumns(state, getters) {
        const incorrectColumns = []

        for (let columnIndex = 0; columnIndex < 9; columnIndex++) {
            const column = getters.board
                .filter((_, index) => index % 9 === columnIndex)
                .map((cell) => cell.value)
                .filter((value) => value !== null)

            if (column.length !== [...new Set(column)].length) incorrectColumns.push(columnIndex)
        }

        return incorrectColumns
    },
    incorrectSegments(state, getters) {
        const board = Array.from({ length: 9 }, (_, rowIndex) => getters.board.slice(rowIndex * 9, rowIndex * 9 + 9))
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
    },
    isPreviousStateAvailable(state) {
        return state.boardHistoryIndex < state.boardHistory.length - 1
    },
    isFollowingStateAvailable(state) {
        return state.boardHistoryIndex >= 1
    },
    isSolutionAvailable(state, getters) {
        return !!solvepuzzle(getters.board.map((cell) => (cell.value !== null ? cell.value - 1 : null)))
    },
    isGameOver(state, getters) {
        return (
            getters.board.filter((cell) => cell.value !== null).length === 9 * 9 &&
            getters.incorrectRows.length === 0 &&
            getters.incorrectColumns.length === 0 &&
            getters.incorrectSegments.length === 0
        )
    }
}

export const mutations = {
    updateBoard(state, board) {
        state.boardHistory = [board]
        state.boardHistoryIndex = 0
    },
    updateCell(state, { index, value }) {
        if (value === null || /^[1-9]{1}$/.test(value)) {
            state.boardHistory = [
                getters
                    .board(state)
                    .map((cell) => (cell.index === index && !cell.initial ? { ...cell, value: value !== null ? parseFloat(value) : null } : cell)),
                ...state.boardHistory.slice(state.boardHistoryIndex, state.boardHistoryIndex + 10)
            ]
            state.boardHistoryIndex = 0
        }
    },
    updateBoardHistoryIndex(state, index) {
        state.boardHistoryIndex = Math.max(0, Math.min(index, state.boardHistory.length - 1))
    }
}

export const actions = {
    generateBoard({ commit }) {
        commit(
            'updateBoard',
            makepuzzle().map((value, index) => ({ value: value !== null ? value + 1 : null, index, initial: value !== null }))
        )
    },
    solveBoard({ getters, commit }) {
        if (getters.isSolutionAvailable) {
            commit(
                'updateBoard',
                solvepuzzle(getters.board.map((cell) => (cell.value !== null ? cell.value - 1 : null))).map((value, index) => ({
                    value: value !== null ? value + 1 : null,
                    index,
                    initial: getters.board.at(index).initial
                }))
            )
        }
    },
    previousState({ state, commit }) {
        commit('updateBoardHistoryIndex', state.boardHistoryIndex + 1)
    },
    followingState({ state, commit }) {
        commit('updateBoardHistoryIndex', state.boardHistoryIndex - 1)
    }
}
