package cn.jja8.helloChatAI.api;

import cn.jja8.helloChatAI.utli.ContentType;
import cn.jja8.helloChatAI.utli.IOStream;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.nio.charset.Charset;

public class Web implements HttpHandler {
    static String defaultCharsetName = Charset.defaultCharset().name().toLowerCase();
    @Override
    public void handle(HttpExchange exchange) throws IOException {
        URI uri = exchange.getRequestURI();
        String path = uri.getPath();
        if(path.equals("/")){
            path = "/index.html";
        }
        try (InputStream inputStream = Web.class.getResourceAsStream("/web"+path)){
            if(inputStream==null){
                exchange.getResponseHeaders().set("Content-Type","text/html; charset="+defaultCharsetName);
                exchange.sendResponseHeaders(404,0);
                exchange.getResponseBody().write("<h2>404</h2>".getBytes());
                exchange.close();
            }else {
                String type = ContentType.get(path);
                if(type!=null){
                    exchange.getResponseHeaders().set("Content-Type",type);
                }
                exchange.sendResponseHeaders(200,0);
                IOStream.copy(inputStream,exchange.getResponseBody());
                exchange.close();
            }
        }
    }

}
