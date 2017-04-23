import Vue from 'vue';
import Vuex from 'vuex';

const _pageMixin= (typeof pageMixin === 'undefined') ? {} : pageMixin;
const _pageData= (typeof pageData === 'undefined') ? {} : pageData;
const _routeActions=(typeof routeActions === 'undefined') ? {} : routeActions;

export const VueBridgeRoutes = {};

VueBridgeRoutes.install = function (Vue, options) {
    Vue.prototype.$routeActions = _routeActions;
    Vue.prototype.$routes=Vue.resource('',{},_routeActions);
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