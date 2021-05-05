<template>
  <div class="comment">
    <div class="author">
      <img :src="comment.avatar">
      <div>
        <label>{{comment.from}}</label>
        <p>{{comment.content}}</p>
        <div>
          <button>{{comment.likes}} like</button>
        </div>
      </div>
    </div>
    <div class="reply">
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props:{
    comment: Object
  },
}
</script>

<style scoped>
.author{
  display: flex;
}

.author img{
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: transparent;
}

.author label,
.author p{
  margin: 0px 0px 10px 10px;
  word-wrap: normal;
}

.author label{
  font-size: 14px;
  font-weight: bold;
}

.author p{
  font-size: 14px;
}

</style>
