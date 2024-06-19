<template>
    <div class="lightbox" v-if="isVisible">
        <button class="close-right-btn" @click="close">✖</button>
        <div class="lightbox-content">
            <h3>請選擇行程</h3>
            <select v-model="selectedCountry" class="select-country">
                <option disabled value="">請選擇國家</option>
                <option>日本</option>
                <option>韓國</option>
                <option>泰國</option>
                <option>港澳</option>
            </select>
            <div class="filter-trip">
                <ul v-if="filterTrip.length">
                    <li v-for="trip in filterTrip" :key="trip.id" @click="selectTrip(trip)">{{ trip.name }}</li>
                </ul>
                <p v-else>請選擇一個國家來查看行程</p>
            </div>
            <button class="add-trip" @click="addBlankTrip">
                <router-link to="/trips">
                    <p><font-awesome-icon :icon="['fas', 'plus']" />新建空白行程</p>
                </router-link>
            </button>

            <div class="trip-state">
                <input type="radio" id="myTrip" value="myTrip" v-model="tripState" @click="toggleRadio('myTrip')" />
                <label for="myTrip">我的行程</label>
                <input type="radio" id="teamTrip" value="teamTrip" v-model="tripState"
                    @click="toggleRadio('teamTrip')" />
                <label for="teamTrip">團隊行程</label>
                <div class="trip-private">
                    <input type="checkbox" id="toggle" class="toggle-input" v-model="isToggled"
                        @change="handleToggle" />
                    <label for="toggle" class="toggle-label">
                        <span class="toggle-icon">
                            <font-awesome-icon :icon="isToggled ? 'unlock' : 'lock'" />
                        </span>
                        <span class="toggle-text">{{ isToggled ? '公開' : '非公開' }}</span>
                    </label>
                </div>
            </div>
            <div class="btn-wrap">
                <button @click="addTripModal" class="cancel-btn">取消</button>
                <button @click="addTripModal" class="creat-btn">建立</button>
            </div>

        </div>
    </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
    name: 'ToggleSwitch',
    props: {
        isVisible: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { emit }) {
        const selectedCountry = ref('');
        const filterTrip = ref([]);
        const tripState = ref('');
        const isToggled = ref(false);
        const handleToggle = () => {
            console.log('Switch state:', isToggled.value);
        };

        const trips = {
            日本: [
                { id: 1, name: '東京之旅(官方推薦)' },
                { id: 2, name: '京都之旅' }
            ],
            韓國: [
                { id: 1, name: '首爾之旅' },
                { id: 2, name: '釜山之旅' }
            ],
            泰國: [
                { id: 1, name: '曼谷之旅' },
                { id: 2, name: '清邁之旅' }
            ],
            港澳: [
                { id: 1, name: '香港之旅' },
                { id: 2, name: '澳門之旅' }
            ]
        };

        watch(selectedCountry, (newVal) => {
            if (newVal) {
                filterTrip.value = trips[newVal] || [];
            } else {
                filterTrip.value = [];
            }
        });


        const close = () => {
            emit('update:isVisible', false);
        };

        const toggleRadio = (value) => {
            if (tripState.value === value) {
                tripState.value = '';
            } else {
                tripState.value = value;
            }
        };
        return {
            isToggled,
            handleToggle,
            selectedCountry,
            filterTrip,
            close,
            toggleRadio,
            tripState,
        };
    }
};
</script>


<style lang="scss" scoped>
@import '@/assets/styles/base/color';
@import '@/assets/styles/base/font';

.lightbox {
    width: 350px;
    display: block;
    // position: fixed;
    position: absolute;
    z-index: 1;
    top: 800px;
    right: 5%;
    overflow: auto;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, .1);

    .close-right-btn {
        position: relative;
        top: 0px;
        left: 85%;
        margin-top: 3%;
        background-color: #fff;
        color: $secondColor-2;
        border: 1px solid $secondColor-1;
        padding: 6px 10px;
        border-radius: 28px;
        letter-spacing: 1px;
        outline: none;
        cursor: pointer;
    }

    .lightbox-content {
        background-color: #fefefe;
        margin: 0 auto;
        width: 78%;

        .select-country {
            width: 100%;
            padding: 7px;
            border-radius: 5px;
            margin-top: 20px;
            font-size: $base-fontSize;

            &:focus {
                border: 2px solid $secondColor-2;
            }

        }

        .filter-trip {
            margin-top: 15px;
            width: 100%;

            li {
                padding: 10px 15px;

                &:hover {
                    background-color: $secondColor-1;
                    color: #fff;
                }
            }
        }

        .add-trip {
            color: $secondColor-2;
            width: 100%;
            padding: 3px;
            margin-top: 10px;
            border: $secondColor-2 dotted 1px;

            p {
                padding: 5px 0;
            }

            .fa-plus {
                margin-right: 10px;
            }
        }

        .close {
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
        }

        .select-country .close:hover,
        .close:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
        }

        .trip-state {
            display: flex;
            margin-top: 20%;
            align-items: center;
            justify-content: center;

            .trip-private {
                display: flex;
                align-items: center;

                .toggle-input {
                    display: none;
                }

                .toggle-label {
                    display: flex;
                    align-items: center;
                    width: 70px;
                    padding: 5px 10px;
                    margin-left: 8px;
                    justify-content: center;
                    border: 2px solid $secondColor-2;
                    border-radius: 20px;
                    background-color: transparent;
                    color: $secondColor-2;
                    font-size: $base-fontSize ;
                    cursor: pointer;
                    transition: background-color 0.3s, color 0.3s;

                    .toggle-text {
                        margin-left: 8px;
                    }

                    .toggle-icon {
                        display: flex;
                        align-items: center;

                        i {
                            font-size: 20px;
                        }
                    }
                }

                .toggle-input:checked+.toggle-label {
                    background-color: $secondColor-2;
                    color: $primaryColor;
                }
            }
        }

        .btn-wrap {
            display: flex;
            margin: 10px auto 30px;

            .creat-btn,
            .cancel-btn {
                width: fit-content;
                background-color: $secondColor-2;
                padding: 6px 40px;
                color: $primaryColor;
                font-size: $base-fontSize * 1.125;
                letter-spacing: $base-fontSize * 1.125 * 0.1;
                border-radius: 36px;
                margin: auto;
                margin-top: 18px;
                display: block;
                cursor: pointer;
            }

            .cancel-btn {
                padding: 4px 38px;
                background-color: #fff;
                color: $secondColor-2;
                border: $secondColor-2 solid 2px;
            }
        }

    }
}
</style>
