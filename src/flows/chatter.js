'use strict'

const handleHowAreYou = 'chatter:handleHowAreYou'

module.exports = (app) => {
  let slapp = app.slapp

  // slapp.message('^(hi|hello|hey)$', ['direct_mention', 'direct_message'], (msg, text) => {
  //   msg
  //     .say(text + ', how are you?')
  //     .route(handleHowAreYou, {}, 60)
  // })
  //
  // slapp.route(handleHowAreYou, (msg) => {
  //   var resp = msg.body.event && msg.body.event.text
  //
  //   if (new RegExp('good', 'i').test(resp)) {
  //     msg
  //       .say(['Great! Ready?', ':smile: Are you sure?'])
  //       .route(handleHowAreYou, 60)
  //   } else {
  //     msg.say('Me too')
  //   }
  // })
  //
  // slapp.message('^(thanks|thank you)', ['mention', 'direct_message'], (msg) => {
  //   msg.say(['You are welcome', 'Of course'])
  // })
  //
  // slapp.message('good night|bye', ['mention', 'direct_message'], (msg) => {
  //   msg.say(['Cheers :beers:', 'Bye', 'Goodbye', 'Adios'])
  // })
  //
  // slapp.message('.*', ['direct_mention', 'direct_message'], (msg) => {
  //   // respond only 40% of the time
  //   if (Math.random() < 0.4) {
  //     msg.say([':wave:', ':pray:', ':raised_hands:'])
  //   }
  // })

  slapp.message('play',(msg, text, match1) => {
    var myMsg = {
      text: 'Would you like to play a game?',
      attachments: [
        {
          text: 'Choose a game to play',
          fallback: 'fallback',
          callback_id: 'wopr_game',
          color: '#3AA3E3',
          attachment_type: 'default',
          actions: [
              {
                  name: 'game',
                  text: 'Chess',
                  type: 'button',
                  value: 'chess'
              },
              {
                  name: 'game',
                  text: 'Falken\'s Maze',
                  type: 'button',
                  value: 'maze'
              },
              {
                  name: 'game',
                  text: 'Thermonuclear War',
                  style: 'danger',
                  type: 'button',
                  value: 'war',
                  confirm: {
                      title: 'Are you sure?',
                      text: 'Wouldn\'t you prefer a good game of chess?',
                      ok_text: 'Yes',
                      dismiss_text: 'No'
                  }
              }
          ]
        }
      ]
    };
    msg.say(myMsg);
    // }).route('handlePlay')
  })

  slapp.message('kylezzz (.*)',['direct_message'], (msg, text, match1) => {
    // if (msg.type !== 'action') {
    //   msg.say('you must choose a button!').route('handleHi', state)
    // }
    msg.say('how are you').route('handleHi',{ what: match1 })
  })

  slapp.route('handleHi', (msg, state) => {
    msg.say(':smile: ' + state.what)
  })

  slapp.route('handlePlay', (msg) => {
    if (msg.type !== 'action') {
      msg.say('you must choose a button!').route('handlePlay')
    }
  })

  slapp.action('wopr_game','game',(msg,val) => {
    // msg.respond('you chose ' + val)

    var http = require('http');
    var options = {
      host: 'mbigtest.ddns.net',
      path: '/'
    };

    var req = http.get(options, function(response) {
      // console.log('STATUS: ' + response.statusCode);
      // console.log('HEADERS: ' + JSON.stringify(response.headers));

      // console.log(`${response}`);
      // Buffer the body entirely for processing as a whole.
      // console.log(JSON.stringify(response[0]));

      var bodyChunks;
      response.on('data', function(chunk) {
        // You can process streamed parts here...
        // bodyChunks.push(chunk);
        console.log(`${chunk}`);
        msg.say(chunk);
        // bodyChunks = chunk;
      }).on('end', function() {
        // var body = Buffer.concat(bodyChunks);
        // var jsonchunk = JSON.parse(bodyChunks);
        // console.log('BODY: ' + body);
        // bodyChunks.text = 'bodychunks';
        // jsonchunk.text = 'jsonchunk';
        // body.text = 'body';

        // console.log(`${bodyChunks}`);
        // console.log(`${jsonchunk}`);
        // console.log(`${body}`);

        // msg.say(bodyChunks);
        // ...and/or process the entire body here.
      })
    });

    req.on('error', function(e) {
      console.log('ERROR: ' + e.message);
    });
  })

}
