<script lang="ts" setup>
import RightBox from './chat/RightBox.vue';
import BingAllSetUp from './chat/ai/bing/BingAllSetUp.vue';

let props = defineProps<{

}>();

</script>

<template>
    <RightBox>
        <BingAllSetUp></BingAllSetUp>
    </RightBox>
</template>