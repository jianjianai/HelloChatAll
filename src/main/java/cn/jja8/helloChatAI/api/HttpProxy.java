package cn.jja8.helloChatAI.api;


import cn.jja8.helloChatAI.utli.IOStream;
import com.alibaba.fastjson2.JSON;
import com.alibaba.fastjson2.JSONException;
import com.alibaba.fastjson2.JSONObject;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;
import java.io.PrintStream;
import java.net.HttpURLConnection;
import java.net.URISyntaxException;
import java.net.URL;
import java.net.URLDecoder;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class HttpProxy implements HttpHandler {
    static String defaultCharsetName = Charset.defaultCharset().name().toLowerCase();
    static class Proxy {
        String url;
        Map<String,String> headers;

        public Proxy(String url, LinkedHashMap<String, String> headers) {
            this.url = url;
            this.headers = headers;
        }

        public Proxy(JSONObject jsonObject) {
            url = jsonObject.getString("url");
            JSONObject headersO = jsonObject.getJSONObject("headers");
            if(headersO!=null){
                headers = headersO.to(Map.class);
            }else {
                headers = Map.of();
            }
            System.out.println(this);
        }

        @Override
        public String toString() {
            return "Proxy{" +
                    "url='" + url + '\'' +
                    ", headers=" + headers +
                    '}';
        }

        public void start(HttpExchange exchange) throws IOException, URISyntaxException {
            if(url==null){
                throw new URISyntaxException("null","必须指定url");
            }
            HttpURLConnection httpURLConnection = null;
            try{
                httpURLConnection = (HttpURLConnection) new URL(url).openConnection();

                httpURLConnection.setRequestMethod(exchange.getRequestMethod());

                //拷贝请求头请求头
                HttpURLConnection finalHttpURLConnection = httpURLConnection;
                List<String> excludeRequest = List.of("");
                headers.forEach((s, s2) -> {
                    if(!excludeRequest.contains(s)){
                        finalHttpURLConnection.addRequestProperty(s,s2);
                    }
                });

                httpURLConnection.setDoOutput(true);
                httpURLConnection.connect();

                //拷贝请求体
                IOStream.copy(exchange.getRequestBody(),httpURLConnection.getOutputStream());


                //拷贝返回头
                List<String> excludeResponse = List.of("Location");
                httpURLConnection.getHeaderFields().forEach((s, strings) -> {
                    if(s!=null && !excludeResponse.contains(s)){
                        strings.forEach(s1 -> {
                            exchange.getResponseHeaders().add(s,s1);
                        });
                    }
                });

                exchange.getResponseHeaders().set("Access-Control-Allow-Origin","*");
                //拷贝返回代码
                exchange.sendResponseHeaders(httpURLConnection.getResponseCode(),0);

                //拷贝返回体
                IOStream.copy(httpURLConnection.getInputStream(),exchange.getResponseBody());

                exchange.close();
            } finally {
                if(httpURLConnection!=null){
                    httpURLConnection.disconnect();
                }
            }
        }
    }

    @Override
    public void handle(HttpExchange exchange){
        try {
            if("OPTIONS".equals(exchange.getRequestMethod())){
                exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
                exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "*");
                exchange.sendResponseHeaders(200,0);
                exchange.close();
                return;
            }
            String proxyStringData = exchange.getRequestHeaders().getFirst("ProxyData");
            if(proxyStringData==null){
                returnError("未指定代理数据","NoProxyData",exchange);
                return;
            }
            String proxyJsonStringData = URLDecoder.decode(proxyStringData, StandardCharsets.UTF_8);
            JSONObject proxyJson;
            try{
                proxyJson = JSON.parseObject(proxyJsonStringData);
            }catch (JSONException error){
                returnError(error,"JsonError",exchange);
                return;
            }
            if(proxyJson==null){
                returnError("未指定代理数据","NoProxyData",exchange);
                return;
            }
            try{
                new Proxy(proxyJson).start(exchange);
            }catch (IOException|URISyntaxException error){
                returnError(error,"ProxyError",exchange);
            }
        }catch (Throwable e){
            e.printStackTrace();
            returnError(e,"BugError",exchange);
        }
    }


    /**
     * 返回错误
     * */
    void returnError(String message,String type,HttpExchange exchange){
        try (exchange) {
            exchange.getResponseHeaders().set("Content-Type", "text/html; charset=" + defaultCharsetName);
            exchange.getResponseHeaders().set("ProxyErrorType", type == null ? "null" : type);
            exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
            exchange.sendResponseHeaders(400, 0);
            exchange.getResponseBody().write(message.getBytes());
        } catch (IOException ignored) {

        } catch (Throwable e) {
            e.printStackTrace();
        }
    }
    void returnError(Throwable message,String type,HttpExchange exchange){
        try (exchange) {
            exchange.getResponseHeaders().set("Content-Type", "text/html; charset=" + defaultCharsetName);
            exchange.getResponseHeaders().set("ProxyErrorType", type == null ? "null" : type);
            exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
            exchange.sendResponseHeaders(400, 0);
            PrintStream printStream = new PrintStream(exchange.getResponseBody());
            message.printStackTrace(printStream);
        } catch (IOException ignored) {

        } catch (Throwable e) {
            e.printStackTrace();
        }
    }
}
