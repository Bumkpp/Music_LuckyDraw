import { createStore } from 'vuex'
import { plugins } from './persiste'

export default createStore({
  //存储的各个状态
  state: {
    token: ""
  },
  //类似于 Vue 中的计算属性，根据其他 getter 或 state 计算返回值
  getters: {
  },
  //改变store中状态的执行者
  mutations: {
    addToken(state, token: string) {
      state.token = token
    },
    deleteToken(state) {
      state.token = ""
    }
  },
  //其中可以含有异步操作
  actions: {
  },
  //模块操作
  modules: {
  },
  //持久化储存
  plugins,
})
