/** When your routing table is too long, you can split it into small modules**/
const libsDatePicker = {
  path: "/libs/datepicker",
  component: () => import("@/views/libs/datepicker")
};

export default libsDatePicker;
