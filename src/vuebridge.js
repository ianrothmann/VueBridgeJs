import Vue from 'vue';
import Vuex from 'vuex';


const _viewMixin= (typeof viewMixin === 'undefined') ? {} : viewMixin;
const _serverData= (typeof serverData === 'undefined') ? {} : serverData;
const _routeActions=(typeof routeActions === 'undefined') ? {} : routeActions;

export const VueBridgeRoutes = {};

import {Validator} from 'vee-validate';
VueBridgeRoutes.install = function (Vue, options) {
    Vue.prototype.$routeActions = _routeActions;
    Vue.prototype.$routes=Vue.resource('',{},_routeActions);
    Vue.prototype.$t = function(code){
        return _serverData.__lang[code];
    };

    Validator.extend('server', {
        getMessage: (field,args,data) => {
            return data.data || data || 'Something went wrong during validation.';
        },
        validate: (value,args) => {
            const data={};
            data[args[1]]=value;
            return Vue.prototype.$routes[args[0]](data).then((response)=>{
                response=response.body;
                response.valid=!!response.valid;
                return response;
            });
        }
    });
};

export let Store = null;


export const VueBridge = {
    VueRoot(vueoptions,vuexoptions){

        if(!vueoptions.hasOwnProperty('mixins')){
            vueoptions['mixins']=[];
        }
        vueoptions['mixins'].push(_viewMixin);

        if(typeof vuexoptions==='undefined'){
            if(!vueoptions.hasOwnProperty('data')){
                vueoptions['data']={
                    server : _serverData
                };
            }else{
                vueoptions['data']['server']=_serverData;
            }
        }else{
            if(vuexoptions.hasOwnProperty('state')){
                vuexoptions['state']['server']=_serverData;
            }else{
                vuexoptions['state']={
                  server : _serverData
                };
            }
            Store=new Vuex.Store(vuexoptions);
            vueoptions['store'] = Store;
        }

        return new Vue(vueoptions);
    }
};
