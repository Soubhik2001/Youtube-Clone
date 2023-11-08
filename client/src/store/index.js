import { createStore } from 'vuex'

export default createStore({
  state: {
    videoResults: null,
    channelResults: null,
  },
  getters: {
  },
  mutations: {
    setVideoResults(state, results){
      state.videoResults = results;
    },
    setChannelResults(state, results){
      state.channelResults = results;
    }
  },
  actions: {
  },
  modules: {
  }
})
