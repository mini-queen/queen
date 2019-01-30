import rxwx, { Rx } from 'rxjs-wx/RxWX'

export default class Payment {
  constructor () {
    this.rxSubject = new Rx.Subject()
    this.count = 0
  }
  get () {
    return this.rxSubject
  }
  clear () {
    this.count = 0
  }
  pay () {
    return Rx.Observable.of().multicast(this.rxSubject)
      .do(() => {
        this.count++
        if (this.count > 1) {
          wx.showToast({
            title: '别着急，小牛正在支付..',
            icon: 'none'
          })
        }
      })
      .debounceTime(1000)
      .switchMap((payParams) => {
        console.log(payParams)
        // return rxwx.requestPayment({
        //     timeStamp: payParams.payParams,
        //     nonceStr: payParams.nonceStr,
        //     package: payParams.package,
        //     signType: payParams.signType || 'MD5',
        //     paySign: payParams.paySign})
        //     .debounceTime(1000)
        return rxwx.removeStorage({key: payParams}) // 临时模拟支付
      })
  }
}
