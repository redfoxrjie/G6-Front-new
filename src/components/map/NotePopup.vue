<template>
    <!-- 當 isOpen 為 true 時顯示彈出層 -->
    <div v-if="isOpen" class="note-popup-overlay">
      <div class="note-popup-content">
        <!-- 關閉按鈕 -->
        <div class="tab-close" @click="close">×</div>
        
        <!-- 筆記標題區域 -->
        <div class="note-popup-header">
          <img :src="noteIcon" alt="筆記圖標" class="tab-icon" />
          <div class="tab-text">筆記</div>
        </div>
        
        <!-- 筆記內容區域 -->
        <div class="note-popup-body">
          <!-- 顯示模式 -->
          <div v-if="!editMode" class="note-display">
            <h3>{{ noteTitle }}</h3>
            <p>{{ noteContent }}</p>
            <div class="note-popup-footer">
              <button class="edit-button" @click="toggleEditMode">編輯</button>
            </div>
          </div>
          <!-- 編輯模式 -->
          <div v-else>
            <input type="text" v-model="noteTitle" placeholder="請輸入標題" />
            <textarea v-model="noteContent" placeholder="請輸入內容"></textarea>
            <div class="note-popup-footer">
              <button @click="saveNote">儲存</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  // 導入筆記圖標
  import noteIcon from '/src/assets/images/global/icons/note-icon.svg';
  
  export default {
    props: {
      // 控制彈出層是否顯示
      isOpen: Boolean,
      // 初始標題
      initialTitle: {
        type: String,
        default: ''
      },
      // 初始內容
      initialContent: {
        type: String,
        default: ''
      }
    },
    data() {
      // 從本地存儲中獲取保存的筆記
      const savedNote = localStorage.getItem('note');
      return {
        noteTitle: this.initialTitle,
        noteContent: savedNote ? JSON.parse(savedNote).content : this.initialContent,
        editMode: false, // 控制是否處於編輯模式
        noteIcon // 筆記圖標路徑
      };
    },
    watch: {
      // 監聽 props 的變化，更新本地數據
      initialTitle(newValue) {
        this.noteTitle = newValue;
      },
      initialContent(newValue) {
        this.noteContent = newValue;
      }
    },
    methods: {
      // 保存筆記
      saveNote() {
        const note = { title: this.noteTitle, content: this.noteContent };
        localStorage.setItem('note', JSON.stringify(note));
        this.$emit('save', note);
        this.editMode = false;
      },
      // 關閉彈出層
      close() {
        this.$emit('close');
      },
      // 切換編輯模式
      toggleEditMode() {
        this.editMode = !this.editMode;
      }
    },
    mounted() {
      // 組件掛載時，從本地存儲加載筆記
      const savedNote = localStorage.getItem('note');
      if (savedNote) {
        const parsedNote = JSON.parse(savedNote);
        this.noteTitle = parsedNote.title;
        this.noteContent = parsedNote.content;
      }
      // 記錄筆記圖標路徑（用於調試）
      console.log('筆記圖標路徑:', this.noteIcon);
    }
  };
  </script>
  
  <style lang="scss" scoped>
  // 彈出層覆蓋整個屏幕
  .note-popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  // 彈出內容的主要容器
  .note-popup-content {
    width: 90%;
    max-width: 400px;
    background-color: white;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    padding: 0;
    position: relative;
    box-sizing: border-box;
  }
  
  // 筆記標題區域樣式
  .note-popup-header {
    display: flex;
    align-items: center;
    padding: 20px;
    border-bottom: 2px solid #ddd;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  
    .tab-icon {
      width: 24px;
      height: 24px;
      margin-right: 10px;
    }
  
    .tab-text {
      font-size: 18px;
      color: #007bff;
      font-weight: bold;
    }
  }
  
  // 關閉按鈕樣式
  .tab-close {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 24px;
    color: #007bff;
    z-index: 2;
  }
  
  // 筆記內容區域樣式
  .note-popup-body {
    padding: 20px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  
    input,
    textarea {
      margin-bottom: 15px;
      padding: 10px;
      border: 1px solid #007bff;
      border-radius: 4px;
      font-size: 16px;
      width:94%;
  
      &::placeholder {
        color: #4f82d4;
      }
    }
  
    textarea {
      height: 200px;
      resize: none;
    }
  
    .note-display {
      h3 {
        margin-bottom: 10px;
        font-size: 18px;
        color: #4f82d4;
      }
  
      p {
        margin-bottom: 20px;
        font-size: 16px;
        color: #4f82d4;
      }
    }
  }
  
  // 底部按鈕區域樣式
  .note-popup-footer {
    padding: 10px 20px;
    display: flex;
    justify-content: center;
    border-top: 1px solid #ddd;
    box-sizing: border-box;
  
    button {
      width: 80%;
      padding: 10px 0;
      border: none;
      border-radius: 20px;
      background-color: #007bff;
      color: white;
      cursor: pointer;
      font-size: 16px;
    }
  
    .edit-button {
      background-color: white;
      color: #007bff;
      border: 1px solid #007bff;
    }
  }
  </style>