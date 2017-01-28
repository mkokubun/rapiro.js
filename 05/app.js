// rapiro.js 05
// 静電容量タッチセンサの搭載
// 拡張用 I2C ピンの利用
// 　・静電容量タッチセンサ（Grove I2C MPR121）を搭載
// 　・TODO: どんな動作？
// 2017.01.28　by Mitsuteru Kokubun
// 詳しくは以下を参照してください
// http://qiita.com/mkoku/items/d559d7286ecd156f70aa

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
let   socket = null;                            // socket接続のインスタンス

// johnny-fiveの設定
const five  = require('johnny-five');           // johnny-fiveモジュールの読み込み
const cfg   = require('./rapiro-cfg');          // 設定ファイル'rapiro-cfg.js'の読み込み
const board = new five.Board({                  // Rapiro制御ボードのインスタンス
    port: '/dev/ttyAMA0'                        // シリアルポート名（環境による）
});
const pinServoDC        = 17;                   // サーボへの電源供給ピン番号（17）
const obstacleThreshold = 9;                    // 障害物検出と判定する距離センサの閾値[cm]
const MPR121ADDR        = 0x5A;                 // MPR121静電容量タッチセンサコントローラのアドレス
const feelerNum         = 4;                    // タッチセンサのfeelerの数
const rapiro = {                                // Rapiroの設定や動作等を格納するオブジェクト
    ready:    false,                            // Rapiroの準備状態（初期値false）
    power:    0,                                // サーボ電源の状態（0:OFF / 1:ON）
    obstacle: false,                            // 障害物の検出状態（初期値false）
    touch:    [0, 0, 0, 0],                     // タッチセンサのタッチ状態（初期値4ch全て0）
    touched:  [0, 0, 0, 0]
};


