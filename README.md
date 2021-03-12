## `工程描述`
1、分为新系统(alphagu_admin)和老系统(APP_Admin_HTML5)
2、react搭建新框架新系统，由于老系统的功能还在使用，所以用iframe嵌入老系统，
3、老系统分离前后端，将单页系统改成多页，用webpack单独打包
4、老系统中的新需求和修改需求,完成在老系统中
5、新需求在新系统中完成

## `项目功能`
进行后台管理，包括但不限于，策略分析、监控、管理员、策略发布、虚拟币、用户组等等的管理
后台分为四种角色，分析师、管理员、运营管理员、投研管理员，分别拥有不同的角色权限

## `所用技术`
新系统：
1、webpack4 + react16 + antd3 + less3 + mobx5 + axios
2、eslint规则，如遇规则错误，可在.eslintrc.js中查找，是否需要修改规则
3、使用react-router路由管理工具
4、使用axios+promise自定义ajaxhandle句柄，调用后台接口
5、用iframe框嵌入老系统，可在老系统的manage.js文件中，查看window.addEventListener()函数的具体通信操作
6、利用nginx转发解决跨域问题，nginx的配置文件，请参考同级目录下的nginx.conf
7、使用了antd组件库
8、老系统：webpack4 + jquery + ajax
9、拿出老系统的单页.jsp文件，改为html静态页，利用webpack4打包启动静态页，js、css单独打包
10、es6语法

## `知识相关连接`
create-react-app框架：https://github.com/facebook/create-react-app
webpack4：https://www.webpackjs.com/concepts/
react16：https://react.docschina.org/
antd3：https://3x.ant.design/docs/react/introduce-cn
less3：http://lesscss.cn/
mobx5：https://cn.mobx.js.org/
axios：http://axios-js.com/
es6：http://caibaojian.com/es6/
nginx：https://www.nginx.cn/doc/

## `要注意的点，现有的问题及解决方法`
1、项目启动时，如果报规则错误，则可查看.eslintrc.js文件，确定规则错误，修改相应代码，如非必要，请不要修改相应规则
2、新老系统通信可在新系统的leftMenu.jsx中，和老系统的manage.js(window.addEventListener())文件中查看
3、由于二级菜单目录一般都是由老系统引入，所以相关代码可在老系统的stategymonitor.js中查看
4、组件的数目和内容应与APP的数据库中的menu表相对应(组件添加的流程请参照下一个点)

## `组件添加的流程`
1、在views文件夹中添加XXX.jsx组件
2、在routeContent.jsx文件中注入组件，添加<Route>标签
3、标签的属性path应是'/app'+'一级菜单的menu_url'+'二级菜单的menu_url'，component属性则与你引入时定义的组件名相同即可
4、menu表的添加规则是：
    (1)menu_id：自增即可
    (2)menu_name：自己定义
    (3)menu_icon：是菜单的标志、若没有要求则填写mail，若有，则去antd组件库的标志中寻找相关标志
    (4)menu_url：组件连接，自定义相关名
    (5)class：老系统改新系统时留下的属性，新加组件可随意设置
    (6)menu_type：设置组件权限时使用，具体规则请参照数据库详情
    (7)is_display：是否展示，具体规则请参照数据库详情
    (8)component：组件名称，与你引入时，相同

## `克隆项目`
git clone git@172.16.5.77:fangjiechen/alphagu_admin.git
git clone git@172.16.5.77:fangjiechen/APP_Admin_HTML5.git

## `本地启动`
前端启动两个项目
1、/alphagu_admin(npm start)
2、/APP_Admin_HTML5/shareHTML5_webpack(npm run dev)
启动nginx(配置文件请参考同级目录下nginx.conf)

## `项目启动后登录链接`
http://172.16.137.247:2323/AlphaAdmin/#/login
测试账户：用户名admin  密码123456

## `项目部署`
前端部署
1、/alphagu_admin文件目录下使用npm run build命令，生成build文件
2、/APP_Admin_HTML5/shareHTML5_webpack文件目录下使用npm run build命令，生成dist文件
3、登录服务器
4、在/home/fangjie/alphagu_admin文件下放置build文件
5、在/home/fangjie/APP_Admin_HTML5/shareHTML5_webpack文件下放置dist文件
后台部署
1、打包jar包
2、登录服务器
3、在/home/workspace/microservice/APP-Admin文件下放置jar包
4、启动./start-service.sh文件(如果无效，则先杀死之前的进程，再启动文件)

