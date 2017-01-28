// rapiro.js 03
// 10個の基本動作の実装
// RAPIRO 標準の基本動作の移植
// 　・歩くなど、連続的な動作アニメーション
// 　・socket.ioでhtmlから制御
// 2017.01.28　by Mitsuteru Kokubun
// 詳しくは以下を参照してください
// http://qiita.com/mkoku/items/e04289eafd86ea64f28d

'use strict';                                   // 厳格モードにする

// httpサーバとsocket.ioの設定
const express = require('express');             // expressモジュールを使う
const app     = express();                      // expressでアプリを作る
const server  = require('http').Server(app);    // httpサーバを起動しアプリをサーブ
const io      = require('socket.io')(server);   // サーバにsocket.ioをつなぐ
server.listen(3000);                            // サーバの3000番ポートをリッスン開始
app.use(express.static(__dirname));             // ホームdirにあるファイルを使えるようにする
app.get('/', function (req, res) {              // アクセス要求があったら
    res.sendFile(__dirname + '/index.html');    // index.htmlを送る
});
let   socket = null;                            // socket接続のオブジェクト

// johnny-fiveの設定
const five  = require('johnny-five');           // johnny-fiveモジュールの読み込み
const cfg   = require('./rapiro-cfg');          // 設定ファイル'rapiro-cfg.js'の読み込み
const board = new five.Board({                  // Rapiro制御ボードのインスタンス
    port: '/dev/ttyAMA0'                        // シリアルポート名（環境による）
});
const pinServoDC = 17;                          // サーボへの電源供給ピン番号（17）
const rapiro = {                                // Rapiroの設定や動作等を格納するオブジェクト
    ready: false                                // Rapiroの準備状態（初期値false）
};


// 制御ボードの準備ができたら
board.on('ready', function() {

    // 各サーボのServoインスタンスを作成
    rapiro.head  = new five.Servo(cfg.servo.head);  // 頭
    rapiro.waist = new five.Servo(cfg.servo.waist); // 腰
    rapiro.r_s_r = new five.Servo(cfg.servo.r_s_r); // 右肩ロール（上下）
    rapiro.r_s_p = new five.Servo(cfg.servo.r_s_p); // 右肩ピッチ（開閉）
    rapiro.r_h_g = new five.Servo(cfg.servo.r_h_g); // 右手
    rapiro.l_s_r = new five.Servo(cfg.servo.l_s_r); // 左肩ロール（上下）
    rapiro.l_s_p = new five.Servo(cfg.servo.l_s_p); // 左肩ピッチ（開閉）
    rapiro.l_h_g = new five.Servo(cfg.servo.l_h_g); // 左手
    rapiro.r_f_y = new five.Servo(cfg.servo.r_f_y); // 右足ヨー（開閉）
    rapiro.r_f_p = new five.Servo(cfg.servo.r_f_p); // 右足ピッチ（内外）
    rapiro.l_f_y = new five.Servo(cfg.servo.l_f_y); // 左足ヨー（開閉）
    rapiro.l_f_p = new five.Servo(cfg.servo.l_f_p); // 左足ピッチ（内外）
    // 全サーボ（全身）をServosインスタンスに入れる
    rapiro.body = new five.Servos([
        rapiro.head,  rapiro.waist,                 // 頭・腰
        rapiro.r_s_r, rapiro.r_s_p, rapiro.r_h_g,   // 右腕
        rapiro.l_s_r, rapiro.l_s_p, rapiro.l_h_g,   // 左腕
        rapiro.r_f_y, rapiro.r_f_p,                 // 右足
        rapiro.l_f_y, rapiro.l_f_p                  // 左足
    ]);
    // 動作アニメーションのインスタンスを作成し、Servosを紐づける
    const bodyMotion = new five.Animation(rapiro.body);

    // 各LEDのインスタンスを作成
    rapiro.faceR = new five.Led(cfg.led.R);         // 赤
    rapiro.faceG = new five.Led(cfg.led.G);         // 緑
    rapiro.faceB = new five.Led(cfg.led.B);         // 青
    // 全LEDをLedsインスタンスに入れる
    rapiro.face  = new five.Leds([
        rapiro.faceR, rapiro.faceG, rapiro.faceB
    ]);
    // 表情アニメーションのインスタンスを作成し、Ledsを紐づける
    const facialExpression = new five.Animation(rapiro.face);

    // 動作アニメーションを実行する関数（引数：動作名の文字列）
    rapiro.execMotion = function(motionName) {
        const obj = cfg.motion;                                     // motionオブジェクトを取得
        for (let pname in obj) {                                    // motionオブジェクト中の全プロパティについて検討
            if (pname == motionName) {                              // 指定の動作名のプロパティがあったら
                rapiro.currentMotionName     = pname;               // 現在の動作名をその動作名に設定
                rapiro.currentMotionSequence = obj[pname];          // 現在の動作シーケンスにその動作を格納
                bodyMotion.enqueue(rapiro.currentMotionSequence);   // 動作アニメーションの開始
                return;                                             // あとは抜ける
            }
        }
        console.log('Error: unidentified motion argument');         // 指定の動作名のプロパティがなかったらエラー表示
    };

    // 表情アニメーションを実行する関数（引数：表情名の文字列）
    rapiro.execFace = function(faceName) {
        const obj = cfg.face;                                       // faceオブジェクトを取得
        for (let pname in obj) {                                    // faceオブジェクト中の全プロパティについて
            if (pname == faceName) {                                // 指定の表情名のプロパティがあったら
                rapiro.currentFaceName     = pname;                 // 現在の表情名をその表情名に設定
                rapiro.currentFaceSequence = obj[pname];            // 現在の表情シーケンスにその表情を格納
                facialExpression.enqueue(rapiro.currentFaceSequence);   // 表情アニメーションの開始
                return;                                             // あとは抜ける
            }
        }
        console.log('Error: unidentified face argument');           // 指定の表情名のプロパティがなかったらエラー表示
    };

    // サーボ電源をON
    this.pinMode(pinServoDC, five.Pin.OUTPUT);      // 電源供給ピンを出力モードに
    this.digitalWrite(pinServoDC, 1);               // 電源供給ピンに1を出力
    // 初期状態を作る
    rapiro.execMotion('stop');                      // 動作をstopに
    rapiro.execFace('white');                       // 表情をwhiteに
    // Rapiroの準備OK
    rapiro.ready = true;

    // デバッグ用：コマンドラインからモーションと表情を制御
    board.repl.inject({
        rapiro: rapiro
    });
    console.log("Type rapiro.execMotion('name') or rapiro.execFace('name')");

    // 終了時の処理
    this.on('exit', function() {
        this.digitalWrite(pinServoDC, 0);           // サーボの電源をOFF
    });
});

// WebSocketによる制御
io.on('connection', function(s) {
    socket = s;                                     // socket接続有り
    socket.on('request', function(data) {           // requestイベントが届いたら
        if (rapiro.ready == true) {                 // Rapiroの準備OKなら
            // アニメーションを実行
            rapiro.execMotion(data.motion);         // 動作アニメーション
            rapiro.execFace(data.face);             // 表情アニメーション
            // 現在の状態をresponseイベントとしてsocketで送る
            socket.emit('response', {
                motion: rapiro.currentMotionName,   // 動作名
                face:   rapiro.currentFaceName      // 表情名
            });
        }
    });
});