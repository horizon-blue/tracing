import Polyglot from 'node-polyglot';
import zh from './zh';
import en from './en';

export default {
  en: new Polyglot({
    locale: 'en',
    phrases: en,
  }),
  zh: new Polyglot({
    locale: 'zh',
    phrases: zh,
  }),
};
