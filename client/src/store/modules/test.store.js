import TestService from "@/services/modules/test.service";

const state =  {
    accountFB: [],
};

const getters = {
    accountFB: state => state.accountFB
};

const mutations = {
    setAccountFB: (state, payload) => {
        state.accountFB = payload;
    }
};

const actions = {
    getAccountFB: async({commit}) => {
        const accountFB = await TestService.index();
        await commit("setAccountFB", accountFB.data.data)
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};