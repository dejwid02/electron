'use strict';
let document;
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