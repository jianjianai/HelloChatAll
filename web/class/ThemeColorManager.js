import { ref } from "vue"

const useThemeColor = ref({
    r: 0,g: 140,b: 220,  //颜色 rgb
    ball:[
        {r: 169,g: 0,b: 255,a:"61%",x:'87%',y:"34%",l:"20rem"}   //背景小球 rgba颜色 x,y坐标 l大小
    ]
});


class ThemeColorManager {
    static useDefault(){ 
        useThemeColor.value = {
            r: 0,g: 140,b: 220,  
            ball:[
                {r: 41,g: 255,b: 0,a:"51%",x:'14%',y:"77%",l:"20rem"} ,
                {r: 14,g: 0,b: 255,a:"61%",x:'87%',y:"34%",l:"20rem"}
            ]
        }
    }
    static useBingA(){
        useThemeColor.value = { 
            r: 146, g: 91, b: 255 ,
            ball:[

            ]
        }
    }
    static useBingB(){
        useThemeColor.value = { 
            r: 0, g: 137, b: 255 ,
            ball:[

            ]
        }
    }
    static useBingC(){
        useThemeColor.value = { 
            r: 0, g: 154, b: 199 ,
            ball:[

            ]
        }
    }

}

export { ThemeColorManager,useThemeColor }