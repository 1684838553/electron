const btn = document.getElementById('btn')

btn.onclick = function () {
    // 通过指定位置或用 * 来代替没有明确位置来向父窗口发送信息.
    window.opener.postMessage('我是来自子窗口的信息', '*')
}
