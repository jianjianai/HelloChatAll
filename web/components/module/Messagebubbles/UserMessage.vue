<script setup>

let props = defineProps({
    data: Object
});
let data = props.data;

</script>

<template>
    <div class="align">
        <TransitionGroup name="input">
            <div class="witeIng" v-if="data.isPreview" key="input">
                正在输入..
            </div>
            <div class="bubble" v-bind:class="{ preview: data.isPreview }" key="message">
                <pre class="messageBox" v-text="data.message"></pre>
            </div>
        </TransitionGroup>
    </div>
</template>



<style scoped>
.input-move, 
.input-enter-active,
.input-leave-active {
  transition: all 0.5s;
  transition-timing-function: cubic-bezier(0, 0.76, 1, 1.01);
}

.input-enter-from,
.input-leave-to {
  opacity: 0;
  transform: translateX(5rem);
}

.input-leave-active {
  position: absolute;
}



.witeIng {
    font-size: 0.6rem;
    margin-top: 0;
    margin-bottom: 0.2rem;
}

.messageBox {
    word-break: break-word;
    white-space: pre-wrap;
    margin: 0;
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