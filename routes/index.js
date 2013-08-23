var fs = require('fs')
  , dirPhotos = './public/photos/';

/*
 * GET home page.
 */

exports.latest = function(req, res) {
  fs.readdir(dirPhotos, function readDirCallback(err, files) {
    if (err) {
      console.error('Error:', err);
      res.send('400 - cant open photos directory');
    }
    files = sortFiles(files);
    res.render('index', { title: 'garden', latest: files[0] });
  });
};

/*
 * GET archive
 */

exports.archive = function(req, res) {
  fs.readdir('./public/photos/', function readDirCallback(err, files) {
    if (err) {
      console.error('Error:', err);
      res.send('400 - cant open photos directory');
    }
    files = sortFiles(files);
    res.render('archive', { title: 'garden archive', files: files });
  });
};

exports.view = function(req, res) {
  fs.exists('./public/photos/' + req.params.file, function fileExistsCallback(exists) {
    res.render('view', { title: 'viewing ' + req.params.file, file: req.params.file, exists: exists });
  });
};

var sortFiles = function(files) {
 return files.map(function(name) {
   return {
    name: name
  , time: fs.statSync(dirPhotos + name).ctime.getTime()
  };
 })
 .sort(function(a, b) { return b.time - a.time; }) // descending
 .map(function(file) { return file.name});
};
