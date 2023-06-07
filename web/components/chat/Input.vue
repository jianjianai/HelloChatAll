<script lang="ts" setup>
import { inject, ref, watchEffect } from 'vue';
import Send from '../../assets/icon/SendIcon.vue';
import { useThemeColor } from '../ThemeColor';
import type { ChatRecordData } from '../ChatRecordData';
let emit = defineEmits(["onInputMessage", "onSendMessage"]);

let props = defineProps<{
  chatRecordData: ChatRecordData
}>();

let inputText = ref("");


watchEffect(() => {
    emit("onInputMessage", inputText.value);
})

function onSend() {
    emit("onSendMessage", inputText.value);
}

//暴露接口

defineExpose({
    setInputText(text:string) {
        inputText.value = text;
    }
});

</script>

<template>
    <div class="box">
        <div class="inputBox">
            <div class="inputBor">
                <textarea v-model=inputText class="input" placeholder="愉快地聊天吧！"></textarea>
                <div class="sendBox">
                    <div class="send" @click="onSend">
                        <Send class="sendSvg" />发送
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.sendBox {
    display: flex;
    flex-direction: column-reverse;
}

.send {
    border-radius: 0.5rem;
    font-size: 1rem;
    display: flex;
    align-items: center;
    background-color: v-bind('`rgba(${useThemeColor.r}, ${useThemeColor.g}, ${useThemeColor.b}, 0.4)`');
    padding: 0.5rem;
    cursor: pointer;
    transition: background-color 0.5s;
}

.send:hover {
    background-color: v-bind('`rgba(${useThemeColor.r}, ${useThemeColor.g}, ${useThemeColor.b}, 0.6)`');
}

.sendSvg {
    margin-right: 0.2rem;
}

.input {
    flex: 1;
    resize: none;
    outline: none;
    border: none;
    font-size: 1rem;
    background-color: rgba(255, 255, 255, 0);
}

.inputBor {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    border: 0.05rem solid rgba(0, 0, 0, 0.2);
    border-radius: 0.5rem;
    height: 5rem;
    flex: 1;
    margin-bottom: 1rem;
    margin-top: 1rem;
    box-shadow: 0 0 0.5rem -0.3rem rgba(0, 0, 0, 0.2);
    padding: 0.5rem;
    transition: background-color 0.5s;
    background-color: rgba(255, 255, 255, 0);
}

.inputBor:has(.input:focus-visible) {
    background-color: rgba(255, 255, 255, 0.43);
    border: v-bind('`0.08rem solid rgba(${useThemeColor.r}, ${useThemeColor.g}, ${useThemeColor.b}, 0.8)`');
    padding: 0.47rem;
}

.inputBor:hover {
    background-color: rgba(255, 255, 255, 0.43);
    border: v-bind('`0.05rem solid rgba(${useThemeColor.r}, ${useThemeColor.g}, ${useThemeColor.b}, 0.5)`');
}

.box {
    height: 8rem;
    display: flex;
    align-items: stretch;
    flex-direction: row;
    flex-wrap: nowrap;
}

.inputBox {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex-wrap: nowrap;
    margin-left: 1rem;
    margin-right: 1rem;
}</style>
