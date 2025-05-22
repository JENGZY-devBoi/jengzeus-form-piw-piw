<script lang="ts" setup>
import { reactive } from 'vue';
import { z } from 'zod';

const schema = z.object({
    username: z.string().min(1, { message: 'กรุณากรอกชื่อของคุณ' }),
    password: z.string().min(8, { message: 'กรุณากรอก password ให้ครบ 8 ตัว' }),
    accept: z.string({ message: 'กรุณาเลือกการยินยอมนะครับบบ' }),
    age: z.coerce.number().min(1, { message: 'อย่าให้มีครั้งที่ 2' }).max(100, { message: 'ครั้งที่ 3 นี่ไม่ควร' }),
    document: z
        .any()
        .refine(file => file instanceof File && file.size > 0, { message: 'กรุณาเลือกไฟล์' }),
    tags: z.array(z.string().min(1)).min(1, 'ต้องมีอย่างน้อย 1 tag')
});

const formData = reactive<{
    username: string;
    password: string;
    accept: string;
    age: number;
    document: File | undefined;
    tags: string[];
}>({
    username: '',
    password: '',
    accept: '',
    age: 20,
    document: undefined,
    tags: []
});

const formData2 = reactive<{
    username: string;
    password: string;
    accept: string;
    age: number;
    document: File | undefined;
    tags: string[];
}>({
    username: '',
    password: '',
    accept: '',
    age: 20,
    document: undefined,
    tags: []
});

type FormValues = z.infer<typeof schema>;

const handleSubmit = (value: FormValues) => {
    console.log(value);
};

const handleReset = () => {
    formData.username = '';
    formData.password = '';
    formData.accept = '';
    formData.age = 1;
    formData.document = undefined;
    formData.tags = [];
};

const onFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        formData.document = target.files[0];
    } else {
        formData.document = undefined;
    }
};
</script>

<template>
    <JForm
        v-slot="{ errors }"
        name="login"
        :form="formData"
        :schema="schema"
        @submit="handleSubmit"
        @reset="handleReset"
    >
        <input 
            v-model="formData.username"
            name="username" 
            placeholder="username"
        />
        <p style="color: red;">{{ errors.username }}</p>
        
        <input 
            v-model="formData.password"
            name="password"
            placeholder="password"
        />
        <p style="color: red;">{{ errors.password }}</p>

        <div class="">
            <input 
                v-model="formData.accept"   
                name="accept"
                type="radio"
                value="accept"
            />
            <label for="accept">ยินยอม</label>
    
            <input 
                v-model="formData.accept"
                name="accept"
                type="radio"
                value="no-accept"
            />
            <label for="accept">ไม่ยินยอม</label>
            <p style="color: red;">{{ errors.accept }}</p>
        </div>

        <input 
            v-model.number="formData.age"
            name="age"
            type="number"
        />

        <p style="color: red;">{{ errors.age }}</p>

        <br />

        <input 
            name="document"
            type="file"
            @change="onFileChange"
        />

        <p style="color: red;">{{ errors.document }}</p>

        <TagInput 
            v-model="formData.tags" 
            name="tags" 
        /> 

        <p style="color: red;">{{ errors.tags }}</p>

        <button type="submit">submit</button>
        <button type="reset">reset</button>
    </JForm>
</template>
