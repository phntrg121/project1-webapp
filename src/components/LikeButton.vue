<template>
  <div class="like_button">
    <button @click="onLikePress">
      <svg viewBox="0 0 24 24" focusable="false" :class="[(isLiked)?'liked':'not_liked']">
        <g class="style-scope yt-icon"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"></path></g>
      </svg>
    </button>
    <label :class="[(isLiked)?'liked':'not_liked']">{{likes}}</label>
  </div>
</template>

<script>
export default {
  name: 'like button',
  props:{
    likes: Number,
    isLiked: Boolean
  },
  methods: {
    onLikePress(){
      this.$emit('onPress')
    }
  }
}
</script>

<style scoped>
.like_button{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.like_button button{
  background: transparent;
  width: 20px;
  height: 20px;
  border: 0;
  border-radius: 0;
  display: flex;
  padding: 0;
  justify-content: center;
  align-items: center;
}
.like_button svg{
  width: 16px;
  height: 16px;
}
.like_button label{
  margin-left: 10px;
}

.liked{
  fill: blue;
  color: blue;
}
.not_liked{
  fill: #909090;
  color: #909090;
}

</style>
