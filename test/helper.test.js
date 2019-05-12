function findFromTail(list, cb){
    let i = list.length
    let ret = -1
    while(i) {
        --i
        let _ret = cb(list[i], i)
        if(_ret) {
            ret = i
            break
        }
    }
    return ret
}


test('case 1', () => {
  expect(findFromTail([1,2,3,4,5,5,4,3,2,1], function(el, index){
      return el === 2
  })).toBe(8)
})

test('case 1', () => {
    expect(findFromTail([1,2,3,4,5,5,4,3,2,1], function(el, index){
        return el === 1
    })).toBe(9)
  })

  test('case 1', () => {
    expect(findFromTail([1,2,3,4,5], function(el, index){
        return el === 1
    })).toBe(0)
  })