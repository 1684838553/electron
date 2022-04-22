/** -----------父子组件通信--------------- */
const btn = document.getElementById('btn')

btn.onclick = function () {
    window.open('child.html')
}

const msgDiv = document.getElementById('msg')
window.addEventListener('message', msg => {
    console.log(msg)
    msgDiv.innerHTML = msg.data
})


/** ----------clipboard-------------- */
const { clipboard } = require('electron')

const btns = document.querySelectorAll('button')
const divs = document.querySelectorAll('div')

btns[1].onclick = function () {
    let text = divs[1].innerText
    console.log(text)
    clipboard.writeText(text)
    alert(clipboard.readText())
}

btns[2].onclick = function () {
    divs[2].innerText = clipboard.readText()
    alert('粘贴成功')
}


/** ----------右键菜单-------------- */

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
