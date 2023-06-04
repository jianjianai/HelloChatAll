<script setup>
import { ChatRecordDataManager } from '../class/chatRecord/ChatRecordDataManager';
import Box from './chats/all/Box.vue';
import uerChatRecordData from "../use/uerChatRecordData";

const useChatRecord = uerChatRecordData();

function test(){
    useChatRecord.value = ChatRecordDataManager.createChatRecord("新的聊天");
}


</script>
<template>
    <Box>
        <div>
            创建聊天
        </div>
        <div @click="test">
            点击创建
        </div>
    </Box>
</template>