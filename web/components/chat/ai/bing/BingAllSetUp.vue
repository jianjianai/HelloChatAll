<script lang="ts" setup>
import Option from '../../Option.vue';
import OptionGroup from '../../OptionGroup.vue';
import { BingAllSetUp } from './BingAllSetUp';

let porxyServer = BingAllSetUp.porxyServer;
let useCookie = BingAllSetUp.useCookie;



</script>

<template>
    <OptionGroup name="设置bingAI" describe="bingAI全局设置">
        <Option name="代理服务器" describe="设置代理服务器">
            <input type="text" v-model="porxyServer">
        </Option>
        <Option name="Cookie" describe="通过Cookie设置微软账号登录状态">
            <input type="text" v-model="useCookie">
        </Option>
    </OptionGroup>
</template>
