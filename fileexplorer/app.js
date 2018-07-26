const fileSystem = require('./fileSystem');
const userInterface = require('./userInterace')

function main() {
    const folderPath = fileSystem.getUsersHomeFolder();
    userInterface.bindDocument(window);
    userInterface.loadDirectory(folderPath);  

}
main();
