<script setup lang="ts">
import { z, type ZodObject } from 'zod';
import { ref, provide, watch } from 'vue';

interface FormProps {
    name: string;
    schema: ZodObject<any>;
    form: Record<string, any>;
    coolScroll?: boolean;
    class?: string;
}

const props = withDefaults(defineProps<FormProps>(), {
    coolScroll: false
});

const emits = defineEmits<{
    submit: [values: any];
    reset: [];
}>();

const errors = ref<Record<string, string>>({});
const errorStatus = ref<Record<string, boolean>>({});
const formRef = ref<HTMLFormElement | null>(null);

const onSubmit = (e: Event) => {
    errors.value = {}; // clear error list
    errorStatus.value = {};

    const formEl = formRef.value;
    if (!formEl) return;

    const result = props.schema.safeParse(props.form);

    errors.value = {};
    
    if (result.success) {
        emits('submit', result.data);
    } else {
        result.error.errors.forEach((err) => {
            const key = err.path[0] as string;
            errors.value[key] = err.message;
            errorStatus.value[key] = true;
        });

        if (props.coolScroll) {
            const firstError = result.error.errors?.at(0);
    
            if (firstError) {
                const fieldName = firstError.path[0] as string;
    
                // find input by name
                const el = formRef.value?.querySelector<HTMLInputElement | HTMLElement>(
                    `[name="${fieldName}"]`
                );
    
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    el.focus?.();
                }
            }
        }
    }
};

const reset = () => {
    errors.value = {};
    errorStatus.value = {};
    emits('reset');
};

const onBlur = (e: FocusEvent) => {
    const target = e.target as HTMLInputElement;
    const name = target.name;

    if (!name || !props.schema.shape[name]) return;

    let value: any;

    // Handle different input types
    if (target.type === 'checkbox') {
        value = target.checked;
    } else if (target.type === 'file') {
        value = target.files?.[0]; // Get the actual File
        // return;
    } else {
        value = target.value;
    }

    const fieldSchema = props.schema.shape[name];

    const result = fieldSchema.safeParse(value);

    if (result.success) {
        delete errors.value[name];
        delete errorStatus.value[name];
    } else {
        errors.value[name] = result.error.errors[0]?.message ?? 'Invalid input';
        errorStatus.value[name] = true;
    }
};

const handleFieldBlur = (name: string, value: any) => {
    const fieldSchema = props.schema.shape?.[name];

    if (!fieldSchema) return;

    const result = fieldSchema.safeParse(value);
    if (result.success) {
        delete errors.value[name];
        delete errorStatus.value[name];
    } else {
        errors.value[name] = result.error.errors[0]?.message ?? 'Invalid';
        errorStatus.value[name] = true;
    }
};

provide(props.name + '-form', props.schema);
provide(`${props.name}-errors`, errors);
provide(`${props.name}-errorStatus`, errorStatus);
provide(`${props.name}-onblur`, handleFieldBlur);
</script>

<template>
    <form 
        ref="formRef" 
        :class="(props.class)"
        v-bind="$attrs"
        @submit.prevent="onSubmit($event)" 
        @reset.prevent="reset"
        @focusout="onBlur"
    >
        <slot 
            :errors="errors" 
            :error-status="errorStatus"
        ></slot>
    </form>
</template>
