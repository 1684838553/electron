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
                        width: 900,
                        height: 600,
                        webPreferences: {
                            nodeIntegration: true
                        }
                    })

                    // 显示窗口控制台
                    win.webContents.openDevTools()
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
