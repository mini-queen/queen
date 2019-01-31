# wxmpMaterialShop

> a mini project for queen

## 技术栈
- [x] 框架 -- mpvue
- [x] 样式 -- less
- [x] js -- ES6/7
- [x] 接口请求 -- flyio
- [x] 状态管理 -- vuex
- [x] 语法检查 -- eslint

## 目录结构介绍 ##
	|-- build                            // webpack配置文件
	|-- config                           // 项目打包路径
	|-- src                              // 源码目录
	|   |-- components                   // 公共组件
	|   |-- pages                        // 相关页面
	|   |-- store                        // 状态管理
	|   |-- styles                       // 公共样式
	|   |-- utils                        // 工具文件
	|   |-- App.vue                      // 页面入口文件
	|   |-- main.js                      // 程序入口文件，加载各种公共组件
	|-- static                           // 静态资源文件
	|-- .babelrc                         // ES6语法编译配置
	|-- .editorconfig                    // 代码编写规格
	|-- .eslintignore                    // eslint忽略文件配置
	|-- .eslintrc.js                     // eslint配置文件
	|-- .gitignore                       // git忽略的文件
	|-- .postcssrc.js                    // post-loader的插件配置文件
	|-- index.html                       // 入口html文件
	|-- package.json                     // 项目及工具的依赖配置文件
	|-- package-lock.json                // 项目及工具的固定依赖配置
	|-- project.config.json              // 小程序相关的项目配置
	|-- README.md                        // 说明文档

## 项目运行

``` bash
# 安装依赖
npm install

# 编译代码
npm run dev

# 在微信开发者工具打开上一步编译好的dist文件

```
数据字典：
	输入页面
		学位课程要求： requireId   0/1/2 (分别对应label: 雅思总分6.5，且各单项不低于5.5;雅思总分6.0，且各单项不低于5.5;雅思总分6.5，且各单项不低于6.0)
		雅思总分： totalScore
		听力： listeningScore
		阅读： readingScore
		写作： writingScore
		口语： speakingScore
		是否已经向大学提交本科学位证xxxx: isSubmit

	结果页面
		课程时长（周）：  period
		申请截止日期： applyDeadline
		确认截止日期：sureDeadline
		最晚抵校日期：arrivalDate
		课程日期：courseDate
		学费：fee
		
	
任务：
	  接口 云开发 授权 整理删文件