import Api from "@/services";

export default {
  index() {
    return Api().get("message");
  },
  getConversationById(id) {
    return Api().get(`message?_id=${id}`);
  },
  create(fb_id) {
    return Api().post(`facebook/message?_fbId=${fb_id}`);
  },
  deleteConversation(_threadId) {
    return Api().delete(`message?_threadId=${_threadId}`);
  }
};
