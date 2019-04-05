import Vue from "vue";

import IconBase from "@/components/icons/IconBase";
import IconAccount from "@/components/icons/IconAccount";
import IconActive from "@/components/icons/IconActive";
import IconAddUser from "@/components/icons/IconAddUser";
import IconArrowDown from "@/components/icons/IconArrowDown";
import IconArrowUp from "@/components/icons/IconArrowUp";
import IconAutoAnswer from "@/components/icons/IconAutoAnswer";
import IconAutoReply from "@/components/icons/IconAutoReply";
import IconBroadcast from "@/components/icons/IconBroadcast";
import IconBack from "@/components/icons/IconBack";
import IconCalendar from "@/components/icons/IconCalendar";
import IconCamera from "@/components/icons/IconCamera";
import IconCancel from "@/components/icons/IconCancel";
import IconChangeAccount from "@/components/icons/IconChangeAccount";
import IconChat from "@/components/icons/IconChat";
import IconCheckActive from "@/components/icons/IconCheckActive";
import IconCheckPadlock from "@/components/icons/IconCheckPadlock";
import IconClose from "@/components/icons/IconClose";
import IconCopy from "@/components/icons/IconCopy";
import IconDashBoard from "@/components/icons/IconDashboard";
import IconDelete from "@/components/icons/IconDelete";
import IconDisative from "@/components/icons/IconDisative";
import IconDropDown from "@/components/icons/IconDropDown";
import IconEdit from "@/components/icons/IconEdit";
import IconEditInfo from "@/components/icons/IconEditInfo";
import IconEnvelop from "@/components/icons/IconEnvelop";
import IconEye from "@/components/icons/IconEye";
import IconFriend from "@/components/icons/IconFriend";
import IconFilter from "@/components/icons/IconFilter";
import IconGrid from "@/components/icons/IconGrid";
import IconGridLayout from "@/components/icons/IconGridLayout";
import IconHome from "@/components/icons/IconHome";
import IconHourglass from "@/components/icons/IconHourglass";
import IconImac from "@/components/icons/IconImac";
import IconImage from "@/components/icons/IconImage";
import IconInfinity from "@/components/icons/IconInfinity";
import IconInfo from "@/components/icons/IconInfo";
import IconInputSearch from "@/components/icons/IconInputSearch";
import IconKey from "@/components/icons/IconKey";
import IconLibs from "@/components/icons/IconLibs";
import IconLink from "@/components/icons/IconLink";
import IconList from "@/components/icons/IconList";
import IconLoading from "@/components/icons/IconLoading";
import IconLock from "@/components/icons/IconLock";
import IconLockCheck from "@/components/icons/IconLockCheck";
import IconLogo from "@/components/icons/IconLogo";
import IconLogoAdmin from "@/components/icons/IconLogoAdmin";
import IconLogoShort from "@/components/icons/IconLogoShort";
import IconLogoText from "@/components/icons/IconLogoText";
import IconLogout from "@/components/icons/IconLogout";
import IconMail from "@/components/icons/IconMail";
import IconManageAccount from "@/components/icons/IconManageAccount";
import IconMenu from "@/components/icons/IconMenu";
import IconModalCookie from "@/components/icons/IconModalCookie";
import IconMore from "@/components/icons/IconMore";
import IconMove from "@/components/icons/IconMove";
import IconMoveDown from "@/components/icons/IconMoveDown";
import IconMoveUp from "@/components/icons/IconMoveUp";
import IconNewMessage from "@/components/icons/IconNewMessage";
import IconNext from "@/components/icons/IconNext";
import IconPadlock from "@/components/icons/IconPadlock";
import IconPhone from "@/components/icons/IconPhone";
import IconPhoneInfo from "@/components/icons/IconPhoneInfo";
import IconPlayButton from "@/components/icons/IconPlaysButton";
import IconPlus from "@/components/icons/IconPlus";
import IconRemove from "@/components/icons/IconRemove";
import IconRole from "@/components/icons/IconRole";
import IconSandClock from "@/components/icons/IconSandClock";
import IconScript from "@/components/icons/IconScript";
import IconSecurity from "@/components/icons/IconSecurity";
import IconSend from "@/components/icons/IconSend";
import IconSmile from "@/components/icons/IconSmile";
import IconSortDown from "@/components/icons/IconSortDown";
import IconSplit from "@/components/icons/IconSplit";
import IconStatus from "@/components/icons/IconStatus";
import IconTag from "@/components/icons/IconTag";
import IconText from "@/components/icons/IconText";
import IconThreeDotsHoriz from "@/components/icons/IconThreeDotsHoriz";
import IconThreeDotsVerti from "@/components/icons/IconThreeDotsVerti";
import IconTimer from "@/components/icons/IconTimer";
import IconUploadImage from "@/components/icons/IconUploadImage";
import IconUser from "@/components/icons/IconUser";

import Editable from "@/components/shared/editable";
import LoadingComponent from "@/components/shared/cp_loading";
import DeletePopup from "@/components/popupDelete";
import DatePicker from "@/components/shared/datepicker_library";

Vue.component("IconBase", IconBase);
Vue.component("IconAccount", IconAccount);
Vue.component("IconActive", IconActive);
Vue.component("IconAddUser", IconAddUser);
Vue.component("IconArrowDown", IconArrowDown);
Vue.component("IconArrowUp", IconArrowUp);
Vue.component("IconAutoAnswer", IconAutoAnswer);
Vue.component("IconAutoReply", IconAutoReply);

