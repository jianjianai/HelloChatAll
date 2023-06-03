<script setup>
let props = defineProps({
    data:Object
});
let data = props.data;

</script>

<template>
    <div class="bubble">
        <div class="messageBox">
            <div class="errorMessage">
                {{ data.message }}
            </div>
            <div class="errorButtons">

            </div>
        </div>
    </div>
</template>

<style scoped>
.bubble {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: nowrap;
    margin-bottom: 2rem;
}

.messageBox {
    border: 0.05rem solid rgba(255, 0, 0, 0.287);
    background-color: rgba(255, 255, 255);
    min-height: 2rem;
    min-width: 7rem;
    border-radius: 1rem;
    padding: 0.5rem;
}

.errorMessage {
    color: red;
}
</style>
