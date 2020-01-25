<template>
    <a href="#" class="button"
        v-on:mouseover="buttonEnter"
        v-on:mouseout="buttonLeave"
        v-on:click="$emit('clickEvent')">
        <span>{{title}}</span>
    </a>
</template>

<style scoped></style>

<script>
export default {
    props: ['title'],
    methods: {
        buttonEnter(event) {
            console.log('buttonenter', this.title, event);
        },
        buttonLeave(event) {
            console.log('buttonleave', this.title, event);
        },
    },
}
</script>