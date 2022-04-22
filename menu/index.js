const { app, BrowserWindow } = require('electron')
require('./menu.js')

app.on('ready', function () {
    // 创建窗口
    let win = new BrowserWindow({
        width: 1100,
        height: 700,
        // minWidth,minHeight,maxWidth,maxHeight
        // x,y 窗口显示位置坐标
        webPreferences: {
            //  完整支持node 在html中引入node模块，不报错
            nodeIntegration: true
        }
    })
    // // 显示窗口控制台
    // win.webContents.openDevTools()
    win.loadFile('index.html')

    // 关闭窗口，释放内存
    win.on('close', () => {
        win = null
    })
})
