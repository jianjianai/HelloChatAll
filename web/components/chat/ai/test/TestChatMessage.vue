<script lang="ts" setup>
import type { TestChatMessageData } from "./TestChatMessageData";


let props = defineProps<{
    data:TestChatMessageData
}>();
</script>

<template>
    <div class="align">
        <div class="bubble">
            <div class="messageBox" v-text="props.data.message"></div>
        </div>
    </div>
</template>


<style scoped>
.bubble {
    background-color: rgb(255, 255, 255);
    display: inline-block;
    border-radius: 1rem;
    margin-bottom: 2rem;
    padding: 0.8rem;
    max-width: 90%;
}

.align {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: flex-start;
    justify-content: flex-start;
}
</style>