Vue.component("IconBroadcast", IconBroadcast);
Vue.component("IconBack", IconBack);

Vue.component("IconCalendar", IconCalendar);
Vue.component("IconCamera", IconCamera);
Vue.component("IconCancel", IconCancel);
Vue.component("IconChangeAccount", IconChangeAccount);
Vue.component("IconChat", IconChat);
Vue.component("IconCheckActive", IconCheckActive);
Vue.component("IconCheckPadlock", IconCheckPadlock);
Vue.component("IconClose", IconClose);
Vue.component("IconCopy", IconCopy);

Vue.component("IconDashBoard", IconDashBoard);
Vue.component("IconDelete", IconDelete);
Vue.component("IconDisative", IconDisative);
Vue.component("IconDropDown", IconDropDown);

Vue.component("IconEdit", IconEdit);
Vue.component("IconEditInfo", IconEditInfo);
Vue.component("IconEnvelop", IconEnvelop);
Vue.component("IconEye", IconEye);

Vue.component("IconFriend", IconFriend);
Vue.component("IconFilter", IconFilter);

Vue.component("IconGrid", IconGrid);
Vue.component("IconGridLayout", IconGridLayout);

Vue.component("IconHome", IconHome);
Vue.component("IconHourglass", IconHourglass);

Vue.component("IconImac", IconImac);
Vue.component("IconImage", IconImage);
Vue.component("IconInfinity", IconInfinity);
Vue.component("IconInfo", IconInfo);
Vue.component("IconInputSearch", IconInputSearch);

Vue.component("IconKey", IconKey);

Vue.component("IconLibs", IconLibs);
Vue.component("IconLink", IconLink);
Vue.component("IconList", IconList);
Vue.component("IconLoading", IconLoading);
Vue.component("IconLock", IconLock);
Vue.component("IconLockCheck", IconLockCheck);
Vue.component("IconLogo", IconLogo);
Vue.component("IconLogoAdmin", IconLogoAdmin);
Vue.component("IconLogoShort", IconLogoShort);
Vue.component("IconLogoText", IconLogoText);
Vue.component("IconLogout", IconLogout);

Vue.component("IconMail", IconMail);
Vue.component("IconManageAccount", IconManageAccount);
Vue.component("IconMenu", IconMenu);
Vue.component("IconModalCookie", IconModalCookie);
Vue.component("IconMore", IconMore);
Vue.component("IconMove", IconMove);
Vue.component("IconMoveDown", IconMoveDown);
Vue.component("IconMoveUp", IconMoveUp);
Vue.component("IconNewMessage", IconNewMessage);

Vue.component("IconNext", IconNext);

Vue.component("IconPadlock", IconPadlock);
Vue.component("IconPhone", IconPhone);
Vue.component("IconPhoneInfo", IconPhoneInfo);
Vue.component("IconPlayButton", IconPlayButton);
Vue.component("IconPlus", IconPlus);

Vue.component("IconRemove", IconRemove);
Vue.component("IconRole", IconRole);

Vue.component("IconSandClock", IconSandClock);
Vue.component("IconScript", IconScript);
Vue.component("IconSecurity", IconSecurity);
Vue.component("IconSend", IconSend);
Vue.component("IconSmile", IconSmile);
Vue.component("IconSortDown", IconSortDown);
Vue.component("IconSplit", IconSplit);
Vue.component("IconStatus", IconStatus);

Vue.component("IconTag", IconTag);
Vue.component("IconText", IconText);
Vue.component("IconThreeDotsHoriz", IconThreeDotsHoriz);
Vue.component("IconThreeDotsVerti", IconThreeDotsVerti);
Vue.component("IconTimer", IconTimer);

Vue.component("IconUploadImage", IconUploadImage);
Vue.component("IconUser", IconUser);
Vue.component("IconCheck", () => import("@/components/icons/IconCheck"));

/********************* CUSTOM GLOBAL COMPONENT EDITABLE ************************/
Vue.component("Editable", Editable);
Vue.component("EditableTime", () => import("@/components/shared/editable_time"));
Vue.component("EditableDescTime", () => import("@/components/shared/editable-time/editable_desc_time"));
Vue.component("LoadingComponent", LoadingComponent);
Vue.component("DeletePopup", DeletePopup);
Vue.component("DeleteItem", () => import("@/components/popupDelete/delete-item"));
Vue.component("DatePicker", DatePicker);
Vue.component("Taggle", () => import("@/components/taggle"));
Vue.component("Multi", () => import("@/components/select/multi"));
Vue.component("Dropzone", () => import("@/components/dropzone"));

/********************* CUSTOM POPUP COMPONENT ****************************/
Vue.component("AddPlugins", () => import("@/components/addPlugins/index"));

/********************* CUSTOM FILTER COMPONENT ****************************/
Vue.component("FilterBee", () => import("@/components/shared/filter"));
Vue.component("SliderSchedule", () => import("@/components/slider/slider_schedule"));

/********************* CUSTOM DROPDOWN COMPONENT ****************************/
Vue.component("DGroupScript", () =>
  import("@/components/dropdown/d_group_script")
);
Vue.component("DScript", () => import("@/components/dropdown/d_script"));
Vue.component("DMove", () => import("@/components/dropdown/d_move"));
Vue.component("PTime", () => import("@/components/popup/s_time"));
Vue.component("PSelectAccount", () => import("@/components/popup/p_select"));

/********************* CUSTOM PAGINATION COMPONENT ****************************/
Vue.component("Pagination", () => import("@/components/paginate/index"));
