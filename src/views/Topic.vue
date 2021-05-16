<template>
  <div class="topic" v-if="articleDetails">
    <div class="article">
      <div class="title">
        <span class="good" v-if="articleDetails.good">精华</span>
        <span class="top" v-if="articleDetails.top">置顶</span>
        <h2>{{ articleDetails.title }}</h2>
      </div>
      <div class="details">
        <ul>
          <li>发布于{{ articleDetails.create_at | fromatDataFromNow }}</li>
          <li>作者{{ author.loginname }}</li>
          <li>浏览量{{ articleDetails.visit_count }}</li>
        </ul>
        <el-button
          @click="changecollect(articleDetails.id)"
          v-if="articleDetails.is_collect"
          class="collect"
          size="mini"
          type="info"
          >取消收藏</el-button
        >
        <el-button
          @click="changecollect(articleDetails.id)"
          v-else
          class="collect"
          size="mini"
          type="success"
          >收藏</el-button
        >
      </div>
      <hr />
      <div class="content" v-html="articleDetails.content"></div>
      <div class="reply">
        <panel>
          <template #header>
            <h2 style="padding-left: 20px">评论</h2>
          </template>
          <template #content>
            <div
              class="replies"
              v-for="(message, ind) in articleDetails.replies"
              :key="message.id"
            >
              <div class="author">
                <div class="show">
                  <router-link
                    :to="{
                      name: 'UserDetails',
                      params: { loginname: message.author.loginname },
                    }"
                    ><el-avatar
                      shape="square"
                      :src="message.author.avatar_url"
                    ></el-avatar
                  ></router-link>
                  <div class="authorName">{{ message.author.loginname }}</div>
                  <span
                    >{{ ind + 1 }}楼·{{
                      message.create_at | fromatDataFromNow
                    }}</span
                  >
                </div>
                <div class="operation">
                  <span
                    @click="changeUped(ind, message.id)"
                    :class="{ likeActive: message.is_uped, like: true }"
                    >{{ message.ups.length ? message.ups.length : "" }}</span
                  >
                  <span
                    class="comment"
                    @click="showText(message.id, message.author.loginname)"
                  >
                  </span>
                </div>
              </div>
              <div class="content" v-html="message.content"></div>
              <div class="reply">
                <div
                  class="text"
                  ref="replyText"
                  v-if="showReplyId === message.id"
                >
                  <Editor
                    output-format="text"
                    api-key="9mieih2cqsubf30b1omff3w107ojvjfvzhmb7haq4giiy754"
                    v-model="replayText"
                    :init="{
                      elementpath: false,
                      branding: false,
                      height: 250,
                      menubar: true,
                      language: 'zh_CN',
                      plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount',
                      ],
                      toolbar:
                        'code undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | \
    styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | \
    table image media charmap emoticons hr pagebreak insertdatetime print preview | fullscreen | bdmap indent2em lineheight formatpainter axupimgs',
                    }"
                  />
                  <el-button type="primary" @click="reply(message.reply_id)"
                    >回复</el-button
                  >
                </div>
              </div>
              <hr />
            </div>
          </template>
        </panel>
        <div class="text">
          <Editor
            output-format="text"
            api-key="9mieih2cqsubf30b1omff3w107ojvjfvzhmb7haq4giiy754"
            v-model="commentText"
            :init="{
              elementpath: false,
              branding: false,
              height: 250,
              menubar: true,
              language: 'zh_CN',
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount',
              ],
              toolbar:
                'code undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | \
    styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | \
    table image media charmap emoticons hr pagebreak insertdatetime print preview | fullscreen | bdmap indent2em lineheight formatpainter axupimgs',
            }"
          />
          <el-button type="primary" @click="comment">回复</el-button>
        </div>
      </div>
    </div>
    <div class="author">
      <panel>
        <template #header>
          <div class="title">
            <h2>作者</h2>
          </div>
        </template>
        <template #content>
          <div class="authorData">
            <div class="box">
              <router-link
                :to="{
                  name: 'UserDetails',
                  params: { loginname: articleDetails.author.loginname },
                }"
                ><el-avatar shape="square" :src="author.avatar_url"></el-avatar
              ></router-link>

              <span class="authorName">{{ author.loginname }}</span>
            </div>
          </div>
        </template>
      </panel>
    </div>
  </div>
</template>

