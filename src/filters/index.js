import Vue from 'vue'
Vue.filter('getPostChineseTab', (post) => post.top ? '置顶' : post.good ? '精华' : post.tab === 'share' ? '分享' : post.tab === 'ask' ? '问答' : post.tab === 'job' ? '招聘' : '测试')

import moment from 'moment'
moment.locale('zh-cn')
// 获取最后评论和当前时间的时间差
Vue.filter('fromatDataFromNow',(dataStr)=>{
    return moment(dataStr).fromNow()
})