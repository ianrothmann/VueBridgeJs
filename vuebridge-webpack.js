'use strict';
const { mix } = require('laravel-mix');
const read_dir_rec = require('fs-readdir-recursive');

function mixViews(pageSrc='resources/assets/js/views/',pageDest='public/js/views/'){
    for(let file of read_dir_rec(pageSrc)){
        if(file.endsWith('.js')){
            if (mix.config.inProduction){
                mix.babel(pageSrc+file,pageDest+file).version();
            }else{
                mix.babel(pageSrc+file,pageDest+file);
            }
        }

    }
}

module.exports.mixViews=mixViews;





