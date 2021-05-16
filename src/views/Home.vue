<template>
  <div class="home">
    <panel>
      <template #header>
        <div class="nav">
          <router-link
            :class="{
              'swiper-line': true,
              active: $route.params.tab === undefined,
            }"
            to="/"
            >首页</router-link
          >
          <router-link
            :class="{
              'swiper-line': true,
              active: $route.params.tab === 'good',
            }"
            to="/good"
            >精华</router-link
          >
          <router-link
            :class="{
              'swiper-line': true,
              active: $route.params.tab === 'share',
            }"
            to="/share"
            >分享</router-link
          >
          <router-link
            :class="{
              'swiper-line': true,
              active: $route.params.tab === 'ask',
            }"
            to="/ask"
            >问答</router-link
          >
          <router-link
            :class="{
              'swiper-line': true,
              active: $route.params.tab === 'job',
            }"
            to="/job"
            >招聘</router-link
          >
          <router-link
            :class="{
              'swiper-line': true,
              active: $route.params.tab === 'dev',
            }"
            to="/dev"
            >客户端测试</router-link
          >
        </div>
      </template>
      <template #content>
        <div class="content">
          <div class="posts" v-if="posts.length">
            <el-table :data="posts" border>
              <el-table-column align="center" label="作者" width="100">
                <template v-slot="{ row }">
                  <router-link
                    :to="{
                      name: 'UserDetails',
                      params: { loginname: row.author.loginname },
                    }"
                    ><el-avatar
                      shape="square"
                      v-model="row.author"
                      :src="row.author.avatar_url"
                    ></el-avatar
                  ></router-link>
                </template>
              </el-table-column>
              <el-table-column align="center" label="回复/浏览量" width="100">
                <template v-slot="{ row }">
                  <span>{{ `${row.reply_count}/${row.visit_count}` }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="类别" width="100">
                <template v-slot="{ row }">
                  <span
                    :class="
                      row.top || row.good
                        ? 'special-tab topic-title'
                        : 'tab topic-title'
                    "
                    >{{ row | getPostChineseTab }}</span
                  >
                </template>
              </el-table-column>
              <el-table-column align="center" label="标题" width="510">
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
          <span v-else>❄加载中。。。</span>
        </div>
      </template>
    </panel>
    <div class="userData">
      <user-data />
    </div>
  </div>
</template>

<script>
import panel from "../layout/panel.vue";
import UserData from "../layout/userData.vue";

export default {
  components: { panel, UserData },
  name: "Home",
  data() {
    return {
      posts: [],
    };
  },
  watch: {
    // 点击不同的类别切换路由
    "$route.params.tab": {
      async handler(newValue) {
        let res = null;
        if (newValue) {
          res = await this.$axios.get(`/topics?page=1&limt=40&tab=${newValue}`);
          this.posts = res.data;
        } else {
          res = await this.$axios.get(`/topics?page=1&limt=40`);
          this.posts = res.data;
        }
      },
      immediate: true,
    },
  },
  created() {
    // 给vuex添加 userData 数据
    this.$store.commit(
      "getUserData",
      JSON.parse(sessionStorage.getItem("userData"))
    );
  },
};
</script>
<style lang="less" scoped>
@import url("../assets/global.less");
.home {
  opacity: 0.75;
  width: 60%;
  margin: 0 auto;
  margin-left: 13%;
  .nav {
    .swiper-line.active {
      color: @main-color;
    }
    top: 100px;
    a {
      margin: 0 2%;
      font-size: 14pt;
      line-height: 50px;
    }
  }
  .content {
    .topic-title {
      display: block;
      width: 42px;
      height: 22px;
      margin-left: 20px;
      border-radius: 5px;
    }
    .special-tab {
      background-color: #80bd01;
      color: white;
    }
  }
  .userData {
    position: absolute;
    right: 55px;
    top: 50px;
    width: 43%;
  }
}
</style>
