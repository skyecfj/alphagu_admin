import { observable, action, computed } from 'mobx';

class Visible {
    @observable flag = false;
    // @observable currentRoute = '';
    // @observable routeSet = [];
    @action show() {
        this.flag = !this.flag
    }
    // @computed get isAuth() {
    //     return this.routeSet.indexOf(this.currentRoute) !== -1
    // }
}

export default new Visible();