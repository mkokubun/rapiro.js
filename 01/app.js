// サーボとLEDの制御
// Node.js + johnny-five による制御の基礎
// 　・全サーボを初期状態（直立）にする
// 　・LEDを適当な色にする
// 2017.01.28　by Mitsuteru Kokubun

'use strict';                       // 厳格モードにする

const five = require('johnny-five'); // johnny-fiveモジュールを使う
const board = new five.Board({      // Rapiro制御ボードを取得
    port: '/dev/ttyAMA0'            // ポート名（環境による）
});

const SVONUM = 12;                  // サーボの個数
let   servo = [];                   // サーボアレイオブジェクト
const pinServoDC = 17;              // サーボに電源供給しているピン番号（17=A3ピン）

const LEDNUM = 3;                   // LEDの個数（RGB）
let   led = [];                     // LEDアレイオブジェクト

const trim = [                      // サーボのトリム（微調整、個体に依存）
     -7,  2,  0,  0,  0,  0,  0,  0,-10,  6,  9,-12
];

const stand = [                     // サーボの初期位置（直立状態）
     90, 90,  0,130, 90,180, 50, 90, 90, 90, 90, 90 
];

let   ledBrightness = [             // LEDの各色の強さ [R, G, B]
    0, 0, 0
];


board.on('ready', function() {      // Rapiro制御ボードがreadyなら

    // サーボの接続
    servo[0]  = new five.Servo(10); //  0: 頭部・回転    （左0     90  右180）
    servo[1]  = new five.Servo(11); //  1: 腰部・回転    （左0     90  右180）
    servo[2]  = new five.Servo(9);  //  2: 右肩・上下    （上180   0   下0）
    servo[3]  = new five.Servo(8);  //  3: 右肩・開閉    （開40    130 閉130）
    servo[4]  = new five.Servo(7);  //  4: 右手・開閉    （開120   90  閉70）
    servo[5]  = new five.Servo(12); //  5: 左肩・上下    （上0     180 下180）
    servo[6]  = new five.Servo(13); //  6: 左肩・開閉    （開130   50  閉40）
    servo[7]  = new five.Servo(14); //  7: 左手・開閉    （開70    90  閉120）
    servo[8]  = new five.Servo(4);  //  8: 右脚・回転    （外股180 90  内股0）
    servo[9]  = new five.Servo(2);  //  9: 右足・捻り    （外裏180 90  内裏0）
    servo[10] = new five.Servo(15); // 10: 左脚・回転    （外股0   90  内股180）
    servo[11] = new five.Servo(16); // 11: 左足・捻り    （外裏0   90  内裏180）

    // サーボへの電源供給開始
    this.pinMode(pinServoDC, five.Pin.OUTPUT)
    this.digitalWrite(pinServoDC, 1);

    // 各サーボをrapiroの初期位置（直立）へ
    for (let s = 0; s < SVONUM; s++) {
        servo[s].to(stand[s] + trim[s]);
    }

    // LEDの接続
    led = new five.Leds([6, 5, 3]); // [R, G, B]
    // LEDの色を変更
    ledBrightness = [255,  0,  0];  // 好みの色に設定 [R, G, B] (0-255)
    for(let l = 0; l < LEDNUM; l++) {
        led[l].brightness(ledBrightness[l]);
    }

    // 終了時の処理
    this.on('exit', function() {
        this.digitalWrite(pinServoDC, 0);   // サーボの電源をOFF
    });

});