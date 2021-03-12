const CryptoJS = require('crypto-js');
import { JSEncrypt } from 'jsencrypt';

export default {
    // 参数链接
    joinSearchParam(param) {
        let string=  '';
        if(param.length > 1){
            param.forEach(function(item,index){
                if(index === 0 && (item.value || item.value === 0 || item.value === '') ){
                    string = '?'+item.name+'='+encodeURIComponent(item.value);
                }else if(!string && (item.value || item.value === 0 || item.value === '')){
                    string = '?'+item.name+'='+encodeURIComponent(item.value);
                }
                else  if(item.value || item.value === 0 || item.value === ''){
                    string += '&'+item.name+'='+encodeURIComponent(item.value);
                }
            })
        }else if(param.length === 1 ){
            string = '?'+param[0].name+'='+encodeURIComponent(param[0].value);
        }
        return string;
    },
    // 2019-08-08T03:01:50.000+0000 -> 2019-08-08 11:01:50
    formatTime(time) {
        let newTime = new Date(+new Date(time)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
        return newTime;
    },
    // 时间戳转化成 yyyy-MM-dd hh:mm:ss
    timestampToTime(timestamp) {
        let date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        let D = date.getDate() + ' ';
        let h = date.getHours() + ':';
        let m = date.getMinutes() + ':';
        let s = date.getSeconds();
        return Y+M+D+h+m+s;
    },
    //用户注册登录分析模块
    unixToDate(unixTime, isFull, timeZone) {
        if (typeof (timeZone) === 'number') {
            unixTime = parseInt(unixTime, 10) + parseInt(timeZone, 10) * 60 * 60;
        }
        var time = new Date(unixTime);
        var ymdhis = '';
        var year = time.getFullYear();
        var month = time.getMonth() + 1;
        var date = time.getDate();
        var hours = time.getHours();
        var minutes = time.getMinutes();
        var seconds = time.getSeconds();

        month = month < 10 ? '0' + month : month;
        date = date < 10 ? '0' + date : date;
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        ymdhis += year + '-' + month + '-' + date;
        if (isFull === true) {
            ymdhis += ' ' + hours + ':' + minutes + ':' + seconds;
        }
        return ymdhis;
    },
    // CryptoJS前端加密
    encryptByDES(message, key) {
        var keyHex = CryptoJS.enc.Utf8.parse(key);
        var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
            mode : CryptoJS.mode.ECB,
            padding : CryptoJS.pad.Pkcs7
        });
        return encrypted.toString();
    },

    jsencryptEncryptPassword(pwd){
        var key = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDy1lZkYDSs14bYCsdzMFP1SN4d' +
        'c74/65e8beYqmve8PwF08yMa2Xs789Ineh571Pt++WwtxPOXZsnwEP4ObYLQdVcL' +
        'UgBVXoJehNRzdxJ3P8bdn3lh3O3PDfvr6JRcK2/9XKNFXZkkuJxHCWnH0ZhoBpsZ' +
        'I/+NhVXcYEXSjKWAnQIDAQAB';
        var encrypt = new JSEncrypt();
        encrypt.setPublicKey(key);
        return encrypt.encrypt(pwd)
    }
}
