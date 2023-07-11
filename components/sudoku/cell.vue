<template>
    <div
        class="sudoku-cell"
        :class="{ 'sudoku-cell--initial': initial || currentCell.initial, 'sudoku-cell--incorrect': incorrect }"
    >
        <input
            v-model.number="currentValue"
            type="number"
            :disabled="currentCell.initial"
            class="sudoku-cell__input"
            @input="updateValue"
        />
    </div>
</template>

<script>
export default {
    props: {
        index: {
            type: Number,
            required: true,
            validator: (value) => value >= 0 && value < 9 * 9
        },
        initial: {
            type: Boolean,
            default: false
        },
        incorrect: {
            type: Boolean,
            default: false
        }
    },
    data: ({ $store, index }) => ({
        currentValue: $store.getters['sudoku/board'].at(index).value
    }),
    computed: {
        currentCell({ $store }) {
            return $store.getters['sudoku/board'].at(this.index)
        }
    },
    watch: {
        currentCell({ value }) {
            this.currentValue = value
        }
    },
    methods: {
        updateValue() {
            if (/^(\s*|[1-9]{1})$/.test(this.currentValue)) {
                return this.$store.commit('sudoku/updateCell', {
                    index: this.index,
                    value: this.currentValue !== '' ? this.currentValue : null
                })
            }

            this.currentValue = this.currentCell.value
        }
    }
}
</script>

<style>
.sudoku-cell {
    width: var(--sudoku-cell-size);
    height: var(--sudoku-cell-size);
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--gray-300);
    border: 1px solid var(--gray-400);
    border-radius: 6px;
    transition: box-shadow 0.2s;
}
.sudoku-cell--initial {
    font-size: calc(var(--sudoku-cell-font-size) + 0.5rem);
    background: var(--gray-200);
    border: none;
}
.sudoku-cell--incorrect {
    box-shadow: 0 0 4px 2px var(--red-400);
}
.sudoku-cell__input {
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
    text-align: center;
    color: var(--gray-900);
    font-size: 1rem;
    font-size: var(--sudoku-cell-font-size);
    border-radius: 6px;
    transition: box-shadow 0.2s;
}
.sudoku-cell__input:focus {
    box-shadow: 0 0 0 2px var(--gray-500);
}
</style>
