package cn.jja8.helloChatAI.utli;

import java.util.HashMap;
import java.util.Map;

public class ContentType {
    static Map<String,String> fileContentType = new HashMap<>(){{
        put(".html","text/html; charset=utf-8");
        put(".js","application/javascript; charset=utf-8");
        put(".css","text/css; charset=utf-8");
    }};

    /**
     * 获取文件的ContentType
     */
    public static String get(String path){
        int lastIndex = path.lastIndexOf(".");
        if(lastIndex<0){
            return null;
        }
        String name = path.substring(lastIndex);
        return fileContentType.get(name.toLowerCase());
    }
}
