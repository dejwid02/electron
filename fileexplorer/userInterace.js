'use strict';
let document;
const fileSystem = require('./fileSystem');
const search = require('./search');

function displayFolderPath(folderPath){
    document.getElementById('current-folder').innerText=folderPath;
}

function loadDirectory(folderPath) {
    return function(window) {
        if (!document){document = window.document }
        search.resetIndex();
        displayFolderPath(folderPath);
        fileSystem.getFilesInFolder(folderPath, (err, files) => {
            clearView();
            if (err) {
            return alert('Sorry we could not load home folder');
        }
        fileSystem.inspectAndDescribeFiles(folderPath, files, userInterface.displayFiles);
    });
}
}
function clearView(){
    const mainArea = document.getElementById('main-area');
    let firstChild = mainArea.firstChild;
    while(firstChild) {
        mainArea.removeChild(firstChild);
        firstChild = mainArea.firstChild;
    }
}


function displayFile(file) {
    const mainArea = document.getElementById("main-area");
    const template = document.querySelector('#item-template');
    search.addToIndex(file);
    let clone = document.importNode(template.content, true);
    clone.querySelector('img').src = `images/${file.type}.svg`;
    clone.querySelector('img').setAttribute('data-filePath', file.path);
    if(file.type === 'directory'){
        clone.querySelector('img')
        .addEventListener('dblclick', () => { loadDirectory(file.path)(); }, false);
    }
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

function bindSearchField(cb) {
    document.getElementById('search').addEventListener('keyup', cb, false)
}

function filterResults(results) {
    const validFilePaths = results.map((result)=> { return result.ref;});

    const items = document.getElementsByClassName('item');

    for(let i=0; i<items.length; i++){
        let item = items[i];
        let filePath = item.getElementByTagName('img')[0].getAttribute(data-filePath);
        if (validFilePaths.indexOf(filePath)!==-1){
            item.style = null;
        }
        else {item.style = 'display: none;'}
    }
}

function resetFilter() {
   
    const items = document.getElementsByClassName('item');

    for(let i=0; i<items.length; i++){
        let item = items[i];
        item.style = null;
    }
}

module.exports = {bindDocument, displayFiles, loadDirectory, bindSearchField, filterResults, resetFilter}