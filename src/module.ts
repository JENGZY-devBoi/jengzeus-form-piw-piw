import { readFileSync } from 'node:fs';
import { defineNuxtModule, createResolver, addComponentsDir } from '@nuxt/kit';

export interface ModuleOptions { }

const resolver = createResolver(import.meta.url);
const pkg = JSON.parse(readFileSync(resolver.resolve('../package.json'), 'utf-8'));

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name: pkg?.name || '',
        version: pkg?.version || '',
        configKey: 'jengzeus',
        compatibility: {
            nuxt: '>=3.15.0'
        }
    },
    defaults: {
        prefix: 'J'
    },
    setup(_options, _nuxt) {
        const { resolve } = createResolver(import.meta.url);
        const runtimeDir = resolve('./runtime');

        _nuxt.options.build.transpile.push(runtimeDir);

        _nuxt.options.alias['#jengzeus'] = runtimeDir;

        addComponentsDir({
            path: resolve(runtimeDir, 'components'),
            prefix: 'J',
            pathPrefix: false
        });
    }
});
