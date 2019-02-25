const state = {
    themeName: "light",
    collapseMenu: false,
    hideChatSidebar: false
};
const getters = {
    themeName: state => {
        return state.themeName;
    },
    collapseMenu: state => {
        return state.collapseMenu;
    },
    hideChatSidebar: state => {
        return state.hideChatSidebar;
    }
};
const mutations = {
    changeMenu: (state, payload) => {
        state.collapseMenu = payload;
    },
    changeChatSidebar: (state, payload) => {
        state.hideChatSidebar = payload;
    },
    changeThemeName: (state, payload) => {
        state.themeName = payload;
    }
};
const actions = {
    changeMenu: ({
        commit
    }, payload) => {
        commit("changeMenu", payload);
    },
    changeChatSidebar: ({
        commit
    }, payload) => {
        commit("changeChatSidebar", payload);
    },
    changeThemeName: ({
        commit
    }, payload) => {
        commit("changeThemeName", payload);
    }
};
export default {
    state,
    getters,
    mutations,
    actions
};