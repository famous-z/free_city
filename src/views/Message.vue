<template>
  <div class="unreadMessage">
    <div class="message">
      <div class="newMessage">
        <panel>
          <template #header>
            <div class="title">
              <span>新消息</span>
            </div>
          </template>
          <template #content>
            <div class="content" v-if="newMessage">
              <span v-if="newMessage.length===0">无消息</span>
              <div class="content" v-for="(item, ind) in newMessage" :key="ind">
                <router-link
                  :to="{
                    name: 'UserDetails',
                    params: { loginname: item.author.loginname },
                  }"
                  >{{ item.author.loginname }}</router-link
                >
                <span>回复了你的话题</span>
                <router-link
                  :to="{ name: 'Topic', params: { topicId: item.topic.id } }"
                  >{{ item.topic.title }}</router-link
                >
              </div>
            </div>
          </template>
        </panel>
      </div>
      <hr />
      <div class="oldMessage" v-if="oldMessage">
        <panel>
          <template #header>
            <div class="title">
              <span>过往消息</span>
            </div>
          </template>
          <template #content>
            <span v-if="oldMessage.length===0">无消息</span>
            <div class="content" v-for="(item, ind) in oldMessage" :key="ind">
              <router-link
                :to="{
                  name: 'UserDetails',
                  params: { loginname: item.author.loginname },
                }"
                >{{ item.author.loginname }}</router-link
              >
              <span>回复了你的话题</span>
              <router-link
                :to="{ name: 'Topic', params: { topicId: item.topic.id } }"
                >{{ item.topic.title }}</router-link
              >
            </div>
          </template>
        </panel>
      </div>
    </div>
    <div class="userData">
      <user-data />
    </div>
  </div>
</template>

<script>
import panel from "../layout/panel.vue";
import UserData from "../layout/userData.vue";
export default {
  data() {
    return {
      newMessage: null,
      oldMessage: null,
    };
  },
  components: { panel, UserData },
  async created() {
    this.$store.commit(
      "getUserData",
      JSON.parse(sessionStorage.getItem("userData"))
    );
    const accesstoken = sessionStorage.getItem("token");
    this.$axios
      .get(`messages?accesstoken=${accesstoken}&&mdrender=false`)
      .then((res) => {
        this.oldMessage = res.data.has_read_messages;
        this.newMessage = res.data.hasnot_read_messages;
      });
  },
};
</script>

<style lang="less" scoped>
.unreadMessage {
  display: flex;
  justify-content: center;
  .newMessage {
    width: 900px;
    .title span {
      padding-left: 20px;
      line-height: 50px;
    }
    .content {
      padding-left: 20px;
      line-height: 50px;
    }
  }
  .oldMessage {
    width: 900px;
    .title span {
      padding-left: 20px;
      line-height: 50px;
    }
    .content {
      padding-left: 20px;
      line-height: 50px;
    }
  }
  .userData {
    margin-left: 50px;
  }
}
</style>