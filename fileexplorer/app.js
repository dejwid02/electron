'use strict';

const osenv = require('osenv');
const fs = require('fs');
const async = require('async');
const path = require('path')

function getUsersHomeFolder(){
    return osenv.home();
}

function getFilesInFolder(folderPath, cb) {
    return fs.readdir(folderPath, cb)
}

function inspectAndDescribeFile(filePath, cb) {
    let result = {
        file: path.basename(filePath),
        path: filePath,
        type: ''
    };

    fs.stat(filePath, (err, stat) => {
        if (err) {
            cb(err);
        } else {
            if (stat.isFile()) {
                result.type = 'file';
            }
            if (stat.isDirectory()) {
                result.type = 'directory';
            }
            cb(err, result)
        }

    })
}

function inspectAndDescribeFiles(folderPath, files, cb){
    async.map(files, (file, asyncCb) => {
        let resolvedPath = path.resolve(folderPath, file);
        inspectAndDescribeFile(resolvedPath, asyncCb);
    }, cb);
}

function displayFile(file) {
    const mainArea = document.getElementById("main-area");
    const template = document.querySelector('#item-template');
    let clone = document.importNode(template.content, true);
    clone.querySelector('img').src = `images/${file.type}.svg`;
    clone.querySelector('.fileName').innerText = file.file;
    mainArea.appendChild (clone);

}
function displayFiles(err, files) {
    if (err) {
        return alert('Sorry, we could not display files');
    }

    files.forEach((file) => {displayFile(file)});
}
function main() {
    const folderPath = getUsersHomeFolder();
    getFilesInFolder(folderPath, (err, files) => {
        if (err) {
            return alert ('Sorry we could not load home folder')
        }
        inspectAndDescribeFiles(folderPath, files, displayFiles)
    });
   

}
main();