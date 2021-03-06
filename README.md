# VueBridgeJs
A Bridge to expose Routes and Variables from multipage applications. Currently developed for Laravel to be user in conjuction with the php package LaravelVueBridge (https://github.com/ianrothmann/LaravelVueBridge)

# Installation
```
npm install vuebridge --save-dev
```
To import the shared laravel routes, use the following plugin:
```javascript
import {VueBridgeRoutes,VueBridge} from 'vuebridge/vuebridge';
Vue.use(VueBridgeRoutes);
```
To start a root vue component, use VueBridge.VueRoot:
```javascript
const App = VueBridge.VueRoot({
    store,
    el: '#app',
    data : {

    },
    mounted(){
      

    },
    methods: {

    }
});
```

# Root App Page mixins

Create a mixin on any page page:
```
const viewMixin = {
...
};
```

This mixin will automatically be added to the Root Vue instance on page load.

# Laravel Mix
If it is being used with Laravel, you can use the mix plugin to automatically push your view mixins through the laravel mix pipeline for transpilation etc.

In `webpack.mix.js`,

```javascript
const vueBridge = require('VueBridgeJs/vuebridge-webpack');
vueBridge.mixViews(src,dest);
```

By default src is located in `resources/assets/js/views/` and dest `public/js/views/`.

More information on view mixins can be found in the LaravelVueBridge component's readme.

# Routes

Routes will be available as VueResource resources. Components can access:
```javascript
this.$routes.route_name(data).then(...);
```
For more information see VueResource resource documentation here: https://github.com/pagekit/vue-resource/blob/develop/docs/resource.md

The route actions may also be accessed through this.$routeActions

# VeeValidate Integration
VueBridge now requries VeeValidate. It automatically installs the `server` validator. You can use it by specifying the route name and the column name to send the value as. 
* Example: `server:{route_resource_name},{column_name}`

```html
<rw-input v-validate="'required|email|server:unique_email,email'" label="Email"></rw-input>
```
On the server side (Laravel):
```php
 web.php
 Route::get('/examples/rocketforms/unique_email/{code}', 'Examples\ExampleController@unique_email')->name('unique_email');
 
 Controller:
 public function unique_email($code){
      return ['valid'=>false,'data'=>'The field is invalid. I am the server. You sent: '.$code];
 }
```
You have to return an array with `valid`=>true/false and the message in `data`.


# Exposed Variables

If a Vuex store is used, exposed variables could be accessed through 
```
$store.state.server.variable_name
```
If Vuex is not used, it will be available in the Root Vue component as this.server.
