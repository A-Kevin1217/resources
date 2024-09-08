# MuMuManager常用命令
查看/连接模拟器adb端口
```
MuMuManager.exe adb -v [模拟器序号]  //查询指定模拟器adb端口
MuMuManager.exe adb -v [模拟器序号] connect  //连接指定模拟器adb端口
MuMuManager.exe adb -v [模拟器序号] shell  //进入指定模拟器adb shell
```
启动/关闭模拟器
```
MuMuManager.exe api -v [模拟器序号] launch_player  //启动模拟器
MuMuManager.exe api -v [模拟器序号] shutdown_player  //关闭模拟器
MuMuManager.exe api -v [模拟器序号] player_state  //获取模拟器状态 
```
app安装/卸载/启动/关闭
```
MuMuManager.exe api -v [模拟器序号] install_apk [path]  //安装本地apk，带文件路径参数
MuMuManager.exe api -v [模拟器序号] uninstall_app [package]  //卸载app，带包名
MuMuManager.exe api -v [模拟器序号] launch_app [package]  //启动app，带包名
MuMuManager.exe api -v [模拟器序号] close_app [package]  //关闭app，带包名
MuMuManager.exe api -v [模拟器序号] app_state [package]  //获取app运行状态，带包名
```
模拟器显示
```
MuMuManager.exe api -v [模拟器序号] show_player_window  //显示指定模拟器窗口（顶部）
MuMuManager.exe api -v [模拟器序号] hide_player_window  //隐藏指定模拟器窗口（无任务栏）
```
直接调用查看支持的命令
```
MuMuManager.exe
```
# MuMu模拟器12adb相关
连接adb
```
adb.exe connect 127.0.0.1:XXXXX // XXXXX为模拟器端口号
adb.exe shell
```
所有应用包名列表
```
adb shell pm list packages
```
第三方应用包名列表
```
adb shell pm list packages -3
```
系统应用包名列表
```
adb shell pm list packages -s
```
正在运行应用包名
```
adb shell dumpsys window | findstr mCurrentFocus
```
查看应用版本号
```
adb shell dumpsys package 应用包名 | findstr version
```
按键输入
```
adb shell input keyevent 键值
```
如：adb shell input keyevent 3表示按下HOME键，其他键值对应键位可网上搜索
字符输入
```
adb shell input text 字符
```
如：adb shell input text test则表示输入了test字符串 ps：字符不支持中文

鼠标点击
```
adb shell input tap X Y
```
X Y分别为当前屏幕下的x和y轴坐标值

鼠标滑动
```
adb shell input swipe X1 Y1 X2 Y2
```
X1 Y1 和X2 Y2分别为滑动起始点的坐标

从电脑上传文件至模拟器
```
adb push C:\test.apk /data
```
从模拟器复制文件至电脑
```
adb pull /data/test.apk C:\
```
将模拟器当前显示截图
```
adb shell screencap /data/screen.png
```
将截图文件下载至电脑
```
adb pull /data/screen.png C:\（非根目录下，例如C:\Users\Downloads\）
```
开始录制
```
adb shell screenrecord /data/test.mp4
```
结束录制
可按CTRL+C结束录制

导出视频文件
```
adb pull /data/test.mp4 C:\（非根目录下，例如C:\Users\Downloads\）
```