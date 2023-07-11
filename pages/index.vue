<template>
    <app-container>
        <div class="sudoku-board__wrapper">
            <sudoku-board
                :incorrect-row="$store.getters['sudoku/incorrectRow']"
                :incorrect-column="$store.getters['sudoku/incorrectColumn']"
                :incorrect-segments="$store.getters['sudoku/incorrectSegments']"
            />
        </div>
    </app-container>
</template>

<script></script>

<style>
.sudoku-board__wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}
</style>
