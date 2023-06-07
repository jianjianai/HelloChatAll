<script lang="ts" setup>
import { ChatRecordDataManager } from "./ChatRecordData"
import Box from "./chat/Box.vue";
import {useChatRecordData} from "./uerChatRecordData";
import { ChatWorkerManager } from "./chat/ai/ChatWorkerManager";
import { ref } from 'vue';
import { ThemeColorManager, useThemeColor } from "./ThemeColor"

ThemeColorManager.useDefault();
const aiList = ChatWorkerManager.getAllWorker()
const chatName = ref("新的聊天");

/**
 * 当选择ai时
 * @param ai {ChatAi}
 */
function select(key:string,ai:WorkerOptions) {
    let chatRecord = ChatRecordDataManager.createChatRecord(chatName.value);
    chatRecord.getListData().aiID = key;
    useChatRecordData.value = chatRecord;
}

</script>
<template>
    <Box>
        <h1>
            创建新的聊天
        </h1>

        <div class="op">
            <div>
                <h2>
                    设置聊天名称
                </h2>
                <input class="inputName" type="text" v-model="chatName">
            </div>
        </div>


        <div class="op">
            <h2>
                选择对话AI
            </h2>
            <div class="list">
                <div class="option" v-for="(ai,key) in aiList" @click="() => { select(key.toString(),ai) }" :key="key">
                    <div class="optionImg">

                    </div>
                    <div class="optionText">
                        <h3>{{ ai.name }}</h3>
                        <p>{{ ai.describe }}</p>
                    </div>

                </div>
            </div>
        </div>


    </Box>
</template>


<style scoped>
.op {
    margin: 1rem;
    padding: 1rem;
    border-radius: 1rem;
    background-color: rgba(255, 255, 255, 30%);
    border: 0.05rem solid rgba(0, 0, 0, 0.205);
}

.inputName {
    display: block;
    max-width: 20rem;
    width: 90%;
    height: 1.5rem;
    margin: auto;
    margin-top: 0.5rem;
    border-radius: 0.5rem;
    background-color: rgba(255, 255, 255, 0.209);
    border: 0.05rem solid rgba(0, 0, 0, 0.324);
    outline: none;
    box-shadow: 0 0 0.2rem 0 rgba(0, 0, 0, 0.122);
    transition: box-shadow 0.5s;
}

.inputName:hover {
    border:0.05rem solid v-bind('`rgba(${useThemeColor.r},${useThemeColor.g},${useThemeColor.b},80%)`');
}

.hr {
    box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.122);
    border-bottom: 0.05rem solid rgba(0, 0, 0, 0.237);
    margin-top: 1rem;
    margin-bottom: 1rem;
}

.list {
    margin-top: 1rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}

.option {
    border: 0.05rem solid rgba(0, 0, 0, 0.27);
    width: 10rem;
    height: 4rem;
    border-radius: 1rem;
    background-color: rgba(240, 248, 255, 0.415);
    box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.122);
    padding: 0.5rem;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-around;
    transition: background-color 0.5s;
    cursor: pointer;
    margin: 0.5rem;
}

.option:hover {
    background-color: v-bind('`rgba(${useThemeColor.r},${useThemeColor.g},${useThemeColor.b},10%)`');
}

.optionImg {
    width: 4rem;
    height: 4rem;
}

.optionText {
    flex: 1;
}

h3 {
    text-align: center;
    font-size: 1.3rem;
    margin: 0;
}

p {
    text-align: center;
    font-size: 0.8rem;
    margin: 0;
}

h1 {
    text-align: center;
    font-size: 2rem;
    margin: 0;
    margin-top: 2rem;
}

h2 {
    text-align: center;
    font-size: 1.2rem;
    margin: 0;
}
</style>