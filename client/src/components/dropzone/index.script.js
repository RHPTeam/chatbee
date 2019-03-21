export default {
  data() {
    return {
      file: ""
    };
  },
  computed: {
    fileAvatar() {
      return this.$store.getters.fileAvatar;
    }
  },
  methods: {
    selectFile() {
      this.file = this.$refs.file.files[0];
      this.sendFile();
    },
    sendFile() {
      const formData = new FormData();
      formData.append("file", this.file);
      this.$store.dispatch("sendFile", formData);
    }
  }
};
