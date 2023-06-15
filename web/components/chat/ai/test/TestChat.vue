<script lang="ts" setup>
import { onMounted, ref, watch, watchEffect } from 'vue';
import type { TestChatWork } from './TestChatWork';
import { useThemeColor } from '@/components/ThemeColor';
import type { ChatRecordData } from '@/components/ChatRecordData';

let props = defineProps<{
    chatWorker:TestChatWork
}>();

let color = ref("#003CC7");

let data = (props.chatWorker.chatRecordData as ChatRecordData).getData();
if(data.color){
    color.value = data.color as string;
}
goColor(hexTorgb(color.value));
watch(color,()=>{
    goColor(hexTorgb(color.value));
    data.color = color.value;
});


function goColor(rgb:{r:number,g:number,b:number}){
    useThemeColor.value = {
        r:rgb.r,
        g:rgb.g,
        b:rgb.b,
        ball:[]
    }
}

function hexTorgb (hex:string){
    var hexNum:any = hex.substring(1);
    hexNum = '0x' + (hexNum.length < 6 ? repeatLetter(hexNum, 2) : hexNum);
    var r = hexNum >> 16;
    var g = hexNum >> 8 & ('0xff' as any);
    var b = hexNum & ('0xff' as any);
    return {r,g,b};
    
    function repeatWord(word:any, num:any){
        var result = '';
        for(let i = 0; i < num; i ++){
            result += word;
        }
        return result;
    }
    function repeatLetter(word:any, num:any){
        var result = '';
        for(let letter of word){
            result += repeatWord(letter, num);
        }
        return result;
    }
}

</script>
<template>
    <div>
        我是一个测试复读机！,欢迎来复读
    </div>
    <div>
        <input type="color" id="head" name="head" v-model="color">
        <label for="head">设置主题颜色</label>
    </div>
</template>