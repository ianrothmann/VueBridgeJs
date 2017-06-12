import Vue from 'vue';
import Vuex from 'vuex';

const _pageMixin= (typeof pageMixin === 'undefined') ? {} : pageMixin;
const _pageData= (typeof pageData === 'undefined') ? {} : pageData;
const _routeActions=(typeof routeActions === 'undefined') ? {} : routeActions;

export const VueBridgeRoutes = {};

import {Validator} from 'vee-validate';
VueBridgeRoutes.install = function (Vue, options) {
    Vue.prototype.$routeActions = _routeActions;
    Vue.prototype.$routes=Vue.resource('',{},_routeActions);

    Validator.extend('server', {
        getMessage: (field,args,data) => {
            return data.data || 'Something went wrong during validation.';
        },
        validate: (value,args) => {
            const data={};
            data[args[1]]=value;
            return Vue.prototype.$routes[args[0]](data);
        }
    });
};

export let Store = null;


export const VueBridge = {
    VueRoot(vueoptions,vuexoptions){

        if(!vueoptions.hasOwnProperty('mixins')){
            vueoptions['mixins']=[];
        }
        vueoptions['mixins'].push(_pageMixin);

        if(typeof vuexoptions==='undefined'){
            if(!vueoptions.hasOwnProperty('data')){
                vueoptions['data']={
                    server : _pageData
                };
            }else{
                vueoptions['data']['server']=_pageData;
            }
        }else{
            if(vuexoptions.hasOwnProperty('state')){
                vuexoptions['state']['server']=_pageData;
            }else{
                vuexoptions['state']={
                  server : _pageData
                };
            }
            Store=new Vuex.Store(vuexoptions);
            vueoptions['store'] = Store;
        }

        return new Vue(vueoptions);
    }
};