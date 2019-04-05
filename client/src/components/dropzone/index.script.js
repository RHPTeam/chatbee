export default {
  props: ["status"],
  data() {
    return {
      file: ""
    };
  },
  computed: {
    fileAvatar() {
      return this.$store.getters.fileAvatar;
    },
    statusZone: {
      set (value) {
        this.$emit("close", value)
      },
      get () {
        return this.status
      }
    }
  },
  methods: {
    closeZone() {
      this.$emit("close", false)
    },
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
