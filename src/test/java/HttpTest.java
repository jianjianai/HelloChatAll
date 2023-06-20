import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.util.List;
import java.util.function.BiConsumer;

public class HttpTest {
    public static void main(String[] args) throws IOException {
        HttpServer httpServer = HttpServer.create(new InetSocketAddress(9991),-1);
        httpServer.createContext("/", exchange -> {
            System.out.println("-------------------------------------");
            exchange.getRequestHeaders().forEach((s, strings) -> {
                System.out.println(s+":"+strings);
            });
            exchange.sendResponseHeaders(404,0);
            exchange.close();
        });
        httpServer.start();
    }
}
