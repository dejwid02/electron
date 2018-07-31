const fileSystem = require('./fileSystem');
const userInterface = require('./userInterace')
const search = require('./search')

function main() {
    const folderPath = fileSystem.getUsersHomeFolder();
    userInterface.bindDocument(window);
    userInterface.loadDirectory(folderPath)(window);  
    userInterface.bindSearchField((event)=> {
        const query = event.target.value;
        if (query===''){
            userInterface.resetFilter();
        }
        else {
            search.find(query, userInterface.filterResults)
        }
    })
}
window.onload = main;
