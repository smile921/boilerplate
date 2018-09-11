## 模仿通过CGI建立web服务器接收请求

```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <netinet/in.h>
#include <string.h>

#define SERVER_PORT 9003

char *str_join(char *str1, char *str2);

char *html_response(char *res, char *buf);

int main(void){
    int lfd, cfd;
    struct sockaddr_in serv_addr, clin_addr;
    socklen_t clin_len;
    char buf[1024], web_result[1024], tmp[2048];
    FILE *cin;

    //================初始化socket=======================
    if((lfd = socket(AF_INET, SOCK_STREAM, 0)) == -1){
        perror("create socket failed");
        exit(1);
    }

    memset(&serv_addr, 0, sizeof(serv_addr));
    serv_addr.sin_family = AF_INET;
    serv_addr.sin_addr.s_addr = htonl(INADDR_ANY);
    serv_addr.sin_port = htons(SERVER_PORT);
    //================初始化socket=======================

    //================绑定端口=======================
    if(bind(lfd, (struct sockaddr *) &serv_addr, sizeof(serv_addr)) == -1){
        perror("bind error");
        exit(1);
    }
    //================绑定端口=======================

    //================监听端口=======================
    if(listen(lfd, 128) == -1){
        perror("listen error");
        exit(1);
    }
    //================监听端口=======================

    //忽略信号
    signal(SIGCHLD, SIG_IGN);

    //==============循环接收请求======================
    while(1){
        clin_len = sizeof(clin_addr);
        if((cfd = accept(lfd, (struct sockaddr *) &clin_addr, &clin_len)) == -1){
            perror("accept error\n");
            continue;
        }

        cin = fdopen(cfd, "r");
        setbuf(cin, (char *) 0);
        fgets(buf, 1024, cin);
        printf("\n%s", buf);
        /*
        fread(tmp,sizeof(tmp), 2048, cin);
        printf("\n%s", tmp);
        */

        char *delim = " ";
        char *p;
        char *method, *filename, *query_string;
        char *query_string_pre = "QUERY_STRING=";

        method = strtok(buf, delim);
        p = strtok(NULL, delim);
        filename = strtok(p, "?");

        if(strcmp(filename, "/favicon.ico") == 0){
            continue;
        }

        query_string = strtok(NULL, "?");
        //添加环境变量
        putenv(str_join(query_string_pre, query_string));
        //fork子进程来处理请求并响应
        int pid = fork();
        if(pid > 0){
            close(cfd);
        }else if(pid == 0){
            close(lfd);
            //打开并执行相应命令文件
            FILE *stream = popen(str_join(".", filename), "r");
            fread(buf, sizeof(char), sizeof(buf), stream);
            html_response(web_result, buf);
            write(cfd, web_result, sizeof(web_result));
            pclose(stream);
            close(cfd);
            exit(0);
        }else{
            perror("fork error");
            exit(1);
        }


    }
    //==============循环接收请求======================
    close(lfd);
    return 0;
}

/*
 * 连接字符串
 */
char *str_join(char *str1, char *str2){
    char *result = malloc(strlen(str1) + strlen(str2) + 1);
    if(result == NULL) exit(1);
    strcpy(result, str1);
    strcat(result, str2);

    return result;
}

/*
 * 整理响应数据
 * */
char *html_response(char *res, char *buf){
    char *html_response_template = "HTTP/1.1 200 OK\r\nContent-Type:text/html\r\nContent-Length: %d\r\nServer: bingbing\r\n\r\n%s";
    sprintf(res, html_response_template, strlen(buf), buf);
    return res;
}
```

## 模仿可执行应用程序

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void){
    typedef struct{
        int id;
        char *username;
        int age;
    } user;
    
    //=====================data===================
    user users[] = {
        {},
        {
            1,
            "bingbing.zhang",
            18
        }
    };
    //=====================data===================
    
    char * query_string;
    int id;
    //获取环境变量
    query_string = getenv("QUERY_STRING");
    puts(query_string);

    if(query_string == NULL){
        printf("no data");
    }else if(sscanf(query_string, "id=%d", &id) != 1){
        printf("no id");
    }else{
        printf("用户信息查询<br>学号：%d<br>姓名：%s<br>年龄：%d", id, users[id].username, users[id].age);
    }

    return 0;


}
```

## 编译运行

> 分别对user.c及server.c进行编译成可执行文件运行server即可

```bash
gcc -o user user.c
gcc -o server server.c
./server
```

> 然后由浏览器请求相应的端口查看即可