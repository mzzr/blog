# About this blog
程序员想写博客一般有两种原因。一种是真的想写博客，一种是闲着没事干了想折腾。质胜文则野，文胜质则史。我觉得我是属于太无聊的那种，毕竟曾经无数次写好了一个博客的skeleton又因为不填东西最后把项目删掉。这次终于完成了一个还像模像样的博客，感慨疫情残酷的同时，也争取好好利用一下这个难得的假期。
## 技术选型
- 前端框架
  - 为什么不用成熟的静态博客框架？
    - 不方便后期的定制和扩展。用框架更容易撞车，并且之前无聊的时候似乎把常见的项目都试过了。
  - 因为之前写Vue比较多，既然想折腾，不如学一学一直没学会的React。项目中使用了**Create React App**脚手架以及阿里的**antd**组件库。实现中大量采用了函数式组件+Hooks的写法，然鹅由于项目较小，感觉对React的理解并没有得到较大的提升。对Hooks的深入理解，之后可以参考这篇[文章](https://www.jianshu.com/p/d396ec03e04a)。
- 数据
  - 因为是静态站点，文章就直接存储为markdown格式的文件了，metadata则统一存在一个json里面，方便之后可能发生的迁移工作。
  - markdown文件采用**react-markdown**插件进行渲染，可以方便定制不同组件的样式。
  - 关键的代码部分利用**react-syntax-highlighter**实现语法高亮。暂时使用mono-blue风格并稍微改了改行号部分的样式。
- 写作方式
  - 使用**[Typora](https://www.typora.io/)**进行写作，Win/Linux/mac三端可用，插入图片方便。
  - 写了一个python脚本用来倒入写好的markdown文件，主要实现了以下几个功能：
    - 提取metadata，对应要求markdown文件**最好**为如下格式
      ```markdown
      # Title
      Tags/tags: "tag separate by comma"
      Description line
      ```
      其中Description line为除了title line和tags line的第一个非空行。之后可能考虑将格式限制写死，在导入时如果不符合格式报错。
    - 用正则表达式提取markdown中的图片语法，利用uuid重命名图片并存储至项目public文件夹下。之后可能考虑加入图片压缩功能。
## 部署
- 部署位置尝试
  - 腾讯云（1M带宽的学生机，慢）
  - cloudflare cdn（估计是被用来反向代理帮助翻墙太多了，在国内的访问速度也十分的慢）
  - [netlify](https://www.netlify.com/)（可以与github持续集成发布静态站点，实测在国内各节点访问较慢）
  - **[zeit.co](zeit.co)**
    - 同样是*a cloud platform for static sites and Serverless Functions*，用他的理由是实测在国内各节点访问较快
    - push到github repo后自动build+deploy静态站点，十分方便
- SSL证书
  - zeit.co自带SSL证书
  - 为了后续可能实现的api，对一些其他二级域名额外申请了SSL证书
    - 推荐使用[acme.sh](https://github.com/acmesh-official/acme.sh)项目，脚本自动申请Let's Encrypt的免费证书，并利用crontab任务解决90天证书更新的问题
    - 证书申请
      ```sh
      # 安装acme
      curl https://get.acme.sh | sh
      
      # 证书申请
      acme.sh --issue -d example.com -d www.example.com -d cp.example.com -w 网站根目录
      
      # copy cert to nginx
      acme.sh  --installcert  -d  api.eweew.com   \
              --key-file   /etc/nginx/ssl/api.eweew.key \
              --fullchain-file /etc/nginx/ssl/fullchain.cer \
              --reloadcmd  "service nginx force-reload"
      ```
    - nginx配置
       一些更细节的配置详见[tls-nginx-best-practices](https://www.linode.com/docs/web-servers/nginx/tls-deployment-best-practices-for-nginx/)
      ```nginx
      # /etc/nginx/nginx.conf
      
      http {
        ssl_certificate			/etc/nginx/ssl/fullchain.cer;	#证书路径     
        ssl_certificate_key	/etc/nginx/ssl/api.eweew.key;	#key路径
        # 下两行为默认配置，无需显式声明
        # ssl_protocols       TLSv1 TLSv1.1 TLSv1.2;
        # ssl_ciphers         HIGH:!aNULL:!MD5;
        
        # SSL优化
        ssl_session_cache   shared:SSL:1m;
        ssl_session_timeout 10m;
      
        server {
          listen	443 ssl http2 default_server;                                                 
          server_name					*.mydomain.com;                        
        }
      
        # 转发所有http请求至https
        server {
          listen      80;
          server_name *.eweew.com;
          return 301 https://$host$request_uri;
        }
      }
      
      ```
      
  
## 一些值得记录的踩坑过程
- 因为内容超出y轴时出现scrollBar导致页面抖动
  ```css
  // 利用css3的calc语法当出现滚动条时给页面左边增加相应的padding
  #root {
    padding-left: calc(100vw - 100%); 
  }
  ```
  但是感觉用了react还在用这么土的办法解决有点奇怪。
- 打包大小优化
  - 安装**source-map-explorer**后，可以利用```source-map-explorer 'build/static/js/*.js```分析bundle.js中各个库的大小并进行相应优化
  - 后续如果仍需优化，可以考虑将单页应用拆分路由打包（组件懒加载）
## 后续计划
- [ ] 评论系统
- [ ] 改善UI
- [ ] 统计访问量
- [ ] 标签系统

