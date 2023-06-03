package cn.jja8.helloChatAI;

import cn.jja8.config.tool.Conf;
import cn.jja8.config.tool.YamlConfig;
import cn.jja8.helloChatAI.api.HttpProxy;
import cn.jja8.helloChatAI.api.Web;
import com.sun.net.httpserver.HttpServer;

import java.io.File;
import java.io.IOException;
import java.net.InetSocketAddress;

public class Main {
    @Conf static int port = 8080;

    public static void main(String[] args) throws IOException {
        //加载配置文件
        new YamlConfig().load(new File("./SetUp.yaml")).as(Main.class).save(new File("./SetUp.yaml"));

        HttpServer httpServer = HttpServer.create(new InetSocketAddress(port),-1);
        httpServer.createContext("/",new Web());
        httpServer.createContext("/HttpProxy",new HttpProxy());
        System.out.println("服务器启动: http://localhost:"+port);
        httpServer.start();
    }
}