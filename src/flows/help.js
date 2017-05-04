'use strict'

module.exports = (app) => {
  let slapp = app.slapp

  let help = {
    "text": "嗨，我是你專屬的 Room Service 管家 Steve :tophat: ，我能夠幫你加快會議效率，讓你提早下班唷 :heart: \n你可以試試看輸入以下的指令：\n`1` 查詢現在半小時內的空會議室\n`2` 查詢現在一小時內的空會議室\n `MMDD HHMM HHMM` 查詢指定時間的空會議室，範例： `0505 1300 1330` 。"
  }

  slapp.command('/inorout', /^\s*help\s*$/, (msg) => {
    msg.respond(help)
  })

  slapp.message('help', ['direct_mention', 'direct_message'], (msg, text) => {
    msg.say(help)
  })

  slapp.event('bb.team_added', function (msg) {
    slapp.client.im.open({ token: msg.meta.bot_token, user: msg.meta.user_id }, (err, data) => {
      if (err) {
        return console.error(err)
      }
      let channel = data.channel.id

      msg.say({ channel: channel, text: 'Thanks for adding me to your team!' })
      msg.say({ channel: channel, text: help })
    })
  })

  return {}
}
