<template>
    <div class="sudoku-segment" :class="{ 'sudoku-segment--incorrect': incorrect }">
        <sudoku-cell
            v-for="(key, index) in 3 * 3"
            :key="key"
            :index="Math.floor((row * 3 + column) / 3) * 18 + Math.floor(index / 3) * 6 + (row * 3 + column) * 3 + index"
        />
    </div>
</template>

<script>
export default {
    props: {
        row: {
            type: Number,
            required: true,
            validator: (value) => value >= 0 && value <= 3
        },
        column: {
            type: Number,
            required: true,
            validator: (value) => value >= 0 && value <= 3
        },
        incorrect: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style>
.sudoku-segment {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: var(--sudoku-segment-gap) var(--sudoku-segment-gap);
    padding: var(--sudoku-segment-gap);
    background: var(--gray-200);
    border-radius: 6px;
    transition: box-shadow 0.2s;
}
.sudoku-segment--incorrect {
    box-shadow: 0 0 4px 2px var(--red-400);
}
</style>
