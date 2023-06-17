<script lang="ts" setup>
let p = defineProps<{
    name?: string
    describe?: string
}>();
</script>
<template>
    <div class="box">
        <div v-if="p.name || p.describe" class="tb">
            <h2 v-if="p.name">{{ p.name }}</h2>
            <h3 v-if="p.describe">{{ p.describe }}</h3>
        </div>
        <slot></slot>
    </div>
</template>
<style scoped>
.box {
    border: 0.05rem solid rgba(0, 0, 0, 0.253);
    border-radius: 0.5rem;
    margin-top: 1rem;
}
.tb{
    margin: 0.5rem;
}
h2 {
    margin: 0;
    padding: 0;
    font-size: 1.2rem;
}

h3 {
    margin: 0;
    padding: 0;
    font-size: 0.7rem;
}
</style>