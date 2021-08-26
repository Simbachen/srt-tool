# srt-tool

讯飞语音识别生成视频字幕文件~

## 使用引导 

### Step 1. 克隆代码，安装依赖
```shell
git clone https://github.com/Simbachen/srt-tool
cd srt-tool
npm install
npm link
```
### Step 2. 注册讯飞开发者账号
https://xfyun.cn/ ,注册好后，创建一个新的APP，将id和key填到配置文件，新开发账户有免费的50个小时~可以开始使用了


```javascript
const config = {
  // 请求地址
  hostUrl: "http://raasr.xfyun.cn/api/",
  // 在控制台-我的应用-语音转写获取
  appId: "xxxxxxx",
  // 在控制台-我的应用-语音转写获取
  secretKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}
```

### Step 3. 进入视频目录，执行命令
```shell
srt-tool -i xxx.mp4
```