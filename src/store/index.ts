import Vue from 'vue'
import Vuex from 'vuex'

import feed from './feed.module'
import servers from './servers.module'
import mapNames from './mapNames.module'
import mapName from './mapName.module'
import server from './server.module'
import user from './user.module'

Vue.use(Vuex)

export default () => new Vuex.Store({
  modules: {
    feed,
    servers,
    levelNames: mapNames,
    mapName,
    server,
    user
  }
})