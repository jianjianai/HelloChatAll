package cn.jja8.helloChatAI.api;


import cn.jja8.helloChatAI.utli.IOStream;
import com.alibaba.fastjson2.JSON;
import com.alibaba.fastjson2.JSONException;
import com.alibaba.fastjson2.JSONObject;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;

public class HttpProxy implements HttpHandler {
    static class RequestSetUp{
        String url;
        String method;
        Map<String,String> headers;
        String body;

        public RequestSetUp(JSONObject jsonObject) {
            url = jsonObject.getString("url");
            method = jsonObject.getString("method");
            headers = new LinkedHashMap<>();
            JSONObject he = jsonObject.getJSONObject("headers");
            if(he!=null){
                he.keySet().forEach((String key)-> headers.put(key,he.getString(key)));
            }
            body = jsonObject.getString("body");
        }

        @Override
        public String toString() {
            return "RequestSetUp{" +
                    "url='" + url + '\'' +
                    ", method='" + method + '\'' +
                    ", headers=" + headers +
                    ", body='" + body + '\'' +
                    '}';
        }
    }
    @Override
    public void handle(HttpExchange exchange) throws IOException {
        RequestSetUp requestSetUp = null;
        try {
            JSONObject jsonObject = JSON.parseObject(IOStream.copyToByteArrayInputStream(exchange.getRequestBody()).toString());
            if(jsonObject!=null){
                requestSetUp = new RequestSetUp(jsonObject);
            }
        }catch (JSONException jsonException){
            returnError(jsonException.toString(),exchange);
            return;
        }
        if(requestSetUp==null){
            returnError("request body not a json",exchange);
            return;
        }
        returnError(requestSetUp.toString(),exchange);
    }


    /**
     * 返回错误
     * */
    void returnError(String message,HttpExchange exchange) throws IOException {
        exchange.sendResponseHeaders(400,0);
        exchange.getResponseBody().write(message.getBytes());
        exchange.close();
    }
}
