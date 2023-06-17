<script lang="ts" setup>
let props = defineProps<{
    name?: string,
    describe?: string
}>();

</script>
<template>
    <div class="box">
        <div v-if="props.name || props.describe" class="left">
            <h4 v-if="props.name" >{{ props.name }}</h4>
            <p v-if="props.describe">{{ props.describe }}</p>
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
    border-top: 0.05rem solid rgba(0, 0, 0, 0.285);
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