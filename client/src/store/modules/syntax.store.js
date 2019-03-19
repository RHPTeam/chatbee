import SyntaxService from "@/services/modules/syntax.service";

const state = {
  statusSyntaxList: "",
  statusSyntax: "",
  syntaxList: [],
  syntax: {}
};
const getters = {
  statusSyntaxList: state => state.statusSyntaxList,
  statusSyntax: state => state.statusSyntax,
  syntaxList: state => state.syntaxList,
  syntax: state => state.syntax
};
const mutations = {
  /******************** CHECK STATUS*********************/
  syntaxList_request: state => {
    state.statusSyntaxList = "loading";
  },
  syntaxList_success: state => {
    state.statusSyntaxList = "success";
  },
  syntaxList_error: state => {
    state.statusSyntaxList = "error";
  },
  syntax_request: state => {
    state.statusSyntax = "loading";
  },
  syntax_success: state => {
    state.statusSyntax = "success";
  },
  syntax_error: state => {
    state.statusSyntax = "error";
  },
  /******************** SYNTAX *********************/
  setSyntax: (state, payload) => {
    state.syntax = payload;
  },
  setSyntaxList: (state, payload) => {
    state.syntaxList = payload;
  }
};
const actions = {
  getSyntaxList: async ({ commit }) => {
    commit("syntaxList_request");
    const result = await SyntaxService.index();
    await commit("setSyntaxList", result.data.data);
    commit("syntaxList_success");
  },
  createSyntax: async ({ commit }) => {
    commit("syntaxList_request");
    await SyntaxService.create();
    const result = await SyntaxService.index();
    await commit("setSyntaxList", result.data.data);
    commit("syntaxList_success");
  },
  getSyntax: async ({ commit }, payload) => {
    commit("syntax_request");
    const result = await SyntaxService.show(payload);
    await commit("setSyntax", result.data.data[0]);
    commit("syntax_success");
  },
  getFirstSyntax: async ({ commit }) => {
    commit("syntax_request");
    const result = await SyntaxService.index();
    await commit("setSyntax", result.data.data[0]);
    commit("syntax_success");
  },
  updateSyntax: async ({ commit }, payload) => {
    const objectSender = {
      title: payload.title
    }
    const result = await SyntaxService.update(payload.id, objectSender);
    const results = await SyntaxService.index();
    await commit("setSyntaxList", results.data.data);
    await commit("setSyntax", result.data.data);
  },
  deleteSyntax: async ({ commit }, payload) => {
    commit("syntaxList_request");
    await SyntaxService.delete(payload);
    const result = await SyntaxService.index();
    await commit("setSyntax", result.data.data[0]);
    await commit("setSyntaxList", result.data.data);
    commit("syntaxList_success");
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