<script>
import panel from "../layout/panel.vue";
import Editor from "@tinymce/tinymce-vue";
import moment from "moment";
export default {
  components: { panel, Editor },
  data() {
    return {
      // 文章详情
      articleDetails: null,
      author: null,
      // 评论的数据
      commentText: "",
      // 回复的Id
      showReplyId: 0,
      // 回复的数据
      replayText: "",
    };
  },
  async created() {
    await this.$axios
      .get(
        `/topic/${
          this.$route.params.topicId
        }?accesstoken=${sessionStorage.getItem("token")}`
      )
      .then((res) => {
        this.articleDetails = res.data;
        this.author = res.data.author;
      });
  },
  methods: {
    // 展示回复的富文本展示器
    showText(id, text) {
      this.showReplyId = id;
      this.replayText = `@${text}`;
      this.$nextTick(function () {
        this.$refs.replyText[0].focus();
      });
    },
      // 改变收藏状态
    async changecollect(id) {
      this.articleDetails.is_collect = !this.articleDetails.is_collect;
      if (this.articleDetails.is_collect) {
        await this.$axios.post(`/topic_collect/collect`, {
          accesstoken: sessionStorage.getItem("token"),
          topic_id: id,
        });
      } else {
        await this.$axios.post(`/topic_collect/de_collect`, {
          accesstoken: sessionStorage.getItem("token"),
          topic_id: id,
        });
      }
    },
    // 改变点赞状态
    async changeUped(ind, id) {
      this.articleDetails.replies[ind].is_uped = !this.articleDetails.replies[
        ind
      ].is_uped;
      if (this.articleDetails.replies[ind].is_uped) {
        this.articleDetails.replies[ind].ups.push(
          sessionStorage.getItem("token")
        );
      } else {
        this.articleDetails.replies[ind].ups = this.articleDetails.replies[
          ind
        ].ups.filter((item) => item !== sessionStorage.getItem("token"));
      }
      await this.$axios.post(`/reply/${id}/ups`, {
        accesstoken: sessionStorage.getItem("token"),
      });
    },
    // 评论
    comment() {
      const newComment = {
        author: {
          avatar_url: JSON.parse(sessionStorage.getItem("userData")).avatar_url,
          loginname: JSON.parse(sessionStorage.getItem("userData")).loginname,
        },
        content: this.commentText,
        create_at: moment().format(),
        id: JSON.parse(sessionStorage.getItem("userData")).id,
        is_uped: false,
        reply_id: null,
        ups: [],
      };

      this.$axios.post(`/topic/${this.articleDetails.id}/replies`, {
        accesstoken: sessionStorage.getItem("token"),
        content: this.commentText,
      });
      this.articleDetails.replies.push(newComment);
      this.commentText = "";
    },
    // 回复
    reply(id) {
      const newReply = {
        author: {
          avatar_url: JSON.parse(sessionStorage.getItem("userData")).avatar_url,
          loginname: JSON.parse(sessionStorage.getItem("userData")).loginname,
        },
        content: this.replayText,
        create_at: moment().format(),
        id: JSON.parse(sessionStorage.getItem("userData")).id,
        is_uped: false,
        reply_id: id,
        ups: [],
      };
      console.log(this.replayText);
      this.$axios.post(`/topic/${this.articleDetails.id}/replies`, {
        accesstoken: sessionStorage.getItem("token"),
        content: this.replayText,
        reply_id: id,
      });
      this.articleDetails.replies.push(newReply);
      (this.showReplyId = 0), (this.replayText = "");
    },
  },
};
</script>

<style lang="less" scoped>
@import url("../assets/global.less");
.topic {
  display: flex;
  justify-content: center;
  .article {
    width: 60%;
    .title {
      display: flex;
      .top {
        margin-top: 10px;
        background-color: @main-color;
        height: 20px;
      }
      .good {
        margin-top: 10px;
        background-color: @main-color;
        height: 20px;
      }
      h2 {
        margin: 0;
        line-height: 40px;
      }
    }
    .details {
      ul {
        display: flex;
        margin: 0;
        padding-left: 20px;
        li {
          list-style: disc;
          margin-left: 25px;
          text-indent: -5px;
          font-size: 10pt;
        }
      }
      .collect {
        margin-left: 80%;
      }
    }
    .reply {
      .replies {
        .text {
          margin-bottom: 0;
        }
      }
      .author {
        margin-left: 0;
        display: flex;
        justify-content: space-between;
        .show {
          display: flex;
          .authorName {
            margin-top: 20px;
          }
          span {
            margin-top: 15px;
            font-size: 10pt;
          }
        }
        .operation {
          margin-top: 20px;
          margin-right: 15px;
          display: flex;
          .like {
            display: block;
            width: 20px;
            height: 20px;
            text-indent: 22px;
            background-image: url("../assets/images/like.png");
            background-size: contain;
          }
          .likeActive {
            background-image: url("../assets/images/likeActive.png");
          }
          .comment {
            display: block;
            width: 20px;
            height: 20px;
            background-image: url("../assets/images/comment.png");
            background-size: contain;
            margin-left: 25px;
          }
        }
      }
      .content {
        margin-left: 50px;
      }
      .text {
        margin-bottom: 200px;
      }
    }
  }
  .author {
    margin-left: 50px;
    .title {
      width: 250px;
      padding-left: 20px;
      h2 {
        line-height: 50px;
      }
    }
    .authorData {
      margin-top: 20px;
      margin-left: 20px;
      .box {
        display: flex;
        .authorName {
          display: block;
          margin-left: 20px;
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
<style>
.markdown-text p img {
  width: 100%;
}
</style>