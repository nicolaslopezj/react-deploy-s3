import fs from 'fs'

const getFilesInDir = function (dir) {
  var results = []
  var list = fs.readdirSync(dir)
  list.forEach(function (file) {
    file = dir + '/' + file
    var stat = fs.statSync(file)
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesInDir(file))
    } else {
      if (!file.includes('.DS_Store')) {
        results.push(file)
      }
    }
  })
  return results
}

export default function () {
  const files = getFilesInDir('build')
  return files
}
