import { ref, type Ref } from "vue";
import { ChatRecordData } from "./ChatRecordData";
let useChatRecordData:Ref<ChatRecordData|undefined> = ref(undefined);
export {useChatRecordData};