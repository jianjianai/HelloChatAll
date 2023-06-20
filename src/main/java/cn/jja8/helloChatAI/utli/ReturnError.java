package cn.jja8.helloChatAI.utli;

import java.io.IOException;
import java.io.PrintStream;
import java.nio.charset.Charset;

import com.sun.net.httpserver.HttpExchange;

public class ReturnError {
    static boolean printf = true;
    static String defaultCharsetName = Charset.defaultCharset().name().toLowerCase();
    /**
     * 返回错误
     * */
   public static void returnError(String message,String type,HttpExchange exchange){
        try (exchange) {
            exchange.getResponseHeaders().set("Content-Type", "text/html; charset=" + defaultCharsetName);
            exchange.getResponseHeaders().set("ProxyErrorType", type == null ? "null" : type);
            exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
            exchange.sendResponseHeaders(400, 0);
            exchange.getResponseBody().write(message.getBytes());
            if(printf){
                System.err.println(type+":"+message);
            }
        } catch (IOException ignored) {

        } catch (Throwable e) {
            e.printStackTrace();
        }
    }
   public static void returnError(Throwable message,String type,HttpExchange exchange){
        try (exchange) {
            exchange.getResponseHeaders().set("Content-Type", "text/html; charset=" + defaultCharsetName);
            exchange.getResponseHeaders().set("ProxyErrorType", type == null ? "null" : type);
            exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
            exchange.sendResponseHeaders(400, 0);
            PrintStream printStream = new PrintStream(exchange.getResponseBody());
            message.printStackTrace(printStream);
            if(printf){
                System.err.print(type+":");
                message.printStackTrace();
            }
        } catch (IOException ignored) {

        } catch (Throwable e) {
            e.printStackTrace();
        }
    }
}
