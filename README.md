# music
原生JS响应式音乐简单播放器
## 演示及完整代码链接

链接: [演示链接](https://yujinhongmm.github.io/music/index.html).
链接: [源码链接](https://github.com/yujinhongMM/music).

## 主页面的设计要点
该音乐播放器主要由两大部分组成。
1. **音乐播放模块** 

	1.1 包含音乐图片，音乐标题，音乐作者，以及音乐专辑的展示。
	
	1.2 音乐播放进度条，音量控制，歌曲播放暂停切换以及播放模式。
	
 2. **音乐列表**
 
 	屏幕大于510px的时候直接显示，小于510px时通过音乐列表按钮来控制列表是否显示。
## 设计图
1. **电脑版**
![电脑版](https://img-blog.csdnimg.cn/20190507093823252.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3NDczNjQ1,size_16,color_FFFFFF,t_70)
2. **移动版**
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019050709394733.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3NDczNjQ1,size_16,color_FFFFFF,t_70)
##  实际效果
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019050709420917.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3NDczNjQ1,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190507094714336.png)![在这里插入图片描述](https://img-blog.csdnimg.cn/20190507094247706.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM3NDczNjQ1,size_16,color_FFFFFF,t_70)
## 部分功能详解
#### 利用checkbox实现下拉框
利用 `label`标签的  `"for"`绑定到 `checkbox`复选框，从而实现。
```html
	<!--屏幕小于510px显示-->
        <label id="menu" for="drop">音乐列表</label>
        <!--用于判断音乐列表是否选择-->
        <input type="checkbox" id="drop">
        <!--歌曲列表-->
        <ul id="playlist">  
        </ul>
```
```css
	    #playlist{
	        display: none;    
	    }
		#drop:checked ~ #playlist {
	        display: block;
	    }
	    #playlist{
	        position: fixed;
	        top:60px;
	        left: 4.5%;
	        background: black;
	    }
```