## `项目结构图(alphagu_admin)`
alphagu_admin
├─.eslintignore
├─.eslintrc.js  //eslint配置文件。主要功能是检查缩进、换行等格式问题
├─.gitignore  //git配置文件。项目提交配置不上传工程的文件或者文件夹
├─nginx.conf  //nginx配置文件
├─package-lock.json  //由package.json更新而来
├─package.json  //项目所需要的依赖包
├─README.md
├─record.xlsx  //需求文件
├─src
|  ├─App.css
|  ├─App.test.js
|  ├─index.css
|  ├─index.js
|  ├─logo.svg
|  ├─serviceWorker.js
|  ├─setupTests.js
|  ├─views  //组件目录，有新增的组件，可在此文件夹下面新建
|  ├─utils
|  |   ├─common.js //常用函数文件
|  |   └headerColumns.js
|  ├─styles
|  |   ├─less
|  |   |  ├─home.less
|  |   |  ├─leftMenu.less
|  |   |  └login.less
|  |   ├─img
|  |   |  ├─404.png
|  |   |  ├─loading.gif
|  |   |  ├─login_bg.png
|  |   |  └no_page.png
|  ├─stores
|  |   └ResetPwd.js
|  ├─routes
|  |   └index.js
|  ├─model  // 与后台交互文件，包括封装的句柄，后台不同的地址，以及后台接口
|  |   ├─api.js
|  |   ├─login.js
|  |   ├─tempIp.js
|  |   └utils.js
|  ├─helpers
|  |    └cookies.js
|  ├─components
|  |     ├─leftMenu
|  |     |    └leftMenu.jsx
|  |     ├─index
|  |     |   └routeContent.jsx
|  |     ├─header
|  |     ├─form
|  |     |  ├─subscribeTypeForm.jsx
|  |     |  ├─systemReportParams.jsx
|  |     |  └updatePwdForm.jsx
|  |     ├─common
|  |     |   ├─404.js
|  |     |   ├─App.js
|  |     |   ├─history.js
|  |     |   ├─Home.js
|  |     |   ├─Login.js
|  |     |   └noPage.js
├─scripts
|    ├─build.js
|    ├─start.js
|    └test.js
├─public
|   ├─favicon.ico
|   ├─index.html
|   ├─logo192.png
|   ├─logo512.png
|   ├─manifest.json
|   └robots.txt
├─node_modules   
|  ├─logs
|  |  ├─HEAD
|  |  ├─refs
|  |  |  ├─remotes
|  |  |  |    ├─origin
|  |  |  |    |   ├─HEAD
|  |  |  |    |   └master
|  |  |  ├─heads
|  |  |  |   └master
|  ├─info
|  |  └exclude
|  ├─hooks
|  |   ├─applypatch-msg.sample
|  |   ├─commit-msg.sample
|  |   ├─fsmonitor-watchman.sample
|  |   ├─post-update.sample
|  |   ├─pre-applypatch.sample
|  |   ├─pre-commit.sample
|  |   ├─pre-push.sample
|  |   ├─pre-rebase.sample
|  |   ├─pre-receive.sample
|  |   ├─prepare-commit-msg.sample
|  |   └update.sample

