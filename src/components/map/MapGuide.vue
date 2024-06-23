<template>
  <div>
    <div v-if="isVisible" class="overlay" ref="overlay"></div>
    <div v-if="isVisible" class="guide-content" :style="guideContentStyle">
      <h2>{{ currentStepTitle }}</h2>
      <p>{{ currentStepContent }}</p>
      <p><strong>操作提示：</strong> {{ currentStepAction }}</p>
      <div class="button-group">
        <button @click="prevStep" :disabled="isFirstStep">上一步</button>
        <button @click="nextStep">{{ isLastStep ? '完成' : '下一步' }}</button>
        <button @click="closeGuide">關閉導引</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch, onBeforeUnmount } from 'vue';

const props = defineProps({
  filteredSearchResults: Array
});

const steps = [
  { title: '步驟一', content: '請先搜索你想去的景點', action: '請在搜尋框當中輸入景點。', element: '#search-bar input' },
  { title: '步驟二', content: '這裡會顯示搜索結果。', action: '請點擊你想要去的景點。', element: '.search-results' },
  { title: '步驟三', content: '點擊搜索結果後出現地標。', action: '請點擊地圖上的地標。', element: '.leaflet-marker-icon' },
  { title: '步驟四', content: '點擊加入行程', action: '請點擊"加入行程"。', element: '.leaflet-popup-content' },
  { title: '步驟五', content: '這裡會顯示你已經選取的行程。', action: '這是你新增的行程，後續可進行排序、刪除等操作。', element: '.day-plan-list' },
  { title: '恭喜!', content: '恭喜您已經學會如何使用本功能!', action: '', element: 'body' }
];

const currentStep = ref(0);
const isVisible = ref(false);
const overlay = ref(null);
const guideContentStyle = ref({});

const currentStepTitle = computed(() => steps[currentStep.value].title);
const currentStepContent = computed(() => steps[currentStep.value].content);
const currentStepAction = computed(() => steps[currentStep.value].action);
const isLastStep = computed(() => currentStep.value === steps.length - 1);
const isFirstStep = computed(() => currentStep.value === 0);

function showGuide() {
  isVisible.value = true;
  disableScroll();
  nextTick(() => {
    setTimeout(() => {
      highlightElement(steps[currentStep.value].element);
    }, 300);  // 延遲 300 毫秒
  });
}

function closeGuide() {
  isVisible.value = false;
  enableScroll();
  currentStep.value = 0;
  if (overlay.value) {
    overlay.value.style.clipPath = 'none';
  }
}

function nextStep() {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++;
    nextTick(() => {
      setTimeout(() => {
        if (currentStep.value === steps.length - 1) {
          showCongratulations();
        } else {
          highlightElement(steps[currentStep.value].element);
        }
      }, 300);  // 延遲 300 毫秒
    });
  } else {
    closeGuide();
  }
}

function prevStep() {
  if (currentStep.value > 0) {
    currentStep.value--;
    nextTick(() => {
      setTimeout(() => {
        highlightElement(steps[currentStep.value].element);
      }, 300);  // 延遲 300 毫秒
    });
  }
}

function highlightElement(selectors) {
  if (currentStep.value === steps.length - 1) {
    showCongratulations();
    return;
  }

  nextTick(() => {
    const elements = document.querySelectorAll(selectors);
    if (elements.length && overlay.value) {
      const rects = Array.from(elements).map(el => el.getBoundingClientRect());
      const padding = 10; // 添加10px的緩衝區
      const combinedRect = rects.reduce((acc, rect) => {
        return {
          top: Math.min(acc.top, rect.top) - padding,
          left: Math.min(acc.left, rect.left) - padding,
          right: Math.max(acc.right, rect.right) + padding,
          bottom: Math.max(acc.bottom, rect.bottom) + padding
        };
      }, rects[0]);

      console.log(`Highlighting elements: ${selectors}`);
      console.log(`Combined bounds: `, combinedRect);

      overlay.value.style.clipPath = `polygon(
        0% 0%,
        0% 100%,
        100% 100%,
        100% 0%,
        ${combinedRect.left}px 0%,
        ${combinedRect.left}px ${combinedRect.top}px,
        ${combinedRect.right}px ${combinedRect.top}px,
        ${combinedRect.right}px ${combinedRect.bottom}px,
        ${combinedRect.left}px ${combinedRect.bottom}px,
        ${combinedRect.left}px 0%
      )`;
      overlay.value.style.pointerEvents = 'auto';

      adjustGuideContentPosition(combinedRect);

    } else {
      console.error("Elements or overlay not found", elements, overlay.value);
    }
  });
}

function adjustGuideContentPosition(targetRect) {
  const guideContent = document.querySelector('.guide-content');
  if (guideContent) {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const guideContentRect = guideContent.getBoundingClientRect();

    let top = '50%';
    let left = '50%';
    let transform = 'translate(-50%, -50%)';

    if (targetRect.bottom + guideContentRect.height > viewportHeight) {
      top = `${targetRect.top - guideContentRect.height - 10}px`;
      transform = 'translate(0, 0)';
    } else {
      top = `${targetRect.bottom + 10}px`;
      transform = 'translate(0, 0)';
    }

    if (targetRect.left + guideContentRect.width > viewportWidth) {
      left = `${viewportWidth - guideContentRect.width - 10}px`;
    } else {
      left = `${targetRect.left}px`;
    }

    guideContentStyle.value = { top, left, transform };
  }
}

function showCongratulations() {
  guideContentStyle.value = {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'fixed'
  };
  overlay.value.style.clipPath = 'none';
}

watch(() => props.filteredSearchResults, (newResults) => {
  console.log('Filtered search results changed:', newResults);
  if (newResults.length > 0) {
    setTimeout(() => {
      highlightElement('.search-results');
    }, 300); // 增加延遲以確保搜索結果完全渲染
  }
});

const searchResultsObserver = new MutationObserver((mutations) => {
  console.log('Search results DOM changed', mutations);
  setTimeout(() => {
    highlightElement('.search-results');
  }, 300); // 增加延遲以確保搜索結果完全渲染
});

onMounted(() => {
  const searchResultsElement = document.querySelector('.search-results');
  if (searchResultsElement) {
    searchResultsObserver.observe(searchResultsElement, { childList: true, subtree: true });
  }
  window.addEventListener('resize', handleResize);
  showGuide();
});

onBeforeUnmount(() => {
  searchResultsObserver.disconnect();
  window.removeEventListener('resize', handleResize);
  enableScroll();
});

const handleResize = () => {
  if (isVisible.value) {
    setTimeout(() => {
      highlightElement('.search-results');
    }, 300); // 增加延遲以確保搜索結果完全渲染
  }
};

function disableScroll() {
  document.body.style.overflow = 'hidden';
}

function enableScroll() {
  document.body.style.overflow = 'auto';
}
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  pointer-events: none;
}

.guide-content {
  position: fixed;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  z-index: 1001;
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
