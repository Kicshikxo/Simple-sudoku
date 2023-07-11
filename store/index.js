export const actions = {
    async nuxtServerInit({ state, dispatch }) {
        await dispatch('sudoku/generateBoard')
    }
}
