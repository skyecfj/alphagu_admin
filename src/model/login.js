import ajaxHandle from './utils';
import ip from './tempIp';

export default {
    Login: (param, resolve, reject) => {
        ajaxHandle.ajaxPost(ip.master_ip + 'user/login' + param).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject && reject(err);
        })
    },
    Logout: (resolve, reject) => {
        ajaxHandle.ajaxPost(ip.master_ip + 'user/logout').then(res => {
            resolve(res.data)
        }).catch(err => {
            reject && reject(err);
        })
    }
}