package cn.jja8.helloChatAI.api;

import static cn.jja8.helloChatAI.utli.ReturnError.returnError;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class WebSocketProxy implements HttpHandler {

    @Override
    public void handle(HttpExchange exchange) {
        String queryString = exchange.getRequestURI().getQuery();
        System.out.println(queryString);

        String connectionHeader = exchange.getRequestHeaders().getFirst("Connection");
        String upgradeHeader = exchange.getRequestHeaders().getFirst("Upgrade");
        if (!"GET".equals(exchange.getRequestMethod()) || !"Upgrade".equals(connectionHeader)
                || !"websocket".equals(upgradeHeader)) {
            returnError("不是一个WebSocket请求", "NoWebSocket", exchange);
            return;
        }

        exchange.close();
    }

}
