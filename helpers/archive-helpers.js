var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var eol = require('eol');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf8', function (err, content) {
    if(err) {
      //console.log('error', err);
      callback(err);
    } else {
      var urls = eol.split(content);
      console.log('success in readListOfUrls', urls);
      callback(urls);
    }
  });
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function(data){
    if (data.indexOf(url) >= 0) {
      callback(true);
    } else {
      callback(false);
    }
  });
};

exports.addUrlToList = function(url, callback) {
  exports.isUrlInList(url, function(siteExist) {
    if(!siteExist) {
      console.log(url);
      fs.appendFile(exports.paths.list, url, function(err) {
        console.log(err);
        callback(!err);
      });
    } else {
      console.log(url,' already exists in archive!');
    }
  });

};

exports.isUrlArchived = function(url, callback) {
  // console.log('archivedSites path: ',path.join(exports.paths.archivedSites,url));
  fs.access(path.join(exports.paths.archivedSites, url), function(err){
    // console.log(err ? 'no access!' : 'can read/write');
    // console.log('inside isUrlArchived error', err);
    callback(!err);
  });
};

exports.downloadUrls = function(urls) {
};
