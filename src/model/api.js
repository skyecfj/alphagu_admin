import ajaxHandle from './utils';
import ip from './tempIp';

export default {
    // 数据导入接口
    getModelList: (resolve, reject) => {
        ajaxHandle.ajaxGet(ip.master_ip + 'data/model/list?' + Math.random()).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject && reject(err)
        })
    },
    // 管理员管理
    getUserList: (param, resolve, reject) => {
        ajaxHandle.ajaxGet(ip.master_ip + 'user/all' + param).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject && reject(err);
        })
    },
    userAdd: (param, resolve, reject) => {
        ajaxHandle.ajaxPost(ip.master_ip + 'user/add', param).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject && reject(err);
        })
    },
    deleteUser: (param, resolve, reject) => {
        ajaxHandle.ajaxDelete(ip.master_ip + 'user/delete?userId=' + param).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject && reject(err);
        })
    },
    updateUserInformation: (param, resolve, reject) => {
        ajaxHandle.ajaxPut(ip.master_ip + 'user/updateUserInformation', param).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject && reject(err);
        })
    },
    resetPwd: (param, resolve, reject) => {
        ajaxHandle.ajaxPut(ip.master_ip + 'user/resetpwd?userId=' + param).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject && reject(err);
        })
    },
    updatePwd: (param, resolve, reject) => {
        ajaxHandle.ajaxPut(ip.master_ip + 'user/password' + param).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject && reject(err);
        })
    },
    // APP用户详情
    getInviteCodeInfoById: (param, resolve, reject) => {
        ajaxHandle.ajaxGet(ip.master_ip + 'user/getInviteCodeInfoById' + param).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject && reject(err);
        })
    },
    getUserInfo: (param, resolve, reject) => {
        ajaxHandle.ajaxGet(ip.master_ip + 'user/getUserInfo' + param).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject && reject(err);
        })
    },
    getUserSubscribeInfosById: (param, resolve, reject) => {
        ajaxHandle.ajaxGet(ip.master_ip + 'user/getUserSubscribeInfosById' + param).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject && reject(err);
        })
    },
    // 投研用户详情
    getTyUserDetail: (param, resolve, reject) => {
        ajaxHandle.ajaxGet(ip.master_ip + 'TyUser/getTyUserDetail' + param).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject && reject(err);
        })
    },
    getUserSubscribeDetailsById: (param, resolve, reject) => {
        ajaxHandle.ajaxGet(ip.master_ip + 'TyUser/getUserSubscribeDetailsById' + param).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject && reject(err);
        })
    },
    // 投研订阅管理
    addSubscribeInfo: (param, resolve, reject) => {
        ajaxHandle.ajaxPost(ip.master_ip + 'TyUser/addSubscribeInfo', param).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject && reject(err);
        })
    },
    getSubscribeInfoById: (param, resolve, reject) => {
        ajaxHandle.ajaxGet(ip.master_ip + 'TyUser/getSubscribeInfoById' + param).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject && reject(err);
        })
    },
    getSubscribeInfoList: (resolve, reject) => {
        ajaxHandle.ajaxGet(ip.master_ip + 'TyUser/getSubscribeInfoList').then(res => {
            resolve(res.data)
        }).catch(err => {
            reject && reject(err);
        })
    },
    getTyUserSubscribeInfoList: (param, resolve, reject) => {
        ajaxHandle.ajaxPost(ip.master_ip + 'TyUser/getTyUserSubscribeInfoList', param).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject && reject(err);
        })
    },
    getUserSubscribeInfoById: (param, resolve, reject) => {
        ajaxHandle.ajaxGet(ip.master_ip + 'TyUser/getUserSubscribeInfoById' + param).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject && reject(err);
        })
    },
    modifyTyUserSubscribeInfo: (param, resolve, reject) => {
        ajaxHandle.ajaxPut(ip.master_ip + 'TyUser/modifyTyUserSubscribeInfo', param).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject && reject(err);
        })
    },
    updateSubscribeInfo: (param, resolve, reject) => {
        ajaxHandle.ajaxPost(ip.master_ip + 'TyUser/updateSubscribeInfo', param).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject && reject(err);
        })
    },
    // 意见反馈管理
    getAllFeedbackList: (param, resolve, reject) => {
        ajaxHandle.ajaxGet(ip.master_ip + 'feedback/all' + param).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject && reject(err);
        })
    },
    updateStatusFeedback: (param, resolve, reject) => {
        ajaxHandle.ajaxPost(ip.master_ip + 'feedback/updatestatus' + param).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject && reject(err);
        })
    },
    // 个性化报表
    querySql: (param, resolve, reject) => {
        ajaxHandle.ajaxPut(ip.master_ip + 'user/querySql', param).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject && reject(err);
        })
    },
    getQueryList: (param, resolve, reject) => {
        ajaxHandle.ajaxPost(ip.master_ip + 'user/getQueryList', param).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject && reject(err);
        })
    },
    saveSql: (param, resolve, reject) => {
        ajaxHandle.ajaxPost(ip.master_ip + 'user/saveSql', param).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject && reject(err);
        })
    },
    updateSql: (param, resolve, reject) => {
        ajaxHandle.ajaxPut(ip.master_ip + 'user/updateSql', param).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject && reject(err);
        })
    },
    // 资讯文章
    getArticleList: (param, resolve, reject) => {
        ajaxHandle.ajaxPost(ip.master_ip + 'article/list', param).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject && reject(err);
        })
    },
    getArticleCreaterList: (resolve, reject) => {
        ajaxHandle.ajaxGet(ip.master_ip + 'article/creater/list').then(res => {
            resolve(res.data)
        }).catch(err => {
            reject && reject(err);
        })
    },
    deleteArticle: (param, resolve, reject) => {
        ajaxHandle.ajaxDelete(ip.master_ip + 'article/delete' + param).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject && reject(err);
        })
    },
    uploadPic: (param, resolve, reject) => {
        ajaxHandle.ajaxPost(ip.master_ip + 'upload/pic', param, 'application/x-www-form-urlencoded; charset=UTF-8').then(res => {
            resolve(res.data)
        }).catch(err => {
            reject && reject(err);
        })
    },
    uploadArticle: (param, resolve, reject) => {
        ajaxHandle.ajaxPost(ip.master_ip + 'upload/article', param).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject && reject(err);
        })
    },
    getRecommend: (resolve, reject) => {
        ajaxHandle.ajaxGet(ip.master_ip + 'article/recommend').then(res => {
            resolve(res.data)
        }).catch(err => {
            reject && reject(err);
        })
    },
    updateArticle: (param, resolve, reject) => {
        ajaxHandle.ajaxPut(ip.master_ip + 'article/update', param).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject && reject(err);
        })
    },
    // 订单异常处理
    exceptOrderList: (resolve, reject) => {
        ajaxHandle.ajaxGet(ip.master_ip + 'order/exceptOrderList').then(res => {
            resolve(res.data)
        }).catch(err => {
            reject && reject(err);
        })
    },
    setOrderNormal: (param, resolve, reject) => {
        ajaxHandle.ajaxPut(ip.master_ip + 'order/setOrderNormal' + param).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject && reject(err);
        })
    },
    // 系统报告
    personalizedCustomization: (param, resolve, reject) => {
        ajaxHandle.ajaxPut(ip.master_ip + 'system/personalizedCustomization', param).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject && reject(err);
        })
    },
    getSystemReportList: (resolve, reject) => {
        ajaxHandle.ajaxGet(ip.master_ip + 'system/systemReportList').then(res => {
            resolve(res.data)
        }).catch(err => {
            reject && reject(err);
        })
    }
}
