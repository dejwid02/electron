'use strict';
let document;
const fileSystem = require('./fileSystem');

function displayFolder(folderPath){
    document.getElementById('current-folder').innerText=folderPath;
}

function loadDirectory(folderPath) {
    fileSystem.getFilesInFolder(folderPath, (err, files) => {
        if (err) {
            return alert('Sorry we could not load home folder');
        }
        fileSystem.inspectAndDescribeFiles(folderPath, files, userInterface.displayFiles);
    });
}
function clearView(){
    const mainArea = document.getElementById('main-area');
    let firstChild = mainArea.firstChild();
    while(firstChild) {
        mainArea.removeChild(firstChild);
        firstChild = mainArea.firstChild;
    }
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

function bindDocument(window) {
    if (!document) {
        document=window.document
    }

}

module.exports = {bindDocument, displayFiles}