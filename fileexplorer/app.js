const fileSystem = require('./fileSystem');
const userInterface = require('./userInterace')

function main() {
    const folderPath = fileSystem.getUsersHomeFolder();
    userInterface.bindDocument(window);
    fileSystem.getFilesInFolder(folderPath, (err, files) => {
        if (err) {
            return alert ('Sorry we could not load home folder')
        }
        fileSystem.inspectAndDescribeFiles(folderPath, files, userInterface.displayFiles)
    });
   

}
main();