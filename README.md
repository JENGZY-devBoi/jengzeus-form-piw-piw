# Form piw piw ⚡️ - Validate your nuxt with zod schema 🪿


[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

## Install for nuxt3
```bash
npm i @jeng3zeus/form-piw-piw
```

Join with my pound with the 1st Library released  [Documents][documents-href]🐣


## Features
- Form to validate child element
- Validate data with Zod
- Use Vue reactive for form data
- Validate with custom input using Vue provide
- Having a feature trigger with on blur validate (No focus)



## Example
script
```ts
<script>
const schema = z.object({
    username: z.string().min(1, { message: 'กรุณากรอกชื่อของคุณ' })
});

const formData = reactive({
  username: ''
});
</script>
```

template
```vue
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
</JForm>
```


<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@jeng3zeus/form-piw-piw/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://www.npmjs.com/package/@jeng3zeus/form-piw-piw

[npm-downloads-src]: https://img.shields.io/npm/dm/@jeng3zeus/form-piw-piw.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://www.npmjs.com/package/@jeng3zeus/form-piw-piw

[license-src]: https://img.shields.io/github/license/JENGZY-devBoi/jengzeus-form-piw-piw.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://github.com/JENGZY-devBoi/jengzeus-form-piw-piw/blob/main/LICENSE

[documents-href]: https://google.com
