var path = require('path')
var fs = require("fs")
var crypto = require('crypto');

var files = [],
  dirs = [];

console.log(__dirname);
var root = path.join(__dirname)
root = root + '/' + 'docs'
var base = '/docs';
readDir(path.join(root), base)
setTimeout(function () {
  console.log(files.length);
  console.log('\n\n');
  console.log();
  var content = "['" + files.join('\',\n\'') + "']";
  fs.writeFile(root + '/../.vuepress/articles.lst', content, {
    flag: "w"
  }, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
}, 30000)
//for()

function readDir(path, base) {

  fs.readdir(path, function (err, ctx) {
    if (!ctx) {
      return;
    }
    // console.log('in readdir' + base); good
    ctx.forEach(function (ele) {
      //console.log('in foreach' + base); good
      fs.stat(path + "/" + ele, function (err, info) {
        if (info.isDirectory()) {
          //console.log('dir:' + ele)
          readDir(path + '/' + ele, base + '/' + ele)
        } else {
          //console.log('file:' + base + '/' + ele.substring(0, ele.length))
          if (ele.endsWith('.md')) {
            if (/.*[\u4e00-\u9fa5]+.*$/.test(ele)) {
              console.log('got one:   ' + ele)
              var kv = '[\'' + base + '/' + genMd5Hash(ele.substring(0, ele.length - 3)) + '\',\'' + ele.substring(0, ele.length - 3) + '\']'
              files.push(kv);
              //copyFile(ele);
            } else {
              files.push(base + '/' + ele.substring(0, ele.length - 3))
            }
          }
        }
      }) // end stat func

    }) //end foreach

  }) //end reaDir

  console.log(files.length);
}

function genMd5Hash(str) {
  var md5sum = crypto.createHash('md5');
  md5sum.update(str);
  str = md5sum.digest('hex');
  return str;
};
