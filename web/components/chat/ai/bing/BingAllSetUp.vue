<script lang="ts" setup>
import Option from '../../Option.vue';
import OptionGroup from '../../OptionGroup.vue';
import { BingAllSetUp } from './BingAllSetUp';

</script>

<template>
    <OptionGroup name="设置bingAI" describe="bingAI全局设置">
        <Option name="Http代理服务器" describe="设置Http代理服务器">
            <input type="text" v-model="BingAllSetUp.HttpProxyUrl">
        </Option>
        <Option name="WebSocket代理服务器" describe="设置WebSocket代理服务器">
            <input type="text" v-model="BingAllSetUp.WebSocketProxyUrl">
        </Option>
        <Option name="Cookie" describe="通过Cookie设置微软账号登录状态">
            <input type="text" v-model="BingAllSetUp.useCookie">
        </Option>
    </OptionGroup>
</template>
