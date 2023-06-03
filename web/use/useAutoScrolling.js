import { onMounted, onUnmounted } from "vue";

/**
 * 当当前在底部时，如果元素更新自动滚动到底部
 * @param {{value:HTMLElement}} elementRef 
 */
export default function useAutoScrolling(elementRef) {
    let observer;
    onMounted(() => {
        let element = elementRef.value;
        // 当聊天更新时，如果窗口在底部则将窗口滚动到底部
        let isOnBottom = (element.clientHeight+element.scrollTop >= element.scrollHeight-10);//标记页面是否在底部
        //监听页面变化
        observer = new MutationObserver(() => {
            //如果窗口变化前在底部则滚动到底部
            if (isOnBottom) {
                element.scrollTo(0, element.scrollHeight);
            }
        });
        observer.observe(element, {
            childList: true,  // 观察目标子节点的变化，是否有添加或者删除
            attributes: true, // 观察属性变动
            subtree: true     // 观察后代节点，默认为 false
        });

        //当窗口滚动时判断是否在底部
        element.addEventListener("scroll", function() {
            let element = elementRef.value;
            isOnBottom = element.clientHeight + element.scrollTop >= element.scrollHeight - 10;
        });
    });

    onUnmounted(() => {
        if(observer){
            observer.disconnect();//取消监听
        }
    })
}
