import Vue from 'vue';

const _pageMixin= (typeof pageMixin === 'undefined') ? {} : pageMixin;
const _pageData= (typeof pageData === 'undefined') ? {} : pageData;
const _routeActions=(typeof routeActions === 'undefined') ? {} : routeActions;

export const VueBridgeRoutes = {};



VueBridgeRoutes.install = function (Vue, options) {
    Vue.prototype.$routeActions = _routeActions;
    Vue.prototype.$routes=Vue.resource('',{},_routeActions);

};

export const VueBridge = {
    VueRoot(options){
        if(!options.hasOwnProperty('mixins')){
            options['mixins']=[];
        }
        options['mixins'].push(_pageMixin);

        if(!options.hasOwnProperty('store')){
            if(!options.hasOwnProperty('data')){
                options['data']={
                    server : _pageData
                };
            }else{
                options['data']['server']=_pageData;
            }
        }

        const instance = new Vue(options);

        if(instance.$store) {
            instance.$store.state['server'] = _pageData;
        }

        return instance;
  }
};
