<script lang="ts" setup>
import { inject, ref, watchEffect, type Ref } from 'vue';
import { useThemeColor,ThemeColorManager } from '@/components/ThemeColor';
import type { BingChatWorker,ToneType } from './BingChatWorker';

let props = defineProps<{
    chatWorker:BingChatWorker
}>();


const colorA = { r: 146, g: 91, b: 255 };
const colorB = { r: 0, g: 137, b: 255 };
const colorC = { r: 0, g: 154, b: 199 };

const useChatType = props.chatWorker.tone!;

const switchColorFuns = {
    "Creative": () => {ThemeColorManager.useBingA()},
    "Balanced": () => {ThemeColorManager.useBingB()},
    "Precise": () => {ThemeColorManager.useBingC()}
}
watchEffect(() => {
    //聊天模式切换时切换主题颜色
    let fun = switchColorFuns[useChatType.value];
    if (fun) {
        fun();
    }
})


</script>

<template>
    <h2>
        hello BingAi
    </h2>
    <div class="theBox">
        <h3>调整偏好设置</h3>
            <div class="listBox">

                <div class="option ca" v-bind:class="{ selected: useChatType === 'Creative' }"
                    @click="() => { useChatType = 'Creative' }">
                    <h3>有创造力</h3>
                    <p>使对话更有创造力</p>
                </div>

                <div class="option cb" v-bind:class="{ selected: useChatType === 'Balanced' }"
                    @click="() => { useChatType = 'Balanced' }">
                    <h3>平衡</h3>
                    <p>在有创造力和精确之间平衡</p>
                </div>

                <div class="option cc" v-bind:class="{ selected: useChatType === 'Precise' }"
                    @click="() => { useChatType = 'Precise' }">
                    <h3>精确</h3>
                    <p>使对话更精确</p>
                </div>
            </div>
    </div>
</template>
<style scoped>
.option {
    width: 10rem;
    height: 5rem;
    background-color: rgba(240, 248, 255, 0.322);
    margin: 1rem;
    border-radius: 1rem;
    border: 0.05rem solid rgba(0, 0, 0, 0.219);
    box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.122);
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: nowrap;
    justify-content: center;
    transition: background-color 1s;
    cursor: pointer;
}

.option.ca:hover {
    background-color: v-bind('`rgba(${colorA.r},${colorA.g},${colorA.b},20%)`');
}

.option.cb:hover {
    background-color: v-bind('`rgba(${colorB.r},${colorB.g},${colorB.b},20%)`');
}

.option.cc:hover {
    background-color: v-bind('`rgba(${colorC.r},${colorC.g},${colorC.b},20%)`');
}

.option.selected {
    background-color: v-bind('`rgba(${useThemeColor.r},${useThemeColor.g},${useThemeColor.b},30%)`');
}

.option>h3 {
    margin: 0;
    font-size: 1.2rem;
}

.option>p {
    margin: 0;
    font-size: 0.8rem;
}

.listBox {
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: stretch;
}

.theBox {
    margin-bottom: 2rem;
}

h2 {
    text-align: center;
}

h3 {
    text-align: center;
    margin: 0rem;
    margin-top: 1rem;
}
</style>
