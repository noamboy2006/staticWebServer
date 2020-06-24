const { ipcRenderer } = require('electron')

let url = undefined

document.getElementById('file').addEventListener('change',(e)=>{
  if (e.target.files.length === 0) {
    alert('you can\'t choose an empty folder')
    return
  }
  const fullpath = e.target.files[0].path
  let erase = e.target.files[0].webkitRelativePath.split('/')
  erase.shift()
  erase = erase.join('/')
  url = fullpath.substring(0, fullpath.length - erase.length)
  document.getElementsByTagName('label')[0].innerHTML = 'folder chosen'
})

function create () {
  const port = document.getElementById('port').value
  if(url === undefined) {
    alert('folder is not chosen')
    return
  }
  if(parseInt(port).toString() !== port || parseInt(port) < 1025 || parseInt(port) > 49151) {
    alert('port must be a number between 1025 ~ 49151')
    return
  }
  const data = ipcRenderer.sendSync('create', [port, url])
  if(data === 1) {
    alert('folder is not chosen')
    return
  }
  if(data === 2) {
    alert('port must be a number between 1025 ~ 49151')
    return
  }
  alert('server successfully opened')
  const elem = document.getElementsByClassName('button')[1]
  elem.parentNode.removeChild(elem)
  document.getElementById('container').innerHTML += `server opened at http://localhost:${port}`
}