// MPR121静電容量タッチセンサコントローラの初期化関数
function mpr121Config(device) {
    // Section A: dataがベースラインより大きい時のフィルタリング
    device.i2cWrite(MPR121ADDR, 0x2B, 0x01);    // MHD_R
    device.i2cWrite(MPR121ADDR, 0x2C, 0x01);    // NHD_R
    device.i2cWrite(MPR121ADDR, 0x2D, 0x00);    // NCL_R
    device.i2cWrite(MPR121ADDR, 0x2E, 0x00);    // FDL_R
    // Section B: dataがベースラインより小さい時のフィルタリング
    device.i2cWrite(MPR121ADDR, 0x2F, 0x01);    // MHD_F
    device.i2cWrite(MPR121ADDR, 0x30, 0x01);    // NHD_F
    device.i2cWrite(MPR121ADDR, 0x31, 0xFF);    // NCL_L
    device.i2cWrite(MPR121ADDR, 0x32, 0x02);    // FDL_L
    // Section C: 各電極(ELE0-11)の閾値(T:Touch,R:Release)の設定
    device.i2cWrite(MPR121ADDR, 0x41, 0x0F);    // ELE0_T
    device.i2cWrite(MPR121ADDR, 0x42, 0x0A);    // ELE0_R
    device.i2cWrite(MPR121ADDR, 0x43, 0x0F);    // ELE1_T
    device.i2cWrite(MPR121ADDR, 0x44, 0x0A);    // ELE1_R
    device.i2cWrite(MPR121ADDR, 0x45, 0x0F);    // ELE2_T
    device.i2cWrite(MPR121ADDR, 0x46, 0x0A);    // ELE2_R
    device.i2cWrite(MPR121ADDR, 0x47, 0x0F);    // ELE3_T
    device.i2cWrite(MPR121ADDR, 0x48, 0x0A);    // ELE3_R
    // Section D: フィルタの設定
    device.i2cWrite(MPR121ADDR, 0x5D, 0x04);
    // Section E: 電極の設定
    device.i2cWrite(MPR121ADDR, 0x5E, 0x0C);
}


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
                if (rapiro.power == 0) {
                    rapiro.powerSwitch(1);
                }
                rapiro.currentMotionName     = pname;               // 現在の動作名をその動作名に設定
                rapiro.currentMotionSequence = obj[pname];          // 現在の動作シーケンスにその動作を格納
                if (rapiro.currentMotionSequence.loop == false) {   // 非ループ動作なら終了時に電源OFF（省電力）
                    rapiro.currentMotionSequence.oncomplete = function () {
                        rapiro.powerSwitch(0);
                    }
                }
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

    // サーボ電源をON/OFFする関数（引数 0:OFF / 1:ON）
    rapiro.powerSwitch = function(OnOff) {
        board.pinMode(pinServoDC, five.Pin.OUTPUT); // 電源供給ピンを出力モードに
        board.digitalWrite(pinServoDC, OnOff);      // 電源供給ピンに1を出力
        rapiro.power = OnOff;                       // 電源状態の変数を変更
    }

    // 初期状態を作る
    rapiro.powerSwitch(1);                          // サーボ電源をON
    rapiro.execMotion('stop');                      // 動作をstopに
    rapiro.execFace('white');                       // 表情をwhiteに
    rapiro.ready = true;                            // Rapiroの準備OK

    // デバッグ用：コマンドラインからモーションと表情を制御
    board.repl.inject({
        rapiro: rapiro
    });
    console.log("Type rapiro.execMotion('name') or rapiro.execFace('name')");

    // 距離センサ（GP2Y0A21YK）の処理
    const proximity = new five.Proximity({
        controller: 'GP2Y0A21YK',   // コントローラに GP2Y0A21YK を指定
        pin: 'A6',                  // A6 ピンを指定
        freq: 250                   // サンプリング間隔[ms]
    });
    // 距離センサのデータが取得されたら
    proximity.on('data', function() {
        const dist = this.cm;                                       // cm or in(inch)
        // 障害物の処理
        if ((dist < obstacleThreshold) && (rapiro.obstacle == false)) {
            // 距離が閾値未満かつ現在障害物が未検出状態だったら
            rapiro.obstacle = true;                                 // 障害物検出状態に
            rapiro.previousMotionName = rapiro.currentMotionName;   // 現在の動作名を一時保管
            rapiro.previousFaceName = rapiro.currentFaceName;       // 現在の表情名を一時補間
            rapiro.execMotion('blue');                              // 動作blueを実行
            rapiro.execFace('red');                                 // 表情redを実行
        } else if ((dist >= obstacleThreshold) && (rapiro.obstacle == true)) {
            // 距離が閾値以上かつ現在障害物が検出状態だったら
            rapiro.obstacle = false;                                // 障害物未検出状態に
            rapiro.execMotion(rapiro.previousMotionName);           // 前の動作を再開
            rapiro.execFace(rapiro.previousFaceName);               // 前の表情を再開
        }
        // 距離の値と現状の動作・表情をsocketで送る
        emitSocket('proximity', {
            distance: dist                      // 距離
        });
        emitSocket('response', {
            motion: rapiro.currentMotionName,   // 動作名
            face:   rapiro.currentFaceName      // 表情名
       });
    });

    // タッチセンサ（Grove I2C MPR121）の処理
    this.i2cConfig();       // I2Cを使うためのjohnny-fiveのおまじない
    mpr121Config(this);     // MPR121静電容量タッチセンサコントローラを初期設定
    // タッチセンサの状態の読み込みとタッチの判定（i2cRead()は繰り返し実行される）
    this.i2cRead(MPR121ADDR, 1, function(bytes){
        (bytes & 0x01) == 0x01 ? rapiro.touch[0] = 1 : rapiro.touch[0] = 0; // ch0を判定
        (bytes & 0x02) == 0x02 ? rapiro.touch[1] = 1 : rapiro.touch[1] = 0; // ch1を判定
        (bytes & 0x04) == 0x04 ? rapiro.touch[2] = 1 : rapiro.touch[2] = 0; // ch2を判定
        (bytes & 0x08) == 0x08 ? rapiro.touch[3] = 1 : rapiro.touch[3] = 0; // ch3を判定
        for (let t = 0; t < feelerNum; t++) {
            if ((rapiro.touch[t] == 1) && (rapiro.touched[t] == 0)) {
                // タッチセンサに触れた時（触れていなかった状態から）
                rapiro.touched[t] = 1;
                switch (t) {
                    case 0:
                        rapiro.execMotion('forward');   // 動作forwardを実行
                        rapiro.execFace('blue');        // 表情blueを実行
                        break;
                    case 1:
                        rapiro.execMotion('yellow');    // 動作yellowを実行
                        rapiro.execFace('yellow');      // 表情yellowを実行
                        break;
                    case 2:
                        rapiro.execMotion('stop');      // 動作stopを実行
                        rapiro.execFace('white');       // 表情whiteを実行
                        break;
                    case 3:
                        rapiro.execMotion('red');       // 動作red実行
                        rapiro.execFace('red');         // 表情redを実行
                        break;
                }
            }
            if ((rapiro.touch[t] == 0) && (rapiro.touched[t] == 1)) {
                // タッチセンサから離した時（触れた状態から）
                rapiro.touched[t] = 0;
            }
        }
        // タッチセンサの値と現状の動作・表情をsocketで送る
        emitSocket('touch', {
            touch: rapiro.touch                 // タッチセンサの状態
        });
        emitSocket('response', {
            motion: rapiro.currentMotionName,   // 動作名
            face:   rapiro.currentFaceName      // 表情名
       });
    });

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
            emitSocket('response', {
                motion: rapiro.currentMotionName,   // 動作名
                face:   rapiro.currentFaceName      // 表情名
            });
        }
    });
});

// ブラウザにsocketでデータを送る
function emitSocket(event, data) {
    if (socket != null) {
        socket.emit(event, data);
    }
}