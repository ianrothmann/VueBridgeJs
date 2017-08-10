'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.VueBridge = exports.Store = exports.VueBridgeRoutes = undefined;

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _vuex = require('vuex');

var _vuex2 = _interopRequireDefault(_vuex);

var _veeValidate = require('vee-validate');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _viewMixin = typeof viewMixin === 'undefined' ? {} : viewMixin;
var _serverData = typeof serverData === 'undefined' ? {} : serverData;
var _routeActions = typeof routeActions === 'undefined' ? {} : routeActions;

var VueBridgeRoutes = exports.VueBridgeRoutes = {};

VueBridgeRoutes.install = function (Vue, options) {
    Vue.prototype.$routeActions = _routeActions;
    Vue.prototype.$routes = Vue.resource('', {}, _routeActions);

    _veeValidate.Validator.extend('server', {
        getMessage: function getMessage(field, args, data) {
            return data.data || 'Something went wrong during validation.';
        },
        validate: function validate(value, args) {
            var data = {};
            data[args[1]] = value;
            return Vue.prototype.$routes[args[0]](data);
        }
    });
};

var Store = exports.Store = null;

var VueBridge = exports.VueBridge = {
    VueRoot: function VueRoot(vueoptions, vuexoptions) {

        if (!vueoptions.hasOwnProperty('mixins')) {
            vueoptions['mixins'] = [];
        }
        vueoptions['mixins'].push(_viewMixin);

        if (typeof vuexoptions === 'undefined') {
            if (!vueoptions.hasOwnProperty('data')) {
                vueoptions['data'] = {
                    server: _serverData
                };
            } else {
                vueoptions['data']['server'] = _serverData;
            }
        } else {
            if (vuexoptions.hasOwnProperty('state')) {
                vuexoptions['state']['server'] = _serverData;
            } else {
                vuexoptions['state'] = {
                    server: _serverData
                };
            }
            exports.Store = Store = new _vuex2.default.Store(vuexoptions);
            vueoptions['store'] = Store;
        }

        return new _vue2.default(vueoptions);
    }
};