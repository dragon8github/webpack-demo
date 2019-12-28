export const maybe = (fn, n = '') => {
   try {
      const result = fn()
      return (result && result === result && result !== 'NaN' && result !== 'Invalid date') ? result : n
   } catch (err) {
      return n
   }
}