package cn.jja8.helloChatAI.api;

import static cn.jja8.helloChatAI.utli.Wait.waitRunEnd;
import static cn.jja8.helloChatAI.utli.ReturnError.returnError;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URISyntaxException;
import java.net.URL;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson2.JSON;
import com.alibaba.fastjson2.JSONException;
import com.alibaba.fastjson2.JSONObject;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import cn.jja8.helloChatAI.utli.IOStream;

public class WebSocketProxy implements HttpHandler {
    static class Proxy {
        String url;
        Map<String, String> headers;

        public Proxy(String url, LinkedHashMap<String, String> headers) {
            this.url = url;
            this.headers = headers;
        }

        public Proxy(JSONObject jsonObject) {
            url = jsonObject.getString("url");
            JSONObject headersO = jsonObject.getJSONObject("headers");
            if (headersO != null) {
                headers = headersO.to(Map.class);
            } else {
                headers = Map.of();
            }
            System.out.println(this);
        }

        @Override
        public String toString() {
            return "WebSocketProxy.Proxy{" +
                    "url='" + url + '\'' +
                    ", headers=" + headers +
                    '}';
        }

        public void start(HttpExchange exchange) throws IOException, URISyntaxException {
            if (url == null) {
                throw new URISyntaxException("null", "必须指定url");
            }
            HttpURLConnection httpURLConnection = null;
            try {
                httpURLConnection = (HttpURLConnection) new URL(url).openConnection();

                String mode = exchange.getRequestMethod();
                httpURLConnection.setRequestMethod(mode);
                httpURLConnection.setDoOutput(true);

                // 添加握手请求头
                List<String> copyHeaders = List.of(
                    "Connection",
                    "Upgrade",
                    "Sec-Websocket-Extensions",
                    "Sec-Websocket-Key",
                    "Sec-Websocket-Version"
                );
                for (String he : copyHeaders) {
                    String in = exchange.getRequestHeaders().getFirst(he);
                    if (in != null) {
                        httpURLConnection.addRequestProperty(he, in);
                        System.out.println(he+":"+in);
                    }
                }




                // 拷贝请求头请求头
                HttpURLConnection finalHttpURLConnection = httpURLConnection;
                List<String> excludeRequest = List.of("");
                headers.forEach((s, s2) -> {
                    if (!excludeRequest.contains(s)) {
                        finalHttpURLConnection.addRequestProperty(s, s2);
                    }
                });

                System.out.println(httpURLConnection.getRequestProperties());
                httpURLConnection.connect();

                int code = httpURLConnection.getResponseCode();
                if (code != 200) {
                    returnError("链接失败，错误代码" + code, "ConnectError", exchange);
                    return;
                }
                // 拷贝返回头
                List<String> excludeResponse = List.of("Location");
                httpURLConnection.getHeaderFields().forEach((s, strings) -> {
                    if (s != null && !excludeResponse.contains(s)) {
                        strings.forEach(s1 -> {
                            exchange.getResponseHeaders().add(s, s1);
                        });
                    }
                });
                exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");

                // 拷贝返回代码
                exchange.sendResponseHeaders(httpURLConnection.getResponseCode(), 0);

                HttpURLConnection httpURLConnectionLo = httpURLConnection;

                // 等待两个拷贝流结束
                waitRunEnd(
                        () -> {
                            try {
                                IOStream.copy(exchange.getRequestBody(), httpURLConnectionLo.getOutputStream());// 拷贝请求体
                            } catch (IOException e) {
                                e.printStackTrace();
                            }
                        },
                        () -> {
                            try {
                                IOStream.copy(httpURLConnectionLo.getInputStream(), exchange.getResponseBody());// 拷贝返回体
                            } catch (IOException e) {
                                e.printStackTrace();
                            }
                        });

                exchange.close();
            } finally {
                if (httpURLConnection != null) {
                    httpURLConnection.disconnect();
                }
            }
        }
    }

    @Override
    public void handle(HttpExchange exchange) {
        try {
            String connectionHeader = exchange.getRequestHeaders().getFirst("Connection");
            String upgradeHeader = exchange.getRequestHeaders().getFirst("Upgrade");
            if (!"GET".equals(exchange.getRequestMethod()) || !"Upgrade".equals(connectionHeader)
                    || !"websocket".equals(upgradeHeader)) {
                returnError("不是一个WebSocket请求", "NoWebSocket", exchange);
                return;
            }
            String queryString = exchange.getRequestURI().getQuery();
            if (queryString == null) {
                returnError("未指定代理数据", "NoProxyData", exchange);
                return;
            }
            String proxyJsonStringData = URLDecoder.decode(queryString, StandardCharsets.UTF_8);
            JSONObject proxyJson;
            try {
                // System.out.println(proxyJsonStringData);
                proxyJson = JSON.parseObject(proxyJsonStringData);
            } catch (JSONException error) {
                returnError(error, "JsonError", exchange);
                return;
            }
            if (proxyJson == null) {
                returnError("未指定代理数据", "NoProxyData", exchange);
                return;
            }
            try {
                new Proxy(proxyJson).start(exchange);
                return;
            } catch (IOException | URISyntaxException error) {
                returnError(error, "ProxyError", exchange);
                return;
            }
        } catch (Throwable e) {
            e.printStackTrace();
            returnError(e, "BugError", exchange);
        }
    }
}
