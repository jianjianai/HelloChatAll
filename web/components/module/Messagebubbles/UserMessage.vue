<script setup>

let props = defineProps({
    data:Object
});
let data = props.data;

</script>

<template>
    <div class="align">
        <div class="bubble" v-bind:class="{ preview: data.isPreview }">
            <div class="messageBox" v-text="data.message"></div>
        </div>
    </div>
</template>



<style scoped>
.messageBox {
    word-break: break-word;
}

.bubble {
    background-color: rgb(255, 255, 255);
    display: inline-block;
    border-radius: 1rem;
    margin-bottom: 2rem;
    padding: 0.8rem;
    max-width: 90%;
}

.bubble.preview {
    opacity: 70%;
}

.align {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: flex-end;
    justify-content: flex-start;
}
</style>