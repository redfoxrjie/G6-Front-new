<template>
  <div>
    <!-- 遮罩層：用於突出顯示當前步驟的元素 -->
    <div v-if="isVisible" class="overlay" ref="overlay"></div>
    <!-- 引導內容：顯示當前步驟的說明和操作按鈕 -->
    <div v-if="isVisible" class="guide-content" :style="guideContentStyle">
      <h2>{{ currentStepTitle }}</h2>
      <p>{{ currentStepContent }}</p>
      <p v-if="currentStepAction"><strong>操作提示：</strong> {{ currentStepAction }}</p>
      <div class="button-group">
        <button @click="prevStep" :disabled="isFirstStep">上一步</button>
        <button @click="nextStep">{{ isLastStep ? '完成' : '下一步' }}</button>
        <button @click="closeGuide">關閉導引</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue';

// 定義組件的 props
const props = defineProps({
  filteredSearchResults: Array, // 過濾後的搜索結果
  isMapVisible: Boolean         // 地圖是否可見
});

// 定義教學步驟
const steps = [
  { title: '步驟一', content: '請先搜索你想去的景點', action: '請在搜尋框當中輸入景點。', element: '#search-bar input' },
  { title: '步驟二', content: '這裡會顯示搜索結果。', action: '請點擊你想要去的景點。', element: '#search-bar .search-results' },
  { title: '步驟三', content: '點擊搜索結果後出現地標。', action: '請點擊地圖上的地標。', element: '#map-container .leaflet-marker-icon' },
  { title: '步驟四', content: '點擊加入行程', action: '請點擊"加入行程"。', element: '#map-container .leaflet-popup-content' },
  { title: '步驟五', content: '這裡會顯示你已經選取的行程。', action: '這是你新增的行程，後續可進行排序、刪除等操作。', element: '#itinerary .day-plan-list' },
  { title: '恭喜!', content: '恭喜您已經學會如何使用本功能!', action: '', element: 'body' }
];

// 響應式狀態
const currentStep = ref(0);           // 當前步驟索引
const isVisible = ref(false);         // 教學引導是否可見
const overlay = ref(null);            // 遮罩層元素引用
const guideContentStyle = ref({});    // 引導內容的樣式

// 計算屬性
const currentStepTitle = computed(() => steps[currentStep.value].title);
const currentStepContent = computed(() => steps[currentStep.value].content);
const currentStepAction = computed(() => steps[currentStep.value].action);
const isLastStep = computed(() => currentStep.value === steps.length - 1);
const isFirstStep = computed(() => currentStep.value === 0);

// 顯示教學引導
function showGuide() {
  isVisible.value = true;
  nextTick(() => {
    highlightElement(steps[currentStep.value].element);
  });
}

// 關閉教學引導
function closeGuide() {
  isVisible.value = false;
  currentStep.value = 0;
  if (overlay.value) {
    overlay.value.style.clipPath = 'none';
  }
}

// 下一步
function nextStep() {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++;
    nextTick(() => {
      if (isLastStep.value) {
        showCongratulations();
      } else {
        highlightElement(steps[currentStep.value].element);
      }
    });
  } else {
    closeGuide();
  }
}

// 上一步
function prevStep() {
  if (currentStep.value > 0) {
    currentStep.value--;
    nextTick(() => {
      highlightElement(steps[currentStep.value].element);
    });
  }
}

// 高亮顯示元素
function highlightElement(selector) {
  const element = document.querySelector(selector);
  if (element && overlay.value) {
    const rect = element.getBoundingClientRect();
    // 設置遮罩層的剪裁路徑以突出顯示目標元素
    overlay.value.style.clipPath = `polygon(
      0% 0%,
      0% 100%,
      100% 100%,
      100% 0%,
      ${rect.left}px 0%,
      ${rect.left}px ${rect.top}px,
      ${rect.right}px ${rect.top}px,
      ${rect.right}px ${rect.bottom}px,
      ${rect.left}px ${rect.bottom}px,
      ${rect.left}px 0%
    )`;
    adjustGuideContentPosition(rect);
  }
}

// 調整引導內容的位置
function adjustGuideContentPosition(targetRect) {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  let top = targetRect.bottom + 10;
  let left = targetRect.left;

  // 確保引導內容不會超出視窗邊界
  if (top + 200 > viewportHeight) {
    top = targetRect.top - 210; // 顯示在元素上方
  }
  if (left + 300 > viewportWidth) {
    left = viewportWidth - 310; // 靠右對齊
  }

  guideContentStyle.value = {
    top: `${top}px`,
    left: `${left}px`,
  };
}

// 顯示恭喜畫面
function showCongratulations() {
  guideContentStyle.value = {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };
  if (overlay.value) {
    overlay.value.style.clipPath = 'none';
  }
}

// 監聽搜索結果的變化
watch(() => props.filteredSearchResults, (newResults) => {
  if (newResults.length > 0 && currentStep.value === 1) {
    nextTick(() => {
      highlightElement('#search-bar .search-results');
    });
  }
});

// 監聽地圖可見性的變化
watch(() => props.isMapVisible, (isVisible) => {
  if (isVisible && (currentStep.value === 2 || currentStep.value === 3)) {
    nextTick(() => {
      highlightElement(steps[currentStep.value].element);
    });
  }
});

// 監聽窗口大小變化
window.addEventListener('resize', () => {
  if (isVisible.value && !isLastStep.value) {
    highlightElement(steps[currentStep.value].element);
  }
});

// 組件掛載時顯示引導
onMounted(() => {
  showGuide();
});
</script>

<style scoped>
/* 遮罩層樣式 */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 9999;
  pointer-events: none;
}

/* 引導內容樣式 */
.guide-content {
  position: fixed;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  z-index: 10000;
  max-width: 300px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* 按鈕組樣式 */
.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

/* 按鈕樣式 */
button {
  padding: 8px 12px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

/* 禁用按鈕樣式 */
button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>