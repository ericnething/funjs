/**-----------------------------------------------------------------
 -= Composition =-
 -------------------------------------------------------------------*/

const compose = (...args) => {
  return args.reduce((a, b) => compose2(a)(b))
}

// compose2 :: (b -> c) -> (a -> b) -> (a -> c)
const compose2 = f => g => {
  return a => f(g(a))
}

/**-----------------------------------------------------------------
 -= Currying =-
 -------------------------------------------------------------------*/

const curry = f => {
  const go = (args, n) => {
    if (n === 0) {
      return f.apply(null, args)
    }
    return a => {
      args.push(a)
      return go(args, n - 1)
    }
  }
  return go([], f.length)
}

/**-----------------------------------------------------------------
 -= Generic Maps and Folds =-
 -------------------------------------------------------------------*/

// map :: (a -> b) -> Array a -> Array b
const map = f => xs => {
    return xs.map(f)
}

// reduce :: (a -> b -> c) -> b -> Array a -> c
const reduce = f => acc => xs => {
  return xs.reduce(f, acc)
}

// reduceRight :: (a -> b -> c) -> b -> Array a -> c
const reduceRight = f => acc => xs => {
  return xs.reduceRight(f, acc)
}

// filter :: (a -> Boolean) -> Array a -> Array a
const filter = f => xs => {
  return xs.filter(f)
}

// all :: (a -> Boolean) -> Array a -> Boolean
const all = f => xs => {
  return xs.every(f)
}

// any :: (a -> Boolean) -> Array a -> Boolean
const any = f => xs => {
  return xs.some(f)
}

/**-----------------------------------------------------------------
 -= Array transformations and slicing =-
 -------------------------------------------------------------------*/

// reverse :: Array a -> Array a
const reverse = xs => {
  return xs.slice().reverse()
}

// zipWith :: (a -> b -> c) -> Array a -> Array b -> Array c
const zipWith = f => xs => ys => {
  const length = max(xs.length, ys.length)
  const result = []
  for (k = 0; k < length; ++k) {
    result[k] = f(xs[k])(ys[k])
  }
  return result
}

// zip :: Array a -> Array b -> Array [a,b]
const zip = zipWith(a => b => [a, b])

// take :: Number -> Array -> Array
const take = n => xs => {
  return xs.slice(0, n)
}

// takWhile :: (a -> Boolean) -> Array a -> Array a
const takeWhile = f => xs => {
  let k
  for (k = 0; k < xs.length; ++k) {
    if (f(xs[k]) === false) { break }
  }
  return xs.slice(0, k)
}

// drop :: Number -> Array a -> Array a
const drop = n => xs => {
  return xs.slice(n, Infinity)
}

// dropWhile :: (a -> Boolean) -> Array a -> Array a
const dropWhile = f => xs => {
  let k
  for (k = 0; k < xs.length; ++k) {
    if (f(xs[k]) === false) { break }
  }
  return xs.slice(k)
}

// head :: Array a -> a?
const head = xs => {
  if (xs.length < 1) {
    return new Error("head: array is empty")
  }
  return xs[0]
}

// last :: Array a -> a?
const last = xs => {
  if (xs.length < 1) {
    return new Error("last: array is empty")
  }
  return xs[xs.length]
}

/**-----------------------------------------------------------------
 -= Objects =-
 -------------------------------------------------------------------*/

// mapObject :: (a -> b) -> Object a -> Object b
const mapObject = f => obj => {
  const result = {}
  Object.keys(obj).forEach(k => {
    result[k] = f(obj[k])
  })
  return result
}

// mapObjectWithKey :: (k -> a -> b) -> Object a -> Object b
const mapObjectWithKey = f => obj => {
  const result = {}
  Object.entries(obj).forEach(([k, v]) => {
    result[k] = f(k)(v)
  })
  return result
}

/**-----------------------------------------------------------------
 -= Numerical =-
 -------------------------------------------------------------------*/

// max :: Number -> Number -> Number
const max = a => b => {
  return Math.max(a,b)
}

// min :: Number -> Number -> Number
const min = a => b => {
  return Math.min(a,b)
}

// maximum :: Array Number -> Number
const maximum = xs => {
  return Math.max.apply(null, xs)
}

// minimum :: Array Number -> Number
const minimum = xs => {
  return Math.min.apply(null, xs)
}

// sum :: Array Number -> Number
const sum = xs => {
  return xs.reduce((a, b) => a + b, 0)
}

// product :: Array Number -> Number
const product = xs => {
  return xs.reduce((a, b) => a * b, 1)
}

// range :: Number -> Number -> Array Number
const range = start => end => {
  let result = []
  for (let k = start; k <= end; ++k) {
    result.push(k)
  }
  return result
}


/**-----------------------------------------------------------------
 -= Exports =-
 -------------------------------------------------------------------*/

module.exports = {
  compose,
  curry,
  map,
  reduce,
  reduceRight,
  foldl: reduce,
  foldr: reduceRight,
  filter,
  all,
  any,
  reverse,
  zipWith,
  zip,
  take,
  takeWhile,
  drop,
  dropWhile,
  head,
  last,
  mapObject,
  max,
  min,
  maximum,
  minimum,
  sum,
  product,
  range,
}
