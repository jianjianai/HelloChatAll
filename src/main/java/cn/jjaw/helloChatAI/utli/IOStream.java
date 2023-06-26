package cn.jja8.helloChatAI.utli;

import java.io.*;

public class IOStream {
    /**
     * 完整拷贝流
     * */
    public static void copy(InputStream in, OutputStream out) throws IOException {
        byte[] buff = new byte[1024];
        for (int len=in.read(buff);len>=0;len=in.read(buff)){
            out.write(buff,0,len);
        }
    }

    /**
     * 完整的将流拷贝到ByteArrayOutputStream
     */
    public static ByteArrayOutputStream copyToByteArrayInputStream(InputStream in) throws IOException {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        copy(in,byteArrayOutputStream);
        return byteArrayOutputStream;
    }
}
