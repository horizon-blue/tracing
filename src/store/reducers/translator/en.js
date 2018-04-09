import Polyglot from 'node-polyglot';

export default new Polyglot({
  locale: 'en',
  phrases: {
    header: '~ This is a placeholder for Header ~',
    menuBlog: 'Blog',
    menuOtherLanguage: '中文',
    menuLogin: 'Login',
    menuLogout: 'Logout',
    menuAbout: 'About',
    tags: 'Tags',
    category: 'Category',
    updatedAt: 'Last update',
    blogPostedAt: '%{name} posted at %{date}',
  },
});
