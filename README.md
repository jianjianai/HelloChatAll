# HelloChatAll

一个AI聊天项目，正在写。

## 架构

Java后端，vue前端。

## 构建

首先需要准备好 jdk17 和 node.js 环境。

初始化项目
~~~
npm install
~~~

之后执行构建命令。
~~~
./gradlew shadow
~~~

构建完成后得到jar包
~~~
./build/libs/HelloChatAll-1.0-SNAPSHOT-all.jar
~~~

之后就可以使用传统的运行命令了
~~~
java -jar HelloChatAll-1.0-SNAPSHOT-all.jar 
~~~
