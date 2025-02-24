const express = require('express');
const bodyParser = require('body-parser');
const xmlBodyParser = require('express-xml-bodyparser');
const axios = require('axios');

const app = express();
app.use(xmlBodyParser());

const PORT = process.env.PORT || 80;

// 模拟图片存储
const imageMap = {
  "张三2025年春节1234": "MEDIA_ID_1",  // 假设这是微信素材库中的MediaId
  "李四2025年春节5678": "MEDIA_ID_2"
};

// 回复图片消息
function replyImage(toUser, mediaId) {
  return `
    <xml>
      <ToUserName><![CDATA[${toUser}]]></ToUserName>
      <FromUserName><![CDATA[${process.env.FROM_USER}]]></FromUserName>
      <CreateTime>${Math.floor(Date.now() / 1000)}</CreateTime>
      <MsgType><![CDATA[image]]></MsgType>
      <Image>
        <MediaId><![CDATA[${mediaId}]]></MediaId>
      </Image>
    </xml>
  `;
}

// 消息处理
app.post('/', async (req, res) => {
  const { xml } = req.body;
  const { ToUserName, FromUserName, Content } = xml;

  // 根据用户输入匹配图片
  const mediaId = imageMap[Content];
  if (mediaId) {
    res.send(replyImage(FromUserName, mediaId));
  } else {
    res.send(`
      <xml>
        <ToUserName><![CDATA[${ToUserName}]]></ToUserName>
        <FromUserName><![CDATA[${process.env.FROM_USER}]]></FromUserName>
        <CreateTime>${Math.floor(Date.now() / 1000)}</CreateTime>
        <MsgType><![CDATA[text]]></MsgType>
        <Content><![CDATA[未找到对应的图片，请检查输入是否正确]]></Content>
      </xml>
    `);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
