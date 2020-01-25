# Use Vue Single File Components with Rollup

This is a demo on how Vue.js single file components and Rollup work together
when webpack is not an option.

## Setup

Install the plugin `rollup-plugin-vue`, then add the plugin to your
`rollup.config.js`.

- https://vuejs.org/v2/guide/
- https://rollupjs.org/guide/en/
- https://rollup-plugin-vue.vuejs.org/

```javascript
import vue from 'rollup-plugin-vue'
// ...
export default [{
    // ...
    plugins: [
        vue(/* options */),
        // ... other plugins ...
    ]
    // ...
}]
```

## Other things to note

The click event has to be emitted from a component to its parent.

- https://vuejs.org/v2/api/#vm-emit
- https://vuejs.org/v2/guide/components.html#Emitting-a-Value-With-an-Event

```html
<!-- NiceButton.vue -->
<template>
    <!-- ... -->
    <a href="#" class="button" v-on:click="$emit('clickEvent')" ... />
    <!-- ... -->
</template>

<script>
export default {
    props: [/* ... */],
    methods: {/* ... */},
}
</script>
```


```html
<!-- App.vue -->
<template>
    <!-- ... -->
    <nicebutton v-on:clickEvent="removeItem(index)" ... />
    <!-- ... -->
</template>

<script>
import nicebutton from './NiceButton.vue'
// ...
export default {
    components: {nicebutton},
    methods: {
        removeItem(index) {this.$delete(this.items, index)},
    },
    data() {
        return {
            items: [{uid: 0, name: 'Item 1'}]
        }
    }
    // ...
}
</script>
```


