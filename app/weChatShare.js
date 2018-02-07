// service
import WxShare from 'weixin-share';

// picture
import weChatSharePic from '../static/images/noUrl/weChatSharePic.png';

let
  defaultData = {
    imgUrl: window.location.href.replace(/\/[^/]*$/g, '') + '/' + weChatSharePic,
    title: '分享标题',
    desc: '分享小标题',
  }
  , wxShareConfig = JSON.parse(sessionStorage.getItem('wxShareConfig'))
;


new WxShare().config(wxShareConfig).share(defaultData);
