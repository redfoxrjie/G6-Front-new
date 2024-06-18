<template>
    <div class="myTrip-section">
        <button @click="addTripModal" class="creat-new-plan">建立行程</button>
        <h2>我的行程</h2>
        <div class="trip-card-wrapper row row-cols-1 row-cols-md-2 row-cols-lg-3">
            <div class="card-container col" v-for="card in cards" :key="card.id">
                <div class="trip-card">
                    <div class="option-btn" @click="toggleDropdown(card)" style="cursor: pointer;">
                        <ul v-show="card.isDropdownOpen" class="dropdown-menu">
                            <li v-for="option in options" :key="option.id" @click.stop="selectOption(option, card)">
                                {{ option.label }}
                            </li>
                        </ul>

                    </div>
                    <div class="trip-img">
                        <img :src="card.image" :alt="card.name">
                    </div>
                    <div class="trip-info">
                        <div class="trip-title">{{ card.name }}</div>
                        <div class="trip-dates font-time">{{ card.startDate }} ~ {{ card.endDate }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AddTrip :isVisible="isModalVisible" @update:isVisible="isModalVisible = $event" />

</template>

<script>
import { ref } from 'vue';
import AddTrip from '@/components/layout/AddTrip.vue';

export default {
    name: 'MyComponent',
    components: {
        AddTrip// 註冊組件
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
            isDropdownOpen: false,
            selectedOption: "path/to/sr",
            cards: [],
            isModalVisible: false
        }
    },
    mounted() {
        this.loadJsonData();
    },
    methods: {
        toggleDropdown(card) {
            card.isDropdownOpen = !card.isDropdownOpen;
        },
        loadJsonData() {
            fetch(`${import.meta.env.BASE_URL}json/mytrips.json`)
                .then((response) => response.json())
                .then(data => {
                    this.cards = data.map(card => ({ ...card, isDropdownOpen: false }));
                })
                .catch((error) => {
                    console.error('Error loading JSON data:', error);
                });
        },
        addTripModal() {
            this.isModalVisible = true;
        }
    }
};
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