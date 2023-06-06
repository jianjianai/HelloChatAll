import { markRaw, reactive, ref, watchEffect } from "vue";

//聊天记录列表 {id:{id,name}}
let chatRecords = reactive({});
let chatRecordsNextID = ref(0);
//加载聊天记录列表
(()=>{
    let list = localStorage.ChatRecordList;
    if (list) {
      let listObj = JSON.parse(list);
      if (listObj) {
        chatRecords = reactive(listObj);
      }
    }
})();
//加载最大数量
(()=>{
  let idstring = localStorage.chatRecordsNextID;
  if(idstring){
      let id = parseInt(idstring);
      if(id){
          chatRecordsNextID.value = id;
      }
  }
})();
//最大变化保存
watchEffect(()=>{
    localStorage.chatRecordsNextID = chatRecordsNextID.value;
})
//聊天列表变化自动保存
watchEffect(() => {
  localStorage.ChatRecordList = JSON.stringify(chatRecords);
});




//一个聊天记录对象
class ChatRecordData {
  listObj;
  data; //聊天记录数据对象
  runTime = reactive({});
  constructor(listObj) {
    this.listObj = reactive(listObj);
  }
  getID(){
    return this.listObj.id;
  }
  /**
   * 删除这条聊天记录
   */
  delete(){
    delete localStorage["ChatRecord--" + this.listObj.id];
    delete chatRecords[this.listObj.id];
    delete charRecordObjMap[this.listObj.id];
  }
  getName() {
    return this.listObj.name;
  }
  setName(name) {
    this.listObj.name = name;
  }
  /**
   * 获取数据对象，是 reactie 修改自动保存
   * @returns obj
   */
  getData() {
    if (!this.data) {
      //加载聊天记录
      this.data = reactive({});
      let stringdata = localStorage["ChatRecord--" + this.listObj.id];
      if (data) {
        let obj = JSON.parse(stringdata);
        if (obj) {
          this.data = reactive(obj);
        }
      }
      watchEffect(() => {
        localStorage["ChatRecord--" + this.listObj.id] = JSON.stringify(this.data);
      });
    }
    return this.data;
  }
  /**
   * 不要在这个对象里存大量数据,getData是懒加载，当用到的时候才加载，getListData是一直加载，不管有没有使用。
   */
  getListData(){
    return this.listObj;
  }
  /**
   * 获取runtime
   */
  getRunTime(){
    return runTime;
  }
}

//维护聊天记录对象 {id,ChatRecord}
let charRecordObjMap = reactive({});
for (const i in chatRecords) {
  let listObj = chatRecords[i];
  if(charRecordObjMap[listObj.id]){
      continue;
  }
  let chat = markRaw(new ChatRecordData(listObj));
  charRecordObjMap[listObj.id] = chat;
}



/**
 * 管理聊天记录
 */
class ChatRecordDataManager {
  /**
   * 获取全部聊天记录对象 是reactive的
   * @return {[ChatRecordData]}
   */
  static getAllChatRecord() {
    return charRecordObjMap;
  }
  /**
   * 创建一个聊天记录对象
   * @returns {ChatRecordData}
   */
  static createChatRecord(name){
    let theId = chatRecordsNextID.value++;
    let obj = {id:theId,name:name};
    chatRecords[theId] = obj;
    let chat = markRaw(new ChatRecordData(obj))
    charRecordObjMap[theId] = chat;
    return chat;
  }
}

export {ChatRecordDataManager,ChatRecordData}