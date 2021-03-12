import React from 'react';
import ReactDOM from 'react-dom';
import '@/index.css';
import MRoute from './routes/index';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import md5 from 'js-md5';
import { removeCookie } from "./helpers/cookies";

React.Component.prototype.$md5 = md5;
// React.Component.prototype.$CryptoJS = CryptoJS;

axios.defaults.timeout = 1800000;
axios.defaults.withCredentials = true;

// axios.interceptors.request.use(config => {
//
// },error => {
//
// });

var _this = this;

axios.interceptors.response.use(response => {
    // 处理请求200的操作，默认不需要操作，可直接返回 return 返回正确信息调用接口时可以直接promise then 取到正确信息
    return response;
}, error => {
    if (!error.response) {
        console.log('网络超时，或者请求响应不成功，无返回状态')
        return Promise.resolve(error);
    }
    // 处理状态码操作
    switch (error.response.status) {
        case 400:
            console.log('参数错误')
            break;
        case 500:
            removeCookie('alphaguUserType');
            removeCookie('alphaguUserName');
            removeCookie('alphagu_user_id');
            removeCookie('JSESSIONID');
            window.sessionStorage.removeItem('menu');
            window.sessionStorage.removeItem('selectMenu');
            // 跳转
            _this.props.history.push({pathname:'/'});
            console.log('后端错误，一般为空指针异常')
            break;
        default:
            return Promise.reject(error);
    }
    // return error 返回错误
    return error;
})

ReactDOM.render(<MRoute />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
