import Polyglot from 'node-polyglot';
import zh from './zh-cn';
import en from './en';

export default {
  en: new Polyglot({
    locale: 'en',
    phrases: en,
  }),
  'zh-cn': new Polyglot({
    locale: 'zh-cn',
    phrases: zh,
  }),
};
