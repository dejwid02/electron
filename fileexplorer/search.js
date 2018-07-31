'use strict';

const lunr = require('lunr');
let index;
function resetIndex(){
index = lunr(function() {
    this.field('type');
    this.field('file');
    this.ref('path');
})
}

function addToIndex(file){
    if (!index) {
        resetIndex();
    }
    index.add(file);
}

function find(query, cb){
    if (!index) {
        resetIndex();
    }

    const results = index.search(query);
    cb(results);
}

module.exports = {addToIndex, find, resetIndex};
