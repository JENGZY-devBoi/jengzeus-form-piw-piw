<script setup lang="ts">
interface TagInputProps {
    name?: string;
    modelValue: string[];
}

const props = defineProps<TagInputProps>();

const emit = defineEmits<{
    'update:modelValue': [value: string[]];
}>();

const form = inject<Record<string, any>>('login-form')!;
const formErrors = inject<Record<string, string>>('login-errors')!;
const handleFieldBlur = inject<Function>('login-onblur');

const input = ref<string>();

const onSubmit = () => {
    if (!input.value) return;

    const updateVal = [...props.modelValue, input.value];

    input.value = undefined;

    emit('update:modelValue', updateVal);
};
</script>

<template>
    <form 
        class=""
        :name="name"
        @submit.prevent="onSubmit" 
    >
        <input 
            v-model="input" 
            placeholder="tags"
            @blur="() => handleFieldBlur?.(props.name, modelValue)"
        />

        <div 
            v-for="item, idx of props.modelValue"
            :key="idx"
        >
            {{ item }}
        </div>
    </form>
</template>

<style scoped>

</style>
