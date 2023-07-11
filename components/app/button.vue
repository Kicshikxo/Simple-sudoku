<template>
    <button
        class="app-button"
        :class="{
            'app-button--primary': variant === 'primary',
            'app-button--success': variant === 'success',
            'app-button--danger': variant === 'danger',
            'app-button--disabled': disabled
        }"
        :disabled="disabled"
        @click="$emit('click', $event)"
    >
        <span v-if="icon && iconPosition === 'left'" class="app-button_icon mdi" :class="icon"></span>
        <span v-if="label">{{ label }}</span>
        <slot v-else />
        <span v-if="icon && iconPosition === 'right'" class="app-button_icon mdi" :class="icon"></span>
    </button>
</template>

<script>
export default {
    props: {
        variant: {
            type: String,
            default: 'default',
            validator: (value) => {
                return ['default', 'primary', 'success', 'danger'].includes(value)
            }
        },
        label: {
            type: String,
            default: null
        },
        icon: {
            type: String,
            default: null
        },
        iconPosition: {
            type: String,
            default: 'left',
            validator: (value) => {
                return ['left', 'right'].includes(value)
            }
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    emits: {
        click: (payload) => typeof payload === 'object'
    }
}
</script>

<style>
.app-button {
    padding: 0.75rem 0.75rem;
    font-size: 1rem;
    font-weight: bold;
    transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
    border-radius: 6px;
}

.app-button_icon {
    display: inline-block;
    font-size: 1rem;
    width: 1rem;
}

.app-button {
    color: var(--gray-900);
    background: var(--gray-200);
    border: 1px solid var(--gray-100);
}
.app-button:enabled:hover {
    color: var(--gray-900);
    background: var(--gray-300);
    border-color: var(--gray-200);
}
.app-button:enabled:active {
    color: var(--gray-900);
    background: var(--gray-400);
    border-color: var(--gray-300);
}
.app-button:enabled:focus {
    outline: 0 none;
    outline-offset: 0;
    box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px rgba(var(--gray-400-rgb), 0.5);
}

.app-button.app-button--primary {
    color: var(--gray-100);
    background: var(--primary-400);
    border: 1px solid var(--primary-300);
}
.app-button.app-button--primary:enabled:hover {
    color: var(--gray-100);
    background: var(--primary-500);
    border-color: var(--primary-400);
}
.app-button.app-button--primary:enabled:active {
    color: var(--gray-100);
    background: var(--primary-600);
    border-color: var(--primary-500);
}
.app-button.app-button--primary:enabled:focus {
    outline: 0 none;
    outline-offset: 0;
    box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px rgba(var(--primary-600-rgb), 0.5);
}

.app-button.app-button--success {
    color: var(--gray-100);
    background: var(--green-400);
    border: 1px solid var(--green-300);
}
.app-button.app-button--success:enabled:hover {
    color: var(--gray-100);
    background: var(--green-500);
    border-color: var(--green-400);
}
.app-button.app-button--success:enabled:active {
    color: var(--gray-100);
    background: var(--green-600);
    border-color: var(--green-500);
}
.app-button.app-button--success:enabled:focus {
    outline: 0 none;
    outline-offset: 0;
    box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px rgba(var(--green-600-rgb), 0.5);
}

.app-button.app-button--danger {
    color: var(--gray-100);
    background: var(--red-400);
    border: 1px solid var(--red-300);
}
.app-button.app-button--danger:enabled:hover {
    color: var(--gray-100);
    background: var(--red-500);
    border-color: var(--red-400);
}
.app-button.app-button--danger:enabled:active {
    color: var(--gray-100);
    background: var(--red-600);
    border-color: var(--red-500);
}
.app-button.app-button--danger:enabled:focus {
    outline: 0 none;
    outline-offset: 0;
    box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px rgba(var(--red-600-rgb), 0.5);
}

.app-button:disabled,
.app-button.app-button--disabled {
    pointer-events: none;
    opacity: 60%;
}
</style>
