import IconBase from "@/components/icons/IconBase";
import IconSecurity from "@/components/icons/IconSecurity";
export default {
  data() {
    return {
      publicPath: process.env.BASE_URL,
      code: "",
      errorText: "",
      statusClassError: false,
      statusClassPassed: false
    };
  },
  components: {
    IconBase,
    IconSecurity
  },
  watch: {
    code(value) {
      this.errorText = "Code gửi đến cho bạn gồm 6 ký tự";
      this.statusClassError = true;
      this.statusClassPassed = false;
      if (value.length > 6) {
        this.errorText = "Code không đúng định dạng !";
        this.statusClassError = true;
        this.statusClassPassed = false;
      }
      if (value.length === 0) {
        this.errorText = "";
        this.statusClassError = false;
        this.statusClassPassed = false;
      }
    }
  }
};
