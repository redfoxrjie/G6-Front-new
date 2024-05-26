<template>
  <div class="about">
    <!-- 兩種取陣列數量的方法 -->
    <!-- 第一種 -->
    1.list有{{ list.length }}個
    <!-- 第二種 -->
    2.list有{{ count }}個
    <ul>
      <button @click="add">加入</button>
      <li v-for="item in list" :key="item.id">
        <template v-if="item.show">
          <a
            :href="item.link"
            :style="{
              color: '#315666'
            }"
          >
            {{ item.title }}
          </a>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  // name: 'box',
  data() {
    return {
      itemIndex: 2,
      list: [
        {
          id: 1,
          title: 'duck',
          color: '#ddd',
          link: 'https://www.google.com.tw/?hl=zh_TW'
        },
        {
          id: 2,
          title: 'dog',
          color: '#efa'
        },
        {
          id: 3,
          title: 'cat',
          color: '#333'
        }
      ]
    }
  },
  computed: {
    count() {
      return this.list.length
    }
  },
  methods: {
    add() {
      this.itemIndex += 1
      this.list.push({
        id: this.itemIndex,
        title: `test${this.itemIndex}`
      })
      // this.page = this.page + 1
      // this.page += 1
      // console.log(this.list)
    }
  }
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: rgb(255, 128, 196);
    text-shadow: 0 0 20px deeppink;
  }
  .about p {
    font-size: 20px;
  }
}
</style>
