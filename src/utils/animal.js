export default {
  /*
        @purpose 计算抛物线公式
        @createTime 2018-07-17 14:31
        @author miles_fk
        @par
            startPos  起始点坐标(就是手指点击)
            endPos 终止点坐标(就是购物车的按个位置)
            cf(count frame) 一共多少帧
            nf(next frame)  准备计算的帧
        @return
            object {
                x ： 每一帧对应的 left 值
                y  :  每一帧对应的 top  值
        }
    * */
  parabolicMotion: function (startPos, endPos, cf, nf) {
    let x = 0
    let y = 0
    if (nf > cf) {
      return endPos
    } else {
      x = startPos.x + (endPos.x - startPos.x) * (nf / cf)
      y = startPos.y + (endPos.y - startPos.y) * (nf * nf / (cf * cf))
      return { x: x, y: y }
    }
  }
}
