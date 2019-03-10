const state = {
    collapseSidebar: false,
    accounts: [{
            id: "1",
            name: "Phan Văn Đức",
            email: "pvduc196@gmail.com",
            avatar: "http://www.igeacps.it/app/uploads/2018/05/profile_uni_user.png",
            time: "20/09/2018",
            account: 5,
            account_limit: 5,
            enable: true
        },
        {
            id: "2",
            name: "Phan Văn Đức",
            email: "pvduc196@gmail.com",
            avatar: "http://123cunghoctin.com/uploads/freecontent/user-flat-icon-png-3.png",
            time: "21/09/2018",
            account: 4,
            account_limit: 5,
            enable: false
        },
        {
            id: "3",
            name: "Phan Văn Đức",
            email: "pvduc196@gmail.com",
            avatar: "http://thanhdatcomputer.vn/img_data/images/455356035511_avatar1.png",
            time: "22/09/2018",
            account: 3,
            account_limit: 5,
            enable: false
        },
        {
            id: "4",
            name: "Phan Văn Đức",
            email: "pvduc196@gmail.com",
            avatar: "https://image.flaticon.com/icons/png/512/272/272075.png",
            time: "23/09/2018",
            account: 2,
            account_limit: 5,
            enable: true
        },
        {
            id: "5",
            name: "Phan Văn Đức",
            email: "pvduc196@gmail.com",
            phone: "0987654321",
            avatar: "https://dinhvixemay.org/wp-content/uploads/2018/10/avatar-372-456324.png",
            time: "23/09/2018",
            account: 2,
            account_limit: 5,
            enable: true
        },
        {
            id: "6",
            name: "Phan Văn Đức",
            email: "pvduc196@gmail.com",
            phone: "0987654321",
            avatar: "http://www.psikologsec.com/images/resimsiz_k.png",
            time: "23/09/2018",
            account: 2,
            account_limit: 5,
            enable: true
        },
        {
            id: "7",
            name: "Phan Văn Đức",
            email: "pvduc196@gmail.com",
            phone: "0987654321",
            avatar: "https://image.flaticon.com/icons/png/512/206/206881.png",
            time: "23/09/2018",
            account: 2,
            account_limit: 5,
            enable: true
        },
        {
            id: "8",
            name: "Phan Văn Đức",
            email: "pvduc196@gmail.com",
            phone: "0987654321",
            avatar: "https://www.bestpersonnel.ie/wp-content/uploads/2017/11/Sani-Sebastian.png",
            time: "23/09/2018",
            account: 2,
            account_limit: 5,
            enable: true
        },
        {
            id: "9",
            name: "Phan Văn Đức",
            email: "pvduc196@gmail.com",
            phone: "0987654321",
            avatar: "https://image.flaticon.com/icons/png/512/206/206897.png",
            time: "23/09/2018",
            account: 2,
            account_limit: 5,
            enable: true
        },
        {
            id: "10",
            name: "Phan Văn Đức",
            email: "pvduc196@gmail.com",
            phone: "0987654321",
            avatar: "http://www.igeacps.it/app/uploads/2018/05/profile_uni_user.png",
            time: "23/09/2018",
            account: 2,
            account_limit: 5,
            enable: true
        },
    ],
};
const getters = {
    collapseSidebar: state => state.collapseSidebar,
    accounts: state => state.accounts,
};
const mutations = {
    changeSidebar: (state, payload) => {
        state.collapseSidebar = payload;
    },
    getAccounts: (state, payload) => {
        state.accounts = payload;
    },
};
const actions = {
    changeSidebar: ({
        commit
    }, payload) => {
        commit("changeSidebar", payload);
    },
    getAccounts: async({
        commit
    }, payload) => {
        await commit("getAccounts", payload);
    },
};
export default {
    state,
    getters,
    mutations,
    actions
};