## `项目结构图(APP_Admin_HTML5)`
shareHTML5_webpack
    │  .babelrc  //babel的配置文件。此处babel主要作用是兼容es6（es2016 es2017 es2018等）
    │  .eslintrc.js  //eslint配置文件。主要功能是检查缩进、换行等格式问题
    │  .gitignore  //git配置文件。项目提交配置不上传工程的文件或者文件夹
    │  package-lock.json //由package.json更新而来
    │  package.json //项目所需要的依赖包
    │  postcss.config.js //优化css配置文件
    │  webpack.config.js //全局根据当前环境，取对应的配置文件
    │  
    ├─app //工程所有原生的资源
    │  │  favicon.ico
    │  │  
    │  ├─assets //静态第三方css、js、fonts等
    │  │  ├─css
    │  │  │  │  bootstrap.min.css
    │  │  │  │  ...
    │  │  │  │  
    │  │  │  └─images
    │  │  │      │  ajax-loader.gif
    │  │  │      │  
    │  │  │      ├─icons-png
    │  │  │      │      action-black.png
    │  │  │      │      ...
    │  │  │      │      
    │  │  │      └─icons-svg
    │  │  │              action-black.svg
    │  │  │              ...
    │  │  │              
    │  │  ├─fonts
    │  │  │  │  glyphicons-halflings-regular.eot
    │  │  │  │  ...
    │  │  │  │  
    │  │  │  ├─codropsicons
    │  │  │  │      codropsicons.eot
    │  │  │  │      ...
    │  │  │  │      
    │  │  │  └─stroke7pixeden
    │  │  │          stroke7pixeden.eot
    │  │  │          ...
    │  │  │          
    │  │  ├─img
    │  │  │      01.png
    │  │  │      02.png
    │  │  │      ...
    │  │  │      
    │  │  └─js
    │  │      │  crypto-js.js
    │  │      │  ...
    │  │      │  
    │  │      └─images
    │  │          │  ajax-loader.gif
    │  │          │  
    │  │          ├─icons-png
    │  │          │      action-black.png
    │  │          │      ...
    │  │          │      
    │  │          └─icons-svg
    │  │                  action-black.svg
    │  │                  ...
    │  │                  
    │  ├─css //各页面会调用的css
    │  │      404.css
    │  │      ...
    │  │      
    │  ├─fonts //css中引用的字体文件
    │  │  │  glyphicons-halflings-regular.eot
    │  │  │  ...
    │  │  │  
    │  │  ├─codropsicons
    │  │  │      codropsicons.eot
    │  │  │      ...
    │  │  │      
    │  │  └─stroke7pixeden
    │  │          stroke7pixeden.eot
    │  │          ...
    │  │          
    │  ├─html //页面模板
    │  │      404.html
    │  │      ...
    │  │      
    │  ├─img //html或者css中直接引用的图片
    │  │      01.png
    │  │      ...
    │  │      
    │  └─js //各页面js文件、公共js文件、
    │      │  404.js
    │      │  ...
    │      │  
    │      └─js
    │          ├─common
    │          │      cnzz.js
    │          │      ...
    │          │      
    │          ├─component
    │          │      browserCheck.js
    │          │      ...
    │          │      
    │          ├─layer
    │          │  │  layer.js
    │          │  │  
    │          │  ├─mobile
    │          │  │  │  layer.js
    │          │  │  │  
    │          │  │  └─need
    │          │  │          layer.css
    │          │  │          
    │          │  └─skin
    │          │      └─default
    │          │              icon-ext.png
    │          │              ...
    │          │              
    │          └─vendor
    │                  bootstrap.min.js
    │                  ...
    │                  
    ├─config //各环境的配置文件
    │      config.js
    │      ...
    │      
    └─dist //打包后的文件，结构和原生结构保持一致
        │  404.html
        │  ...
        │  
        ├─assets
        │  ├─css
        │  │  │  bootstrap.min.css
        │  │  │  ...
        │  │  │  
        │  │  └─images
        │  │      │  ajax-loader.gif
        │  │      │  
        │  │      ├─icons-png
        │  │      │      action-black.png
        │  │      │      ...
        │  │      │      
        │  │      └─icons-svg
        │  │              action-black.svg
        │  │              ...
        │  │              
        │  ├─fonts
        │  │  │  glyphicons-halflings-regular.eot
        │  │  │  ...
        │  │  │  
        │  │  ├─codropsicons
        │  │  │      codropsicons.eot
        │  │  │      ...
        │  │  │      
        │  │  └─stroke7pixeden
        │  │          stroke7pixeden.eot
        │  │          ...
        │  │          
        │  ├─img
        │  │      01.png
        │  │      ...
        │  │      
        │  └─js
        │      │  crypto-js.js
        │      │  ...
        │      │  
        │      └─images
        │          │  ajax-loader.gif
        │          │  
        │          ├─icons-png
        │          │      action-black.png
        │          │      ...
        │          │      
        │          └─icons-svg
        │                  action-black.svg
        │                  ...
        │                  
        ├─css
        │      2.36ca400fb03279306e7d.css
        │      3.845c11bdafd328f9f1ea.css
        │      ...
        │      
        ├─font
        │      glyphicons-halflings-regular.eot
        │      ...
        │      
        ├─img
        │      06.png
        │      ...
        │      
        └─js
                0.bundle.897eff059527644db601.js
                ...
                activity.bundle.897eff059527644db601.js
                ...

## `可进一步改进的点`
1、可更一步规范路由的形式
2、安全性方面，可从http改为https，并在后台做相应的证书验证
3、可根据不同的角色进行一个组件层面的权限控制

