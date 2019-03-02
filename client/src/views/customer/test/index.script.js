export default {
  props: {
    select:{
      type:String,
      default:"Month"
    },
    value: {
      type: String,
      default: ""
    },
    format: {
      type: String,
      default: "DD-MM-YYYY"
    },
    dates: {
      type: Array,
      default: function() {
        return [
          {
            id: "1",
            title: "Đăng bài buổi sáng",
            time_at: new Date("2019-02-21 09:00:00")
          }
        ];
      }
    }
  },
  data() {
    return {
      hour: 0,
      minute: 0,
      selected:"",
      item: {},
      show: false,
      acctionStt: true, // True is add || False is edit
      days: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      months: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],
      date: [],
      now: new Date(),
      pickedValue: ""
    };
  },
  watch: {
    now() {
      this.update();
    },
    show() {
      this.update();
    }
  },
  methods: {
    sort(){
      this.dates.sort(function(a,b){return a.time_at.getTime() - b.time_at.getTime()});
    },
    hide() {
      this.show = false;
      this.acctionStt = true;
      this.hour = 0;
      this.minute = 0;
    },
    action() {
      if (this.acctionStt == true) {
        var obj = {
          id: Date.now().getTime,
          title: this.item.title,
          time_at: new Date(
            this.dateToString(this.now) + " " + this.hour + ":" + this.minute
          )
        };
        this.dates.push(obj);

      } else {
        this.acctionStt=true;
        this.item.time_at=new Date(this.item.time_at.getFullYear(),this.item.time_at.getMonth(),this.item.time_at.getDate(),this.hour,this.minute);
        this.item={};
      }
      this.sort();
    },
    edit(obj) {
      this.acctionStt = false;
      this.item = obj;
      this.hour=this.item.time_at.getHours();
      this.minute=this.item.time_at.getMinutes();
    },
    remove(id) {
      var index = this.dates.findIndex(x => x.id === id);
      this.dates.splice(index, 1);
    },
    compareTime(time1, time2) {
      if (time1.getTime() == time2.getTime()) {
        return true;
      } else {
        return false;
      }
    },
    formatAMPM(date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime = hours + ":" + minutes + " " + ampm;
      return strTime;
    },
    close() {
      this.show = false;
    },
    update() {
      var arr = [];
      var time = new Date(this.now);
      time.setMonth(time.getMonth(), 1); // the first day
      var curFirstDay = time.getDay();
      curFirstDay === 0 && (curFirstDay = 7);
      time.setDate(0); // the last day
      var lastDayCount = time.getDate();
      for (let i = curFirstDay; i > 0; i--) {
        arr.push({
          text: lastDayCount - i + 1,
          time: new Date(
            time.getFullYear(),
            time.getMonth(),
            lastDayCount - i + 1
          ),
          status: "date-pass"
        });
      }
      time.setMonth(time.getMonth() + 2, 0); // the last day of this month
      var curDayCount = time.getDate();
      time.setDate(1); // fix bug when month change
      var value = this.pickedValue || this.stringify(new Date());
      for (let i = 0; i < curDayCount; i++) {
        let tmpTime = new Date(time.getFullYear(), time.getMonth(), i + 1);
        let status = "";
        this.stringify(tmpTime) === value && (status = "date-active");
        arr.push({
          text: i + 1,
          time: tmpTime,
          status: status
        });
      }
      var j = 1;
      while (arr.length < 42) {
        arr.push({
          text: j,
          time: new Date(time.getFullYear(), time.getMonth() + 1, j),
          status: "date-future"
        });
        j++;
      }
      this.date = arr;
    },
    pickDateLeft(index){
      this.item = {};
      this.now = new Date(this.date[index].time);
      this.pickedValue = this.stringify();
    },
    pickDate(index) {
      this.show = true;
      this.item = {};
      this.now = new Date(this.date[index].time);
      this.pickedValue = this.stringify();

    },
    pickTime(time){
      this.show = true;
      this.item = {};
      this.hour=time;
    },
    parse(str) {
      var time = new Date(str);
      return isNaN(time.getTime()) ? null : time;
    },
    dateToString(time = this.now) {
      var year = time.getFullYear();
      var month = time.getMonth() + 1;
      var date = time.getDate();
      var monthName = this.months[time.getMonth()];
      return year+"-"+month+"-"+date;
    },
    stringify(time = this.now, format = this.format) {
      var year = time.getFullYear();
      var month = time.getMonth() + 1;
      var date = time.getDate();
      var monthName = this.months[time.getMonth()];
      var map = {
        YYYY: year,
        MMM: monthName,
        MM: ("0" + month).slice(-2),
        M: month,
        DD: ("0" + date).slice(-2),
        D: date
      };
      return format.replace(/Y+|M+|D+/g, function(str) {
        return map[str];
      });
    },
    leave(e) {
      if (!this.$el.contains(e.target)) {
        this.acctionStt = true;
        this.hour = 0;
        this.minute = 0;
        this.close();
      }
    },
    yearClick(flag) {
      this.now.setFullYear(this.now.getFullYear() + flag);
      this.now = new Date(this.now);
    },
    monthClick(flag) {
      this.now.setMonth(this.now.getMonth() + flag, 1);
      this.now = new Date(this.now);
    },
    dayClick(flag) {
      this.now.setDate(this.now.getDate() + flag);
      this.now = new Date(this.now);
    }
  },
  computed: {
    
    gettersHour: {
      get: function() {
        return this.hour;
      },
      set: function(data) {
        var val = parseInt(data);
        if (val == "NaN" || val <= 0) {
          this.hour = 0;
        }else{
          if(val>23){
            this.hour=23;
          }else {
            this.hour = val;
          }
        }
         
      }
    },
    gettersMinute: {
      get: function() {
        return this.minute;
      },
      set: function(data) {
        var val = parseInt(data);
        if (val == "NaN" || val < 0) {
          this.minute = 0;
        }else{
          if(val>59){
            this.minute=59;
          }else {
            this.minute = val;
          }
        }
      }
    }
  },
  mounted() {
    this.pickedValue = this.value;
    this.$nextTick(() => {
      this.now = this.parse(this.pickedValue) || new Date();
      document.addEventListener("click", this.leave, false);
    });
  },
  beforeDestroy() {
    document.removeEventListener("click", this.leave, false);
  },
  created(){
    this.selected=this.select;
  }
};
