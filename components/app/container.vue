<template>
    <div class="app-container">
        <slot />
    </div>
</template>

<style>
.app-container {
    width: 100%;
    height: 100%;
    padding: 12px;
    margin-right: auto;
    margin-left: auto;
}
@media (min-width: 960px) {
    .app-container {
        max-width: 900px;
    }
}
@media (min-width: 1264px) {
    .app-container {
        max-width: 1185px;
    }
}
@media (min-width: 1904px) {
    .app-container {
        max-width: 1785px;
    }
}
</style>
