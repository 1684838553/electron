## 1、安装electron

[安装使用electron](https://www.cnblogs.com/sunshine-blog/p/9915222.html)

[electron中文教程](https://weishuai.gitbooks.io/electron-/content/)

## 2、electron 相关 api

### 1. 创建一个窗体

[BrowserWindow](https://weishuai.gitbooks.io/electron-/content/api/browser-window.html)

```javascript
const { app, BrowserWindow } = require('electron')
require('./menu.js')

app.on('ready', function () {
    // 创建窗口
    let win = new BrowserWindow({
        width: 800,
        height: 600
    })

    // 显示窗口控制台
    win.webContents.openDevTools()
    win.loadFile('index.html')

    // 关闭窗口，释放内存
    win.on('close', () => {
        win = null
    })
})
```

### 2. 替换系统默认主菜单

**注意：替换主菜单后，系统菜单的一些功能不能使用，例如不能打开控制台**

```javascript
const { Menu, BrowserWindow } = require('electron');

const template = [
    {
        label: '主菜单1',
        submenu: [
            { label: '主菜单1.1' },
            { label: '主菜单1.2' },
            { label: '主菜单1.3' },
            { label: '主菜单1.4' },
        ]
    },
    {
        label: '主菜单2',
        submenu: [
            {
                label: '主菜单2.1',
                // 添加一个快捷键
                accelerator: 'ctrl+n',
                // 添加单击事件
                click: () => {
                    let win = new BrowserWindow({
                        width: 300,
                        height: 400
                    })
                    win.loadFile('index2.html')

                    // 关闭窗口，释放内存
                    win.on('close', () => {
                        win = null
                    })
                }
            },
            { label: '主菜单2.2' },
            { label: '主菜单2.3' },
            { label: '主菜单2.4' },
        ]
    }
]

const myMenu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(myMenu)
```

### 3. 父子通信

```javascript
// 父组件
window.addEventListener('message', msg => {
    console.log(msg)
    msgDiv.innerHTML = msg.data
})


// 子组件
const btn = document.getElementById('btn')

btn.onclick = function () {
    // 通过指定位置或用 * 来代替没有明确位置来向父窗口发送信息.
    window.opener.postMessage('我是来自子窗口的信息', '*')
}
```

### 4. remote


```javascript
// 在主进程中
const { app, BrowserWindow } = require('electron')

app.on('ready', function () {
    // 创建窗口
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences:{
            // 配置，可以使用remote
            enableRemoteModule:true
        }
    })

    // 显示窗口控制台
    win.webContents.openDevTools()
    win.loadFile('index.html')

    // 关闭窗口，释放内存
    win.on('close', () => {
        win = null
    })
})


// 在子进程（渲染进程）中
const BrowserWindow  = require('electron').remote.BrowserWindow
```

### 5. clipboard

```javascript
const { clipboard } = require('electron')

const btns = document.querySelectorAll('button')
const divs = document.querySelectorAll('div')

btns[1].onclick = function () {
    let text = divs[1].innerText
    console.log(text)
    clipboard.writeText(text)
    alert('复制成功')
}

btns[2].onclick = function () {
    divs[2].innerText = clipboard.readText()
    alert('粘贴成功')
}
```

### 6. contextmenu 右键单击事件

```javascript
const { remote } = require('electron')
const rightMenuTemplate = [
    {
        label: '复制'
    }, {
        label: '粘贴'
    }
]
const menu = remote.Menu.buileFromTemplate(rightMenuTemplate)
// contextmenu 右键单击事件
window.addEventListener('contextmenu', e => {
    // 阻止原生右键菜单
    e.preventDefault()
    menu.popup({
        window: remote.getCurrentWindow()
    })
})
```
