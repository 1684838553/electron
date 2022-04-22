const fs = require('fs')
const path = require('path')

function readFile() {
    fs.readFile(path.join(__dirname, 'text.txt'), (err, data) => {
        document.getElementById('showText').innerHTML = data
    })
}

function writeFile() {
    fs.writeFile(path.join(__dirname, 'text.txt'), '这是新写入文件的内容~~~', 'utf8', err => {
        console.log(err)
    })
}
