<template>
    <div class="myTrip-section" @click="closeAllDropdowns">
        <RouterLink to="/trips"><button @click="addTripModal" class="creat-new-plan">建立行程</button></RouterLink>
        <h2>我的行程</h2>
        <div class="trip-card-wrapper row row-cols-1 row-cols-md-2 row-cols-lg-3">
            <div class="card-container col" v-for="card in cards" :key="card.trp_id" :ref="`card-${card.trp_id}`"
                @click="goToTripMap(card.trp_id)">
                <div class="trip-card">
                    <div class="option-btn" @click.stop="Dropdown(card)" style="cursor: pointer;">
                        <ul v-show="card.isDropdownOpen" class="dropdown-menu">
                            <li v-for="option in options" :key="option.id" @click.stop="selectOption(option, card)">
                                {{ option.label }}
                            </li>
                        </ul>
                    </div>
                    <div class="trip-img">
                        <img :src="getImageUrl(card.trp_img)" :alt="card.trp_name" @error="handleImageError">
                    </div>
                    <div class="trip-info">
                        <div class="trip-title">{{ card.trp_name }}</div>
                        <div class="trip-dates font-time">{{ card.trp_sdate }} ~ {{ card.trp_edate }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AddTrip :isVisible="isModalVisible" @update:isVisible="handleModalVisibility" />
</template>

<script>
import { useUserStore } from '@/stores/userStore';
// import AddTrip from '@/components/layout/AddTrip.vue';

export default {
    name: 'EditMyTrip',
    components: {
        // AddTrip 
    },
    props: {
        options: {
            type: Array,
            default: () => [
                { id: 1, label: '編輯行程' },
                { id: 2, label: '查看旅行筆記' },
                { id: 3, label: '複製行程' },
            ],
        },
    },
    data() {
        return {
            cards: [],
            isDropdownOpen: false,
            selectedOption: null,
            isModalVisible: false,
            baseUrl: import.meta.env.VITE_IMG_URL // 初始化 baseUrl
        };
    },
    mounted() {
        this.loadTripsFromDatabase();
    },
    methods: {
        goToTripMap(trp_id) {
            this.$router.push(`/trips?trp_id=${trp_id}`);
        },
        getImageUrl(imagePath) {
            return imagePath ? `${this.baseUrl}/${imagePath}` : 'https://tibamef2e.com/cid101/g6/images/default-userBg.png';
        },
        handleImageError(event) {
            event.target.src = 'https://tibamef2e.com/cid101/g6/images/default-userBg.png';
        },
        Dropdown(card) {
            this.closeAllDropdowns();
            card.isDropdownOpen = !card.isDropdownOpen;
        },
        closeAllDropdowns() {
            this.cards.forEach(card => {
                card.isDropdownOpen = false;
            });
        },
        async loadTripsFromDatabase() {
            const userStore = useUserStore();
            const userId = userStore.userId;
            if (!userId) {
                console.error('User is not logged in');
                return;
            }
            try {
                const apiUrl = `${import.meta.env.VITE_API_URL}/get_trips.php?user_id=${userId}`;
                console.log('API URL:', apiUrl);
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Loaded trips data:', data);
                if (data.error) {
                    throw new Error(data.error);
                }
                this.cards = data;
            } catch (error) {
                console.error('Error loading trips:', error);
            }
        },
        showAddTripModal() {
            this.isModalVisible = true;
        },
        handleModalVisibility(newVisibility) {
            this.isModalVisible = newVisibility;
        },
        navigateToTripMap(card) {
            const userStore = useUserStore();
            const userId = userStore.userId;
            const userInfo = userStore.userInfo;

            this.$router.push({
                name: 'mytrip',
                params: { trp_id: card.trp_id },
                query: {
                    userId: userId,
                    userName: userInfo.u_nickname,
                    userAvatar: userInfo.u_avatar,
                    tripName: card.trp_name,
                    tripStartDate: card.trp_sdate,
                    tripEndDate: card.trp_edate,
                    tripImage: card.trp_img
                }
            });
        },
        selectOption(option, card) {
            if (option.label === '编辑行程') {
                this.navigateToTripMap(card);
            } else if (option.label === '複製行程') {
                this.copyTrip(card);
            } else {
                console.log('Selected option:', option, 'for card:', card);
            }
        },
        copyTrip(card) {
            const newCard = { ...card, trp_id: this.generateId() };
            this.cards.push(newCard);
            this.$nextTick(() => {
                const newCardElement = this.$refs[`card-${newCard.trp_id}`][0];
                const offset = 100; // 偏移量，根據需要調整
                window.scrollTo({
                    top: newCardElement.getBoundingClientRect().top + window.pageYOffset - offset,
                    behavior: 'smooth'
                });
            });
            card.isDropdownOpen = false;
        },
        generateId() {
            return 'trip-' + Date.now();
        }
    }
}
</script>


<style lang="scss" scoped>
@import '@/assets/styles/base/color';
@import '@/assets/styles/base/font';

.myTrip-section {
    .creat-new-plan {
        width: fit-content;
        background-color: $secondColor-2;
        padding: 12px 26px;
        color: $primaryColor;
        font-size: $base-fontSize * 1.125;
        letter-spacing: $base-fontSize * 1.125 * 0.1;
        border-radius: 36px;
        margin-left: auto;
        margin-top: 18px;
        display: block;
        cursor: pointer;

        &::before {
            content: '';
            width: 18px;
            aspect-ratio: 1/1;
            background: no-repeat center/cover url(@/assets/images/global/icons/add-icon.svg);
            display: inline-block;
            vertical-align: middle;
            margin-right: 8px;
            transform: translateY(-5%);
        }
    }

    h2 {
        color: $secondColor-2;
        margin: 24px 0;
    }

    .trip-card-wrapper {
        box-sizing: border-box;
        margin: 48px -16px;

        .card-container {
            box-sizing: border-box;
            padding: 0 16px;
            margin-bottom: 86px;
            position: relative;

            .trip-card {
                box-sizing: border-box;
                background-color: #fff;
                box-shadow: 0 4px 12px rgba(0, 0, 0, .1);
                cursor: pointer;
                position: relative;

                .option-btn {
                    width: 28px;
                    aspect-ratio: 1/1;
                    background: no-repeat center/contain url(@/assets/images/global/icons/option-btn.png);
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    z-index: 1;
                }

                .dropdown-menu {
                    width: 100px;
                    background-color: #fff;
                    position: absolute;
                    right: 8%;
                    top: 100%;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, .1);

                    li {
                        margin-bottom: 14px;

                        &:hover {
                            color: $secondColor-2;
                        }
                    }
                }

                .trip-img {
                    width: 100%;
                    aspect-ratio: 2.28/1;
                    overflow: hidden;

                    img {
                        width: 100%;
                        height: auto;
                        transform: translate(0, -5%);
                        transition: scale .5s ease-in-out;

                        &:hover {
                            scale: 1.06;
                            transition: scale .5s ease-in-out;
                        }
                    }
                }

                .trip-info {
                    display: flex;
                    flex-direction: column;
                    padding: 0 24px 24px;

                    .trip-title {
                        font-size: $base-fontSize;
                        line-height: 140%;
                        letter-spacing: $base-fontSize * 0.1;
                        margin: 14px 0;
                        color: $black;
                    }

                    .trip-dates {
                        color: $gray;
                        flex-grow: 1;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                }
            }
        }
    }
}
</style>