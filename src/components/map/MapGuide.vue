<template>
  <div>
    <div v-if="isVisible" class="overlay" ref="overlay" @click="handleOverlayClick"></div>
    <div v-if="isVisible" class="guide-content" :style="guideContentStyle">
      <h2>{{ currentStepTitle }}</h2>
      <p>{{ currentStepContent }}</p>
      <p v-if="currentStepAction"><strong>操作提示：</strong> {{ currentStepAction }}</p>
      <div class="button-group">
        <button @click="prevStep" :disabled="isFirstStep">上一步</button>
        <button @click="nextStep" :disabled="isNextStepDisabled">{{ isLastStep ? '完成' : '下一步' }}</button>
        <button @click="closeGuide">
          跳過說明
          <font-awesome-icon icon="forward-step" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const props = defineProps({
  filteredSearchResults: Array,
  isMapVisible: Boolean,
  showNewTrpLightBox02: Boolean
});

const emit = defineEmits(['update:showNewTrpLightBox02']);

const steps = [
  { title: '歡迎使用', content: '歡迎使用我們的行程規劃功能！接下來我們將引導您了解如何使用各項功能。', action: '點擊"下一步"開始導覽。', element: 'body' },
  { title: '步驟一', content: '讓我們開始建立新的行程！', action: '請在彈出的視窗中填寫行程資訊。', element: '.light-box' },
  { title: '步驟二', content: '請搜索你想去的景點', action: '請在搜尋框當中輸入景點。', element: '#search-bar input' },
  { title: '步驟三', content: '這裡會顯示搜索結果。', action: '請點擊你想要去的景點。', element: '#search-bar .search-results' },
  { title: '步驟四', content: '點擊搜索結果後出現地標。', action: '請點擊地圖上的地標。', element: '#map-container .leaflet-marker-icon' },
  { title: '步驟五', content: '點擊加入行程', action: '請點擊"加入行程"。', element: '#map-container .leaflet-popup-content' },
  { title: '步驟六', content: '這裡會顯示你已經選取的行程。', action: '這是你新增的行程，後續可進行排序、刪除等操作。', element: '#itinerary .day-plan-list' },
  { title: '恭喜!', content: '恭喜您已經學會如何使用本功能!', action: '', element: 'body' }
];

const currentStep = ref(0);
const isVisible = ref(true);
const overlay = ref(null);
const guideContentStyle = ref({});

const currentStepTitle = computed(() => steps[currentStep.value].title);
const currentStepContent = computed(() => steps[currentStep.value].content);
const currentStepAction = computed(() => steps[currentStep.value].action);
const isLastStep = computed(() => currentStep.value === steps.length - 1);
const isFirstStep = computed(() => currentStep.value === 0);
const isNextStepDisabled = computed(() => currentStep.value === 1 && props.showNewTrpLightBox02);

function showGuide() {
  isVisible.value = true;
  nextTick(() => {
    highlightElement(steps[currentStep.value].element);
  });
}

function closeGuide() {
  isVisible.value = false;
  currentStep.value = 0;
  if (overlay.value) {
    overlay.value.style.clipPath = 'none';
  }
  emit('update:showNewTrpLightBox02', false);
  enableScroll();
}

function nextStep() {
  if (currentStep.value < steps.length - 1) {
    if (currentStep.value === 1 && props.showNewTrpLightBox02) {
      emit('update:showNewTrpLightBox02', false);
    } else {
      currentStep.value++;
      nextTick(() => {
        if (isLastStep.value) {
          showCongratulations();
        } else {
          highlightElement(steps[currentStep.value].element);
        }
      });
    }
  } else {
    closeGuide();
  }
}

function prevStep() {
  if (currentStep.value > 0) {
    currentStep.value--;
    if (currentStep.value === 1) {
      emit('update:showNewTrpLightBox02', true);
    }
    nextTick(() => {
      highlightElement(steps[currentStep.value].element);
    });
  }
}

function handleOverlayClick(event) {
  event.stopPropagation();
}

function highlightElement(selector) {
  const element = document.querySelector(selector);
  if (element && overlay.value) {
    const rect = element.getBoundingClientRect();
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

function adjustGuideContentPosition(targetRect) {
  const viewportHeight = window.innerHeight;
  let top = Math.max(200, targetRect.top); // 確保至少距離頂部 100px

  if (top + 300 > viewportHeight) {
    top = Math.max(100, viewportHeight - 310);
  }

  guideContentStyle.value = {
    top: `${top}px`,
  };
}

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

// 禁用滾動
function disableScroll() {
  document.body.style.overflow = 'hidden';
  document.addEventListener('wheel', preventDefault, { passive: false });
  document.addEventListener('touchmove', preventDefault, { passive: false });
}

// 啟用滾動
function enableScroll() {
  document.body.style.overflow = '';
  document.removeEventListener('wheel', preventDefault);
  document.removeEventListener('touchmove', preventDefault);
}

// 阻止默認滾動行為
function preventDefault(e) {
  e.preventDefault();
}

watch(() => props.showNewTrpLightBox02, (newValue) => {
  if (!newValue && currentStep.value === 1) {
    highlightElement(steps[currentStep.value].element);
  }
}, { immediate: true });

watch(() => props.filteredSearchResults, (newResults) => {
  if (newResults.length > 0 && currentStep.value === 3) {
    nextTick(() => {
      highlightElement('#search-bar .search-results');
    });
  }
});

watch(() => props.isMapVisible, (isVisible) => {
  if (isVisible && (currentStep.value === 4 || currentStep.value === 5)) {
    nextTick(() => {
      highlightElement(steps[currentStep.value].element);
    });
  }
});

onMounted(() => {
  currentStep.value = 0;  // 確保從歡迎步驟開始
  showGuide();
  disableScroll();  // 禁用滾動
});

onUnmounted(() => {
  enableScroll();  // 組件卸載時啟用滾動
});

defineExpose({
  nextStep,
  prevStep,
  closeGuide
});
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 9999;
}

.guide-content {
  position: fixed;
  left: 20px;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  z-index: 10000;
  width: 300px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

button {
  padding: 8px 12px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>