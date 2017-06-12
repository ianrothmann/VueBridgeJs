# VueBridgeJs
A Bridge to expose Routes and Variables from multipage applications. Currently developed for Laravel to be user in conjuction with the php package LaravelVueBridge (https://github.com/ianrothmann/LaravelVueBridge)

# Installation
```
npm install vuebridge
```
To import the shared laravel routes, use the following plugin:
```
import {VueBridgeRoutes,VueBridge} from 'vuebridge/vuebridge';
Vue.use(VueBridgeRoutes);
```
To start a root vue component, use VueBridge.VueRoot:
```
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
const pageMixin = {
...
};
```

This mixin will automatically be added to the Root Vue instance on page load.


# Routes

Routes will be available as VueResource resources. Components can access:
```
this.$routes.route_name(data).then(...);
```
For more information see VueResource resources.

The route actions may also be accessed through this.$routeActions

# VeeValidate Integration
VueBridge now requries VeeValidate. It automatically installs the `server` validator. You can use it by specifying the route name and the column name to send the value as. 
* Example: `server:{route_resource_name},{column_name}`

```html
<rw-input v-validate="'required|email|server:unique_email,email'" label="Email"></rw-input>
```
On the server side (PHP):
```php
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
