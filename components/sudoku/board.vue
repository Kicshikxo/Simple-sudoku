<template>
    <div class="sudoku-board">
        <div class="sudoku-board__control">
            <app-button
                label="Отменить ход"
                icon="mdi-restore"
                variant="danger"
                :disabled="!$store.getters['sudoku/isPreviousStateAvailable']"
                @click="$store.dispatch('sudoku/previousState')"
            />
            <app-button
                label="Решить"
                icon="mdi-check"
                :disabled="$store.getters['sudoku/isGameOver'] || !$store.getters['sudoku/isSolutionAvailable']"
                @click="$store.dispatch('sudoku/solveBoard')"
            />
            <app-button
                label="Восстановить ход"
                icon="mdi-share"
                icon-position="right"
                variant="success"
                :disabled="!$store.getters['sudoku/isFollowingStateAvailable']"
                @click="$store.dispatch('sudoku/followingState')"
            />
        </div>
        <div
            class="sudoku-board__segments"
            :class="{
                'sudoku-board__segments--incorrect-row': incorrectRow !== null,
                'sudoku-board__segments--incorrect-column': incorrectColumn !== null
            }"
            :style="{
                '--incorrect-row': incorrectRow,
                '--incorrect-segment-row': incorrectRow && Math.floor(incorrectRow / 3),
                '--incorrect-column': incorrectColumn,
                '--incorrect-segment-column': incorrectColumn && Math.floor(incorrectColumn / 3)
            }"
        >
            <sudoku-segment
                v-for="(key, index) in 3 * 3"
                :key="key"
                :incorrect="incorrectSegments.includes(index)"
                :row="Math.floor(index / 3)"
                :column="index % 3"
            />
        </div>
        <div class="sudoku-board__control">
            <app-button
                label="Новая игра"
                icon="mdi-autorenew"
                variant="primary"
                style="width: 100%"
                @click="$store.dispatch('sudoku/generateBoard')"
            />
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        incorrectRow: ({ $store }) => $store.getters['sudoku/incorrectRows'].at(0) ?? null,
        incorrectColumn: ({ $store }) => $store.getters['sudoku/incorrectColumns'].at(0) ?? null,
        incorrectSegments: ({ $store }) => $store.getters['sudoku/incorrectSegments'] ?? null,
        isGameOver: ({ $store }) => $store.getters['sudoku/isGameOver']
    },
    watch: {
        isGameOver(value) {
            if (value) setTimeout(() => alert('Поле решено'))
        }
    }
}
</script>

<style>
.sudoku-board {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
.sudoku-board__segments {
    position: relative;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: var(--sudoku-board-gap) var(--sudoku-board-gap);
}
.sudoku-board__segments .sudoku-segment:nth-child(3n + 1):not(:first-child):after,
.sudoku-board__segments .sudoku-segment:nth-child(2):after,
.sudoku-board__segments .sudoku-segment:nth-child(3):after {
    z-index: 0;
    content: '';
    position: absolute;
    background: var(--gray-200);
    border-radius: 8px;
}
.sudoku-board__segments .sudoku-segment:nth-child(3n + 1):not(:first-child):after {
    width: 100%;
    height: var(--sudoku-board-inner-border-size);
    transform: translateY(calc(var(--sudoku-board-gap) / -2 - var(--sudoku-board-inner-border-size) / 2));
}
.sudoku-board__segments .sudoku-segment:nth-child(2):after,
.sudoku-board__segments .sudoku-segment:nth-child(3):after {
    width: var(--sudoku-board-inner-border-size);
    height: 100%;
    transform: translateX(calc(var(--sudoku-board-gap) / -2 - var(--sudoku-board-inner-border-size) / 2));
}
.sudoku-board__segments:before,
.sudoku-board__segments:after {
    z-index: 1;
    content: '';
    position: absolute;
    pointer-events: none;
    border-radius: 6px;
    transition: transform 100s, box-shadow 0.2s;
}
.sudoku-board__segments--incorrect-row:before,
.sudoku-board__segments--incorrect-column:after {
    box-shadow: 0 0 4px 2px var(--red-400);
    transition: box-shadow 0.2s;
}
.sudoku-board__segments:before {
    width: calc(100% - var(--sudoku-segment-gap) * 2);
    height: var(--sudoku-cell-size);
    margin: var(--sudoku-segment-gap);
    transform: translateY(
        calc(
            (var(--sudoku-cell-size) + var(--sudoku-segment-gap)) * var(--incorrect-row) +
                (var(--sudoku-board-gap) + var(--sudoku-segment-gap)) * var(--incorrect-segment-row)
        )
    );
}
.sudoku-board__segments:after {
    width: var(--sudoku-cell-size);
    height: calc(100% - var(--sudoku-segment-gap) * 2);
    margin: var(--sudoku-segment-gap);
    transform: translateX(
        calc(
            (var(--sudoku-cell-size) + var(--sudoku-segment-gap)) * var(--incorrect-column) +
                (var(--sudoku-board-gap) + var(--sudoku-segment-gap)) * var(--incorrect-segment-column)
        )
    );
}
.sudoku-board__control {
    width: 100%;
    display: flex;
    justify-content: space-between;
}
</style>
