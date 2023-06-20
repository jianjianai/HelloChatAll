import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

import java.net.InetSocketAddress;

public class WebSocKetTest {
    public static void main(String[] args) {
        WebSocketServer webSocketServer = new WebSocketServer(new InetSocketAddress(9999)) {
            @Override
            public void onOpen(WebSocket conn, ClientHandshake handshake) {
                conn.send("Welcome to the server!"); // This method sends a message to the new client
                broadcast("new connection: " + handshake
                        .getResourceDescriptor()); // This method sends a message to all clients connected
                System.out.println(
                        conn.getRemoteSocketAddress().getAddress().getHostAddress() + " entered the room!");
            }

            @Override
            public void onClose(WebSocket conn, int code, String reason, boolean remote) {
                broadcast(conn + " has left the room!");
                System.out.println(conn + " has left the room!");
            }

            @Override
            public void onMessage(WebSocket conn, String message) {
                broadcast(message);
                System.out.println(conn + ": " + message);
            }

            @Override
            public void onError(WebSocket conn, Exception ex) {
                ex.printStackTrace();
                if (conn != null) {
                    // some errors like port binding failed may not be assignable to a specific
                    // websocket
                }
            }

            @Override
            public void onStart() {
                System.out.println("start");
            }
        };

        webSocketServer.start();
    }
}
