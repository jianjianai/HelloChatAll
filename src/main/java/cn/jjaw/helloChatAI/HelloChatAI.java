package cn.jja8.helloChatAI;

import org.noear.solon.Solon;

import java.io.IOException;

public class HelloChatAI {

    public static void main(String[] args) throws IOException {
        Solon.start(HelloChatAI.class, args);
//        //加载配置文件
//        new YamlConfig().load(new File("./SetUp.yaml")).as(HelloChatAI.class).save(new File("./SetUp.yaml"));
//
//        HttpServer httpServer = HttpServer.create(new InetSocketAddress(port),-1);
//        httpServer.createContext("/",new Web());
//        httpServer.createContext("/HttpProxy",new HttpProxy());
//        httpServer.createContext("/WebSocketProxy", new WebSocketProxy());
//
//        System.out.println("当前字符集编码: "+Charset.defaultCharset().name());
//        System.out.println("服务器启动: http://localhost:"+port);
//        httpServer.start();
    }
}