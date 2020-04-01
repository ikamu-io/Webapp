import { AxiosResponse, AxiosError } from 'axios'
import { DELETE_SERVER, FETCH_SERVERS } from './actions.type'
import {
  FETCH_SERVERS_END,
  FETCH_SERVERS_START,
  DELETE_SERVERS_START,
  DELETE_SERVERS_END
} from './mutations.type'
import ApiResponse from '@/plugins/Repository/ApiResponse'

class State {
    public servers: any[] = [];
    public isServersLoading: boolean = true;
    public serversCount: number = -1;
}

const moduleState = () => new State()

const getters = {
  servers (state: State) {
    return state.servers
  },
  serversCount (state: State) {
    return state.serversCount
  },
  isServersLoading (state: State) {
    return state.isServersLoading
  }
}

const actions = {
  [FETCH_SERVERS] ({ commit }: any): any {
    commit(FETCH_SERVERS_START)
    return this.$repositories.servers.getServerStatuses().then((data: AxiosResponse<ApiResponse>) => {
      commit(FETCH_SERVERS_END, data)
    }).catch((err: AxiosError) => {
      this.$toast.error(err.message)
      console.log(err)
    })
  },
  [DELETE_SERVER] ({ dispatch, commit }: any, params: any): any {
    commit(DELETE_SERVERS_START)
    return this.$repositories.servers.deleteServer(params.ip_address, params.port).then((data: AxiosResponse<ApiResponse>) => {
      commit(DELETE_SERVERS_END, data)
      dispatch(FETCH_SERVERS)
    }).catch((err: AxiosError) => {
      this.$toast.error(err.message)
      console.log(err)
    })
  }
}

const mutations = {
  [FETCH_SERVERS_START] (state: State) {
    state.isServersLoading = true
  },
  [FETCH_SERVERS_END] (state: State, resp: ApiResponse) {
    state.servers = resp.body
    state.serversCount = resp.body.length
    state.isServersLoading = false
  },
  [DELETE_SERVERS_START] (state: State) {
    state.isServersLoading = true
  },
  [DELETE_SERVERS_END] (state: State) {
    state.isServersLoading = false
  }
}

export default {
  state: moduleState,
  getters,
  actions,
  mutations
}
