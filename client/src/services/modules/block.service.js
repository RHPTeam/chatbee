import Api from "@/services";

export default {
  index() {
    return Api().get("block");
  },
  show(id) {
    return Api().get(`block?_id=${id}`);
  },
  create(groupId) {
    return Api().post(`block?_groupId=${groupId}`);
  },
  createItemBlock(block, blockId, type) {
    return Api().post(`block/item?_blockId=${blockId}&_type=${type}`, block);
  },
  update(block) {
    return Api().patch(`block?_blockId=${block._id}`, block);
  },
  updateItemBlock(valueText, itemId, block) {
    return Api().patch(
      `block?_blockId=${block._id}&_itemId=${itemId}`,
      valueText
    );
  },
  updateItemAttrBlock(itemId, block) {
    return Api().patch(
        `block?_blockId=${block._id}&_itemId=${itemId}`
    );
  },
  delete(blockId) {
    return Api().delete(`block?_blockId=${blockId}`);
  },
  deleteItemBlock(blockId, itemId) {
    return Api().delete(`block?_blockId=${blockId}&_itemId=${itemId}`);
  },
  deleteItemAttrBlock(blockId, itemId, tagId) {
    return Api().delete(`block?_blockId=${blockId}&_itemId=${itemId}&_tag=${tagId}`);
  },
  deleteItemSequenceInBlock(blockId, itemId, sequenceId) {
    return Api().delete(`block?_blockId=${blockId}&_itemId=${itemId}&_sequence=${sequenceId}`);
  }
};
