import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        isLoggedIn: false,
        userInfo: null
    }),
    actions: {
        setUser(user) {
            this.isLoggedIn = true;
            this.userInfo = user;
            localStorage.setItem('userToken', user.token);
            localStorage.setItem('userData', JSON.stringify(user));
        },
        logout() {
            this.isLoggedIn = false;
            this.userInfo = null;
            localStorage.clear(); // 清除所有本地存儲
        },
        initializeStore() {
            const storedToken = localStorage.getItem('userToken');
            const storedUserData = localStorage.getItem('userData');
            if (storedToken) {
                this.isLoggedIn = true;
                this.userInfo = storedUserData ? JSON.parse(storedUserData) : null;
            }
        },
    },
    persist: true // 這會使得狀態在頁面刷新後依然保持登入
});
