<template>
  <div class="comment">
    <div class="commnet_author">
      <img :src="comment.avatar">
      <div>
        <label>{{comment.from}}</label>
        <p>{{comment.content}}</p>
        <div class="comment_react">
          <button>Like</button>
          <label>{{comment.likes}}</label>
          <label>REPLY</label>
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
.commnet_author{
  display: flex;
}

.commnet_author img{
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: transparent;
}

.commnet_author label,
.author p{
  margin: 0px 0px 10px 10px;
  word-wrap: normal;
}

.commnet_author label{
  font-size: 12px;
  font-weight: bold;
}

.commnet_author p{
  font-size: 14px;
}

.comment_react{
  color: #666;
}

</style>
