'use strict';
const  mix  = require('laravel-mix');
const read_dir_rec = require('fs-readdir-recursive');

function mixViews(pageSrc='resources/js/views/',pageDest='public/js/views/'){
    for(let file of read_dir_rec(pageSrc)){
        if(file.endsWith('.js')){
            if (mix.inProduction){
                mix.babel(pageSrc+file,pageDest+file).version();
            }else{
                mix.babel(pageSrc+file,pageDest+file);
            }
        }

    }
}

module.exports.mixViews=mixViews;





