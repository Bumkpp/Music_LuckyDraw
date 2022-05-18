import createPersistedState from 'vuex-persistedstate'

const plugins = [
    createPersistedState({
        storage:window.sessionStorage,
        key:'token',
        reducer(state:any) {
            return {
                token:state.token
            }
        }
    })
]

export {
    plugins
}