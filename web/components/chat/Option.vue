<script lang="ts" setup>
let props = defineProps({
    name: String,
    describe: String
});

</script>
<template>
    <div class="box">
        <div class="left">
            <h4>{{ props.name }}</h4>
            <p>{{ props.describe }}</p>
        </div>
        <div class="right">
            <slot></slot>
        </div>
    </div>
</template>
<style scoped>
.box {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0.5rem;
}
h4{
    margin: 0;
    font-size: 1rem;
}
p{
    margin: 0;
    font-size: 0.6rem;
}
</style>