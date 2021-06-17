<template>
  <div class="notification_menu">
    <div class="notification_head">
      <label>Notifications</label>
      <button>
        <svg viewBox="0 0 24 24" focusable="false"><g><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.1-1.65c.2-.15.25-.42.13-.64l-2-3.46c-.12-.22-.4-.3-.6-.22l-2.5 1c-.52-.4-1.08-.73-1.7-.98l-.37-2.65c-.06-.24-.27-.42-.5-.42h-4c-.27 0-.48.18-.5.42l-.4 2.65c-.6.25-1.17.6-1.7.98l-2.48-1c-.23-.1-.5 0-.6.22l-2 3.46c-.14.22-.08.5.1.64l2.12 1.65c-.04.32-.07.65-.07.98s.02.66.06.98l-2.1 1.65c-.2.15-.25.42-.13.64l2 3.46c.12.22.4.3.6.22l2.5-1c.52.4 1.08.73 1.7.98l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.6-.25 1.17-.6 1.7-.98l2.48 1c.23.1.5 0 .6-.22l2-3.46c.13-.22.08-.5-.1-.64l-2.12-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"></path></g></svg>
      </button>
    </div>
    <div class="notification_list">
      <div v-for="item in notifications" :key="item">
        <div class="notification_item">
          <label>{{item}}</label>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "NotificationrMenu",
  data(){
    return {
      notifications: [
        "notify 1",
        "notify 2",
        "notify 3",
        "notify 4",
        "notify 5",
        "notify 6",
        "notify 7",
        "notify 8",
        "notify 9",
        "notify 10",
        "notify 11",
        "notify 12",
        "notify 13",
        "notify 14",
        "notify 15",
        "notify 16",
        "notify 17",
        "notify 18",
        "notify 19",
        "notify 20",
      ],
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.notification_menu{
  position: absolute;
  width: 320px;
  height: 480px;
  top: 50px;
  right: 60px;
  background: white;
  border: 1px solid #cecece;
  border-top: 0;
  z-index: 10;
}
.notification_head{
  width: calc(100% - 20px);
  height: 22px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #cecece;
}
.notification_head button{
  border: 0;
  padding: 0;
  background: transparent;
}
.notification_head svg{
  width: 22px;
  height: 22px;
  fill: #666;
}
.notification_list{
  width: 100%;
  height: calc(100% - 43px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
.notification_item{
  width: calc(100% - 20px);
  padding: 10px;
}
.notification_item:hover{
  background: #efefef;
}

::-webkit-scrollbar {
  width: 5px;
}

</style>
