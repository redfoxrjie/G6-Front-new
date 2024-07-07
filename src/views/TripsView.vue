<template>
  <main>
    <MapGuide />
    <Mapcomponent
      :trip-data="tripData"
      :departure-times="departureTimes"
      @edit-time-click="handleEditTimeClick"
      @edit-plan-setting="showTripSetting"
      @show-edit-stay-time="showEditStayTimeHandler"
      @save-stay-time="saveStayTimeHandler"
      @save-trip-plan="handleSaveTripPlan"
    />
    <NewTrpLightBox02 :class="{ hidden: !showNewTrpLightBox02 }" @submit-trip="handleTripSubmit" />
    <BlackLayout :class="{ hidden: !showBlackLayout }" />
    <EditDepartureTime
      v-if="showEditDepartureTime"
      :currentDate="selectedDate"
      :currentWeekday="selectedWeekday"
      @time-saved="handleTimeSaved"
      @close="closeEditDepartureTime"
    />
    <TripSetting 
      v-if="displayTripSetting" 
      @close-trip-setting="closeTripSetting"
      @submit-trip="handleTripSubmit"
    />
    <EditStayTime 
      v-if="isEditStayTimeVisible"
      :location="selectedLocation"
      @save-stay-time="saveStayTimeHandler"
      @close="closeEditStayTime"
    />
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import MapGuide from '../components/map/MapGuide.vue';
import Mapcomponent from './MapComponent.vue';
import NewTrpLightBox02 from '@/components/map/NewTrpLightBox02.vue';
import BlackLayout from '@/components/layout/BlackLayout.vue';
import EditDepartureTime from '@/components/map/EditDepartureTime.vue';
import TripSetting from '@/components/map/TripSetting.vue';
import EditStayTime from '@/components/map/EditStayTime.vue';

// 使用 ref 定義 reactive 變量來控制顯示狀態
const showNewTrpLightBox02 = ref(false);
const showBlackLayout = ref(false);
const tripData = ref({
  tripName: '',
  startDate: '',
  endDate: '',
  selectedArea: ''
});
const showEditDepartureTime = ref(false);
const selectedDate = ref('');
const selectedWeekday = ref('');
const departureTimes = ref({}); // 維護每一天的出發時間
const displayTripSetting = ref(false); // 控制 TripSetting 顯示狀態
const isEditStayTimeVisible = ref(false); //「編輯停留時間」欄位預設不顯示
// let selectedLocation = ref(null);
const selectedLocation = ref(null); // 你的選定地點

// 處理行程提交
const handleTripSubmit = (data) => {
  tripData.value = { 
    ...tripData.value, 
    ...Object.keys(data).reduce((acc, key) => {
      if (data[key] !== '') {
        acc[key] = data[key];
      }
      return acc;
    }, {})
  };
  showNewTrpLightBox02.value = false;
  showBlackLayout.value = false;
  displayTripSetting.value = false;
};

// 顯示/隱藏 EditDepartureTime
const openEditDepartureTime = (date, weekday) => {
  selectedDate.value = date;
  selectedWeekday.value = weekday;
  showEditDepartureTime.value = true;
};

const closeEditDepartureTime = () => {
  showEditDepartureTime.value = false;
  showBlackLayout.value = false; // 關閉 BlackLayout
};

const toggleEditDepartureTime = () => {
  showEditDepartureTime.value = !showEditDepartureTime.value;
};

// 處理編輯時間點擊
const handleEditTimeClick = ({ date, weekday }) => {
  selectedDate.value = date;
  selectedWeekday.value = weekday;
  showEditDepartureTime.value = true;
  showBlackLayout.value = true;
};

// 處理時間保存
const handleTimeSaved = (time) => {
  // 確認有順利接收到來自EditDepartureTime.vue的資料
  console.log('接收到的時間：', time);
  // 更新對應日期的出發時間
  departureTimes.value[selectedDate.value] = time; 
  showEditDepartureTime.value = false;
  showBlackLayout.value = false;
};

// 顯示 TripSetting
const showTripSetting = () => {
  displayTripSetting.value = true;
  showBlackLayout.value = true;
};
// 關閉 TripSetting
const closeTripSetting = () => {
  displayTripSetting.value = false;
  showBlackLayout.value = false;
};

/*----------編輯景點停留時間-----------------*/ 
// 顯示 EditStayTime
const showEditStayTimeHandler = (location) => {
  selectedLocation.value = location;
  isEditStayTimeVisible.value = true;
};

// 關閉 EditStayTime
const closeEditStayTime = () => {
  isEditStayTimeVisible.value = false;
};

// 儲存停留時間
const saveStayTimeHandler = (formattedTime) => {
  // 更新對應日期的停留時間
  console.log('變更的停留時間：', formattedTime);

  // 傳遞時間到 MapComponent.vue 中的 receivedStayTime
  selectedLocation.value.receivedStayTime = formattedTime;

  closeEditStayTime(); // 儲存完畢後關閉 EditStayTime 組件
};
//處理儲存行程事件與接收資料
const handleSaveTripPlan = async (tripPlanData) => {
  console.log('接收到的行程資料：', tripPlanData); // 確認 tripPlanData 的內容
  try {
    const response = await fetch('http://localhost/phpG6/api/saveTripPlan.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tripPlanData),
    });

    const data = await response.json();
    console.log('後端回應資料：', data); // 檢查後端回應的內容

    if (data.status === 'success') {
      alert('行程保存成功！');
    } else {
      alert('else:行程保存失敗，請重試。');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('catch:行程保存失敗，請重試。');
  }
};

// 在組件載入後顯示 MapGuide、NewTrpLightBox01 及 BlackLayout
onMounted(() => {
  showNewTrpLightBox02.value = true;
  showBlackLayout.value = true;
});

</script>

<style lang="scss" scoped>
.hidden {
  display: none;
}
</style>
