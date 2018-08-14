### IDEA 常用快捷键
####内存优化

因机器本身的配置而配置：
~~~
　　\IntelliJ IDEA 8\bin\idea.exe.vmoptions
　　-----------------------------------------
　　-Xms64m
　　-Xmx256m
　　-XX:MaxPermSize=92m
　　-ea
　　-server
　　-Dsun.awt.keepWorkingSetOnMinimize=true
~~~

#### 显示类快捷键
* ALT+1 快速打开或隐藏工程面板
* ESC 光标返回编辑框
* SHIFT+ESC 光标返回编辑框,关闭无用的窗口
* CTRL+H 显示类结构图
* CTRL+Q 显示注释文档

#### 查询类快捷键
* 双击Shift,在项目的所有目录查找 ★
* Ctrl+E 打开最近使用的文件 ★
* CTRL+N 查找类 ★
* CTRL+SHIFT+N 查找文件
* CTRL+SHIFT+ALT+N 查找类中的方法或变量
* CIRL+B 找变量的来源
* CTRL+ALT+B 找所有的子类
* CTRL+SHIFT+B 找变量的类
* CTRL+G 定位行
* CTRL+F 在当前窗口查找文本
* CTRL+SHIFT+F 在指定窗口查找文本
* CTRL+R 在 当前窗口替换文本
* CTRL+SHIFT+R 在指定窗口替换文本
* ALT+SHIFT+C 查找修改的文件
* CTRL+E 最近打开的文件
* F3 向下查找关键字出现位置
* SHIFT+F3 向上一个关键字出现位置
* F4 查找变量来源  ★
* Alt +F7 可以帮你找到你的函数或者变量或者类的所有引用到的地方 ★
* CTRL+ALT+F7 选中的字符查找工程出现的地方 ★
* CTRL+SHIFT+O 弹出显示查找内容

#### 自动代码
* ALT+回车 导入包,自动修正 ★
* CTRL+ALT+L 格式化代码 
* CTRL+ALT+I 自动缩进
* CTRL+ALT+O 优化导入的类和包
* ALT+INSERT 生成代码(如GET,SET方法,构造函数等)
* CTRL+E 最近更改的代码 
* CTRL+SHIFT+SPACE 自动补全代码★★
* CTRL+空格 代码提示
* CTRL+ALT+SPACE 类名或接口名提示
* CTRL+P 方法参数提示  ★★★★
* CTRL+J 自动代码
* CTRL+ALT+T 把选中的代码放在 TRY{} IF{} ELSE{} 里 ★★★

#### 复制快捷方式
* CTRL+D 复制当前行到下一行 ★
* CTRL+X 剪切,删除行

#### 编辑与重构快捷方式
* Ctrl +Alt +T ，把选中的代码放在 TRY{} IF{} ELSE{} 里,很实用 ★★★
* Shift +Enter 另起一行 ★
* Ctrl + R 当前文件替换特定内容  ★
* Shift + Ctrl + R 当前项目替换特定内容
* CIRL+U 大小写切换
* CTRL+Z 倒退
* CTRL+SHIFT+Z 向前
* CTRL+ALT+F12 资源管理器打开文件夹
* ALT+F1 查找文件所在目录位置
* SHIFT+ALT+INSERT 竖编辑模式
* CTRL+/ 注释//
* CTRL+SHIFT+/ 注释/*...*/
* CTRL+W 选中代码，连续按会有其他效果
* CTRL+B 快速打开光标处的类或方法
* ALT+ ←/→ 切换代码视图
* CTRL+ALT ←/→ 返回上次编辑的位置★★ （需要先禁用屏幕翻转快捷键：桌面右击->图形选项->快捷键->禁用）
* ALT+ ↑/↓ 在方法间快速移动定位
* SHIFT+F6 重构-重命名  ★
* Ctrl+Shift+Space，自动补全代码   ★
* Ctrl+空格，代码提示  ★
* CTRL+SHIFT+UP/DOWN 代码向上/下移动。
* CTRL+UP/DOWN 光标跳转到第一行或最后一行下
* ALT + Insert 在类中各种生成器，在目录上新建各种文件  ★★★★★
* Ctrl + Alt + L 格式化代码


#### 参考
* [IntelliJ IDEA 快捷键和设置](http://www.cnblogs.com/bluestorm/archive/2013/05/20/3087889.html)
* [IntelliJ IDEA 使用心得与常用快捷键](http://www.blogjava.net/rockblue1988/archive/2014/10/24/418994.html)
* [Intellij IDEA 快捷键大全](http://www.open-open.com/lib/view/open1396578860887.html)
* [十大Intellij IDEA快捷键](http://blog.csdn.net/dc_726/article/details/42784275)
