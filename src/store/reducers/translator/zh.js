import Polyglot from 'node-polyglot';

export default new Polyglot({
  locale: 'zh',
  phrases: {
    header: '~ 这是一个标题 ~',
    menuBlog: '博客',
    menuOtherLanguage: 'English',
    menuLogin: '登录',
    menuLogout: '登出',
    menuAbout: '关于',
    blogPostedAt: '%{name} 发布于 %{date}',
  },
});
