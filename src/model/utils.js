import axios from 'axios';

const ajaxHandle = () => {
    const ajaxGet = (url,param,type,test) => {
        return new Promise((resolve,reject) => {
            //arraybuffer:处理文件流
            axios.get(url,{data:param&&JSON.stringify(param),responseType: test?'arraybuffer':'json',headers:{LOADINGFLAG:type?'FALSE':'TRUE'}}).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        })
    };
    const ajaxPost = (url,param,headers,type) => {
        return new Promise ((resolve,reject) => {
            axios.post(url,headers ? param : param && JSON.stringify(param),{
                headers: {
                    "Content-Type": headers?headers:"application/json; charset=utf-8",
                    LOADINGFLAG:type?'FALSE':'TRUE'
                }
            }).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        })
    };
    const ajaxDelete = (url,param) => {
        return new Promise ((resolve,reject) => {
            axios.delete(url,{data:param},{
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        })
    };
    const ajaxPut = (url,param,type) => {
        return new Promise ((resolve,reject) => {
            axios.put(url,param && JSON.stringify(param),{
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    LOADINGFLAG:type?'FALSE':'TRUE'
                }
            }).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        })
    };
    const ajaxPatch = (url,param) => {
        return new Promise ((resolve,reject) => {
            axios.patch(url,param && JSON.stringify(param),{
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        })
    };
    //处理流文件
    const ajaxPostFile = (url,param,appType) => {
        return new Promise ((resolve,reject) => {
            axios.post(url,param && JSON.stringify(param),{
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                responseType: 'arraybuffer'
            }).then(res => {
                var resBlobObj = new Blob([res.data]);
                var resReader = new FileReader();
                resReader.readAsText(resBlobObj, 'utf-8');
                resReader.onload = function(){
                    var resContentType = res.headers['content-type'].split(';')[0];
                    var resJson, objectUrl;
                    if(resContentType !== appType){
                        resJson = JSON.parse(this.result);
                    }else{
                        resJson = ''
                    }
                    if(!resJson.code){
                        let blob = new Blob([res.data],{type:appType});
                        objectUrl = URL.createObjectURL(blob);
                    }else{
                        objectUrl = resJson;
                    }
                    resolve({result : objectUrl,headers : res.headers});
                };
            }).catch(err => {
                reject(err);
            })
        })
    };
    return {
        ajaxGet,
        ajaxPost,
        ajaxDelete,
        ajaxPut,
        ajaxPatch,
        ajaxPostFile
    }
};
const test = ajaxHandle();
export default test;
