import rxwx, { Rx } from 'rxjs-wx/RxWX'
import store from '@/store'
export default class MyStore {
  constructor () {
    this.rxSubject = new Rx.Subject()
  }
  get () {
    return this.rxSubject
  }
  clear () {
    this.rxSubject = null
  }
  dispatch () {
    return this.rxSubject
      .debounceTime(1000)
      .switchMap((params) => {
        console.log(params)
        // 判断 params 可以转为走其他dispatch
        return store.dispatch(params)
      }).catch((e) => {
        console.log('错误', e)
      })
      .subscribe((resp) => {
        console.log('过来了', resp)
      })
  }
}
