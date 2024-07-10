import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        isLoggedIn: false,
        userId: null,
        userInfo: null,
        isGoogleUser: false,
        googleUserInfo: null
    }),
    actions: {
        setUser(user) {
            this.isLoggedIn = true;
            this.userId = user.u_id;
            this.userInfo = user;
            localStorage.setItem('userId', user.u_id);
            localStorage.setItem('userToken', user.token);
            localStorage.setItem('userData', JSON.stringify(user));
        },
        setGoogleUser(profile) {
            this.isLoggedIn = true;
            this.isGoogleUser = true;
            this.googleUserInfo = profile;
            localStorage.setItem('googleUserData', JSON.stringify(profile));
        },
        logout() {
            this.isLoggedIn = false;
            this.userId = null;
            this.userInfo = null;
            localStorage.clear(); // 清除所有本地存儲
        },

        //新的頭像上傳之後，導覽列和會員專區也能動態更新，不需要重新登入
        updateUserAvatar(newAvatar) {
            if (this.userInfo) {
                this.userInfo.u_avatar = newAvatar;
                localStorage.setItem('userData', JSON.stringify(this.userInfo));
            }
        },
          //改名之後，導覽列和會員專區也能動態更新，不需要重新登入
        updateUserNickname(newNickname) {
            if (this.userInfo) {
                this.userInfo.u_nickname = newNickname;
                localStorage.setItem('userData', JSON.stringify(this.userInfo));
            }
        },
        
        initializeStore() { 
            const storedUserId = localStorage.getItem('userId');
            const storedToken = localStorage.getItem('userToken');
            const storedUserData = localStorage.getItem('userData');
            //第三方登入測試中...
            // const storedGoogleUserData = localStorage.getItem('googleUserData');
            // if (storedToken || storedGoogleUserData) {
            //     this.isLoggedIn = true;
            //     if (storedGoogleUserData) {
            //         this.isGoogleUser = true;
            //         this.googleUserInfo = JSON.parse(storedGoogleUserData);
            //     } else {
            //         this.userId = storedUserId;
            //         this.userInfo = storedUserData ? JSON.parse(storedUserData) : null;
            //     }
            // }
            if (storedToken) {
                this.isLoggedIn = true;
                this.userId = storedUserId;
                this.userInfo = storedUserData ? JSON.parse(storedUserData) : null;
            }
        },
    },
    persist: true // 這會使得狀態在頁面刷新後依然保持登入
});
