<script type="ts" setup>
import Box from './Box.vue';
import Option from './Option.vue';


</script>
<template>
    <h3>全局设置</h3>
    <Box :boder=true>
        <Option name="聊天服务器" describe="设置聊天服务器">
            asdasdasd
        </Option>
    </Box>
</template>
<style scoped>
h3 {
    font-size: 1.3rem;
    margin: 0;
    margin-left: 0.5rem;
    margin-bottom: 0.2rem;
    margin-top: 1rem;
}
.hr {
    border-bottom: 0.05rem solid rgba(0, 0, 0, 0.3);
    margin: 0;
}
</style>