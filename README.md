# egretdemo

操作步骤

1.按照白鹭引擎官方文档安装window或者macosx版本引擎以及工具(安装完之后就会有egret命令可以用 egret -v 查看版本)

2.egret build [project_name] [-e] [--runtime native] //构建制定项目,这里直接在项目下输入命令行 egret build -e

参数说明：(1). project_name 项目名称，按照操作系统的命名规范命名(如果是在项目文件夹下编译，就不要加项目名称)
        (2). -e 编译指定项目的同时编译引擎目录 
        (3). --runtime 如果有native工程，则会将文件拷贝到工程里

3.egret startserver [--port 3000] [-ip] [-serveronly] //开启服务(在build之后运行)，这里直接在项目下输入命令行 egret startserver --port 端口号

参数说明: (1). project_name 项目名称，按照操作系统的命名规范命名(如果是在项目文件夹下编译，就不要加项目名称)
         (2). --port 指定端口号
         (3). -ip 是否使用本机IP
         (4). -serveronly 是否只运行服务器

4. egret publish [project_name] [--version [version]] [--runtime html5|native] [--passWorld] //发布项目

参数说明: (1). project_name 项目名称，按照操作系统的命名规范命名(如果是在项目文件夹下编译，就不要加项目名称)
         (2). --version 设置发布之后的版本号，可以不设置
         (3). --runtime 设置发布方式为 html5 或者是 native方式，默认值为html5
         (4). --password 设置发布zip文件的解压密码


(详情请见http://developer.egret.com/cn/github/egret-docs/Engine2D/projectConfig/cmdManual/index.html)


