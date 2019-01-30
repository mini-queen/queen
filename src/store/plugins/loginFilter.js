export default function loginFilter (store) {
  // called when the store is initialized
  console.log('loginFilter------------->store------------>', store)
  store.subscribe((mutation, state) => {
    console.log('loginFilter--------------------------------->', mutation, state)
    // called after every mutation
    // The mutation comes in the format of `{ type, payload }`.
    // store.commit('COUNTER_INCREMENT')
  })
}
