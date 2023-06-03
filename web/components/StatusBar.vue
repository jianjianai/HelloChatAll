<script setup>
import UserChatAi from "../class/UserCharAi"
let userChatAi = UserChatAi.getUseChatAi();


</script>

<template>
    <div class="icon">
        <img src="../../public/favicon.ico">
        <div class="title">
            <h2>HelloChatAI</h2>
        </div>
    </div>
    <div class="chatAI">
        {{userChatAi.name}}
    </div>
</template>



<style scoped>
.chatAI{
    margin-left: 1rem;
}
.icon {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: flex-start;
}

.icon img {
    margin-left: 0.5rem;
    height: 1.5rem;
}

.title h2 {
    margin: 0;
    border: 0;
    font-size: 1rem;
    margin-left: 0.5rem;
    font-weight: 400;
}
</style>