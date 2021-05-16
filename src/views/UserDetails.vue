<template>
  <div class="userDetails">
    <div class="authorDetails" v-if="userDetails">
      <panel>
        <template #header>
          <h2>作者详情</h2>
        </template>
        <template #content>
          <div class="content">
            <div class="author">
              <el-avatar
                shape="square"
                :src="userDetails.avatar_url"
              ></el-avatar>
              <span class="loginname">{{ userDetails.loginname }}</span>
            </div>
            <span>{{ userDetails.score }} 积分</span>
            <span class="github" v-if="userDetails.githubUsername"
              >@{{ userDetails.githubUsername }}</span
            >
          </div>
        </template>
      </panel>
    </div>
    <div class="recentTopics">
      <panel>
        <template #header>
          <h2>最近创建的话题</h2>
        </template>
        <template #content>
          <div class="content">
            <el-table :data="recent_topics" border>
              <el-table-column align="center" label="作者" width="100">
                <template v-slot="{ row }">
                  <router-link
                    :to="{
                      name: 'UserDetails',
                      params: { loginname: row.author.loginname },
                    }"
                    ><el-avatar
                      shape="square"
                      :src="row.author.avatar_url"
                    ></el-avatar
                  ></router-link>
                </template>
              </el-table-column>
              <el-table-column align="center" label="标题" width="799">
                <template v-slot="{ row }">
                  <router-link
                    :to="{ name: 'Topic', params: { topicId: row.id } }"
                    >{{ row.title }}</router-link
                  >
                </template>
              </el-table-column>
              <el-table-column align="center" label="最后评论" width="100">
                <template v-slot="{ row }">
                  <span>{{ row.last_reply_at | fromatDataFromNow }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </template>
      </panel>
    </div>
    <div class="recentReplies">
      <panel>
        <template #header>
          <h2>最近参与的话题</h2>
        </template>
        <template #content>
          <div class="content">
            <el-table :data="recent_replies" border>
              <el-table-column align="center" label="作者" width="100">
                <template v-slot="{ row }">
                  <router-link
                    :to="{
                      name: 'UserDetails',
                      params: { loginname: row.author.loginname },
                    }"
                    ><el-avatar
                      shape="square"
                      :src="row.author.avatar_url"
                    ></el-avatar
                  ></router-link>
                </template>
              </el-table-column>
              <el-table-column align="center" label="标题" width="799">
                <template v-slot="{ row }">
                  <router-link
                    :to="{ name: 'Topic', params: { topicId: row.id } }"
                    >{{ row.title }}</router-link
                  >
                </template>
              </el-table-column>
              <el-table-column align="center" label="最后评论" width="100">
                <template v-slot="{ row }">
                  <span>{{ row.last_reply_at | fromatDataFromNow }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </template>
      </panel>
    </div>
  </div>
</template>

<script>
import panel from "../layout/panel.vue";
export default {
  components: { panel },
  data() {
    return {
      userDetails: null,
      recent_replies: null,
      recent_topics: null,
    };
  },
  watch: {
    // 点击不同用户的时候刷新路由，如果不用监听器不会刷新路由
    '$route.params.loginname' :{
      immediate:true,
      async handler(newValue){
        const loginname = newValue
        const res = await this.$axios.get(`/user/${loginname}`);
        this.userDetails = res.data;
        this.recent_replies = res.data.recent_replies;
        this.recent_topics = res.data.recent_topics.slice(0,5);
      }
    }
  },
};
</script>

<style lang="less" scoped>
@import url("../assets/global.less");
.userDetails {
  opacity: 0.8;
  margin-left: 50%;
  transform: translateX(-500px);
  .authorDetails {
    width: 1000px;
    h2 {
      color: @main-color;
      line-height: 50px;
      margin: 0;
      text-indent: 10px;
      font-weight: normal;
      font-size: 16pt;
    }
    .content {
      margin-left: 10px;
      .author {
        display: flex;
        .loginname {
          margin-left: 15px;
          margin-top: 15px;
        }
      }
      span {
        display: block;
        margin: 5px 0;
      }
      .github {
        height: 20px;
        text-indent: 25px;
        background-size: contain;
        background-repeat: no-repeat;
        background-image: url("../assets/images/github.png");
      }
    }
  }
  .recentTopics {
    margin-top: 50px;
    width: 1000px;
    h2 {
      color: @main-color;
      line-height: 50px;
      margin: 0;
      text-indent: 10px;
      font-weight: normal;
      font-size: 16pt;
    }
  }
  .recentReplies {
    margin-top: 50px;
    width: 1000px;
    h2 {
      color: @main-color;
      line-height: 50px;
      margin: 0;
      text-indent: 10px;
      font-weight: normal;
      font-size: 16pt;
    }
  }
}
</style>