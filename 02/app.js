// rapiro.js 02
// ブラウザからポージング
// Node.js + johnny-five + socket.io による遠隔制御と監視
// 　・ポージングする
// 　・socket.ioでhtmlから制御
// 2017.01.28　by Mitsuteru Kokubun
// 詳しくは以下を参照してください
// http://qiita.com/mkoku/items/490606b5c70eeb9e5ea3

'use strict';                           // 厳格モードにする

// httpサーバとsocket.ioの設定
const express = require('express');     // expressモジュールを使う
const app = express();                  // expressでアプリを作る
const server = require('http').Server(app);
const io = require('socket.io')(server);
server.listen(3000);
app.use(express.static(__dirname));     // ホームdirにあるファイルを使えるようにする
app.get('/', function (req, res) {      // アクセス要求があったら
    res.sendFile(__dirname + '/index.html');    // index.htmlを送る
});

// johnny-fiveの設定
const five = require('johnny-five');    // johnny-fiveモジュールを使う
const board = new five.Board({          // board制御ボードを取得
    port: '/dev/ttyAMA0'                // ポート名（環境による）
});
let   rapiroReady = false;

// グローバル変数
const SVONUM = 12;                  // サーボの個数
let   servo = [];                   // サーボアレイオブジェクト
const pinServoDC = 17;              // サーボに電源供給しているピン番号（17=A3ピン）
const LEDNUM = 3;                   // LEDの個数（RGB）
let   led = [];                     // LEDアレイオブジェクト

// trimオブジェクト
const trim = {
    name: 'trim',
    pose: {
        headYaw:               -7,
        waistYaw:              2,
        rightShoulderPitch:    0,
        rightShoulderRoll:     0,
        rightHandOpen:         0,
        leftShoulderPitch:     0,
        leftShoulderRoll:      10,
        leftHandOpen:          0,
        rightLegYaw:           -10,
        rightFootRoll:         6,
        leftLegYaw:            9,
        leftFootRoll:          -12
    },
    led: {
        R: 0,
        G: 0,
        B: 0
    },
    timeInMs: 0
};

// initialオブジェクト
const initial = {
    name: 'Initial Status',
    pose: {
        headYaw:               90,
        waistYaw:              90,
        rightShoulderPitch:    0,
        rightShoulderRoll:     130,
        rightHandOpen:         90,
        leftShoulderPitch:     180,
        leftShoulderRoll:      40,
        leftHandOpen:          90,
        rightLegYaw:           90,
        rightFootRoll:         90,
        leftLegYaw:            90,
        leftFootRoll:          90
    },
    led: {
        R: 127,
        G: 127,
        B: 127
    },
    timeInMs: 500
};


// オブジェクト変数を配列変数に変換する関数
function objToArray(obj) {
    let arr = [];
    arr[0]  = obj.pose.headYaw;
    arr[1]  = obj.pose.waistYaw
    arr[2]  = obj.pose.rightShoulderPitch;
    arr[3]  = obj.pose.rightShoulderRoll;
    arr[4]  = obj.pose.rightHandOpen;
    arr[5]  = obj.pose.leftShoulderPitch;
    arr[6]  = obj.pose.leftShoulderRoll;
    arr[7]  = obj.pose.leftHandOpen;
    arr[8]  = obj.pose.rightLegYaw;
    arr[9]  = obj.pose.rightFootRoll;
    arr[10] = obj.pose.leftLegYaw;
    arr[11] = obj.pose.leftFootRoll;
    arr[12] = obj.led.R;
    arr[13] = obj.led.G;
    arr[14] = obj.led.B;
    arr[15] = obj.timeInMs;
    return arr;
}


// ポージング関数
function posing(poseObj) {
    let poseArray = [];
    let trimArray = [];
    poseArray = objToArray(poseObj);
    trimArray = objToArray(trim);
    // 各サーボを指定ポーズに動かす
    for (let s = 0; s < SVONUM; s++) {
        servo[s].to(poseArray[s] + trimArray[s], poseArray[15]);
    }
    // 各LEDを指定の明るさ・色にする
    for(let l = 0; l < LEDNUM; l++) {
        led[l].fade(poseArray[l+SVONUM], poseArray[15]);
    }
}


// Rapiroの初期設定
board.on('ready', function() {      // Rapiro制御ボードがreadyなら
    // サーボの接続
    servo[0]  = new five.Servo(10); //  0: 頭部・回転    （左0     90  右180）
    servo[1]  = new five.Servo(11); //  1: 腰部・回転    （左0     90  右180）
    servo[2]  = new five.Servo(9);  //  2: 右肩・上下    （上180   0   下0）
    servo[3]  = new five.Servo(8);  //  3: 右肩・開閉    （開40    130 閉130）
    servo[4]  = new five.Servo(7);  //  4: 右手・開閉    （開120   90  閉70）
    servo[5]  = new five.Servo(12); //  5: 左肩・上下    （上0     180 下180）
    servo[6]  = new five.Servo(13); //  6: 左肩・開閉    （開130   40  閉40）
    servo[7]  = new five.Servo(14); //  7: 左手・開閉    （開70    90  閉120）
    servo[8]  = new five.Servo(4);  //  8: 右脚・回転    （外股180 90  内股0）
    servo[9]  = new five.Servo(2);  //  9: 右足・捻り    （外裏180 90  内裏0）
    servo[10] = new five.Servo(15); // 10: 左脚・回転    （外股0   90  内股180）
    servo[11] = new five.Servo(16); // 11: 左足・捻り    （外裏0   90  内裏180）
    // LEDの接続
    led = new five.Leds([6, 5, 3]); // [R, G, B]
    // サーボへの電源供給開始
    this.pinMode(pinServoDC, five.Pin.OUTPUT)
    this.digitalWrite(pinServoDC, 1);
    // 初期状態にする
    posing(initial);
    rapiroReady = true;

    this.on('exit', function() {
        this.digitalWrite(pinServoDC, 0);   // サーボへの電源供給をOFF
    });
});


// WebSocketによるRapiroの制御
io.on('connection', function(socket) {      // socket接続があれば
    if(rapiroReady == false) { return; }    // rapiroが準備OKなら
    socket.on('pose', function(obj) {       // poseイベントが来たら
        posing(obj);                        // ポージングさせる
    });
});