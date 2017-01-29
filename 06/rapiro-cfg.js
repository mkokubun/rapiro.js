// Rapiroの設定や動作等を格納するオブジェクト
// メインのjs内で例えば cfg = require('./rapiro-cfg'); のように参照
// Rapiro標準の10モーション実装
// 2017.01.17 by mkoku

'use strict';

// サーボの諸設定
// servoという名前で外部から読めるようにexports
exports.servo = {
    head: {     // 0. head
        pin:     10,        // ピン番号
        startAt: 90,        // 開始角度
        range:   [0, 180],  // 可動域
        offset:  -7         // オフセット（トリム）
    },
    waist: {    // 1. waist
        pin:     11,
        startAt: 90,
        range:   [0, 180],
        offset:  2
    },
    r_s_r: {    // 2. right shoulder roll [up / down]
        pin:     9,
        startAt: 0,
        range:   [0, 180],
        offset:  0
    },
    r_s_p: {    // 3. right shoulder pitch [open / close]
        pin:     8,
        startAt: 130,
        range:   [40, 130],
        offset:  0
    },
    r_h_g: {    // 4. right hand grip
        pin:     7,
        startAt: 90,
        range:   [50, 110],
        offset:  0
    },
    l_s_r: {    // 5. left shoulder roll [up / down]
        pin:     12,
        startAt: 180,
        range:   [0, 180],
        offset:  0
    },
    l_s_p: {    // 6. left shoulder pitch [open /close]
        pin:     13,
        startAt: 50,
        range:   [40, 130],
        offset:  0
    },
    l_h_g: {    // 7. left hand grip
        pin:     14,
        startAt: 90,
        range:   [70, 130],
        offset:  0
    },
    r_f_y: {    // 8. right foot yaw
        pin:     4,
        startAt: 90,
        range:   [45, 135],
        offset:  -10
    },
    r_f_p: {    // 9. right foot pitch
        pin:     2,
        startAt: 90,
        range:   [40, 125],
        offset:  6
    },
    l_f_y: {    // 10. left foot yaw
        pin:     15,
        startAt: 90,
        range:   [45, 135],
        offset:  9
    },
    l_f_p: {    // 11. left foot pitch
        pin:     16,
        startAt: 90,
        range:   [55, 140],
        offset:  -12
    }
};

// モーション（動作アニメーション）の諸設定
// motionという名前で外部から読めるようにexports
exports.motion = {
    // 0. stop
    stop: {
        duration: 1000,         // 再生時間[ms]
        loop: false,            // ループ再生有無
        cuePoints: [0.0, 1.0],  // キューポイント
        keyFrames: [            // キーフレーム（行:サーボ12個 × 列:キューポイントごとの角度とイージングの種類）
            [null,  {value: this.servo.head.startAt,  easing:'inOutSine'}], // 頭
            [null,  {value: this.servo.waist.startAt, easing:'inOutSine'}], // 腰
            [null,  {value: this.servo.r_s_r.startAt, easing:'inOutSine'}], // 右肩ロール（上下）
            [null,  {value: this.servo.r_s_p.startAt, easing:'inOutSine'}], // 右肩ピッチ（開閉）
            [null,  {value: this.servo.r_h_g.startAt, easing:'inOutSine'}], // 右手
            [null,  {value: this.servo.l_s_r.startAt, easing:'inOutSine'}], // 左肩ロール（上下）
            [null,  {value: this.servo.l_s_p.startAt, easing:'inOutSine'}], // 左肩ピッチ（開閉）
            [null,  {value: this.servo.l_h_g.startAt, easing:'inOutSine'}], // 左手
            [null,  {value: this.servo.r_f_y.startAt, easing:'inOutSine'}], // 右足ヨー（開閉）
            [null,  {value: this.servo.r_f_p.startAt, easing:'inOutSine'}], // 右足ピッチ（内外）
            [null,  {value: this.servo.l_f_y.startAt, easing:'inOutSine'}], // 左足ヨー（開閉）
            [null,  {value: this.servo.l_f_p.startAt, easing:'inOutSine'}]  // 左足ピッチ（内外）
        ]
    },
    // 1. forward
    forward: {
        duration: 3000,                             // 再生時間[ms]
        loop: true,                                 // ループ再生有無
        cuePoints: [0.0, 0.25, 0.5, 0.75, 1.0],     // キューポイント
        keyFrames: [                                // キーフレーム（行:サーボ12個 × 列:キューポイントごとの角度とイージングの種類）
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value:  0, easing:'inOutSine'}, {value:  0, easing:'inOutSine'}, {value:  0, easing:'inOutSine'}, {value:  0, easing:'inOutSine'}],
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value:180, easing:'inOutSine'}, {value:180, easing:'inOutSine'}, {value:180, easing:'inOutSine'}, {value:180, easing:'inOutSine'}],
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value: 80, easing:'inOutSine'}, {value: 70, easing:'inOutSine'}, {value:100, easing:'inOutSine'}, {value:110, easing:'inOutSine'}],
            [null,  {value:110, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 60, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value: 80, easing:'inOutSine'}, {value: 70, easing:'inOutSine'}, {value:100, easing:'inOutSine'}, {value:110, easing:'inOutSine'}],
            [null,  {value:120, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 70, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}]
        ]
    },
    // 2. back
    back: {
        duration: 3000,                             // 再生時間[ms]
        loop: true,                                 // ループ再生有無
        cuePoints: [0.0, 0.25, 0.5, 0.75, 1.0],     // キューポイント
        keyFrames: [                                // キーフレーム（行:サーボ12個 × 列:キューポイントごとの角度とイージングの種類）
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value:  0, easing:'inOutSine'}, {value:  0, easing:'inOutSine'}, {value:  0, easing:'inOutSine'}, {value:  0, easing:'inOutSine'}],
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value:180, easing:'inOutSine'}, {value:180, easing:'inOutSine'}, {value:180, easing:'inOutSine'}, {value:180, easing:'inOutSine'}],
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value:100, easing:'inOutSine'}, {value:120, easing:'inOutSine'}, {value: 80, easing:'inOutSine'}, {value: 70, easing:'inOutSine'}],
            [null,  {value:110, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 30, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value:100, easing:'inOutSine'}, {value:120, easing:'inOutSine'}, {value: 80, easing:'inOutSine'}, {value: 70, easing:'inOutSine'}],
            [null,  {value:120, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 70, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}]
        ]
    },
    // 3. right
    right: {
        duration: 3000,                             // 再生時間[ms]
        loop: true,                                 // ループ再生有無
        cuePoints: [0.0, 0.25, 0.5, 0.75, 1.0],     // キューポイント
        keyFrames: [                                // キーフレーム（行:サーボ12個 × 列:キューポイントごとの角度とイージングの種類）
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value:  0, easing:'inOutSine'}, {value:  0, easing:'inOutSine'}, {value:  0, easing:'inOutSine'}, {value:  0, easing:'inOutSine'}],
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value:180, easing:'inOutSine'}, {value:180, easing:'inOutSine'}, {value:180, easing:'inOutSine'}, {value:180, easing:'inOutSine'}],
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value: 95, easing:'inOutSine'}, {value:100, easing:'inOutSine'}, {value: 85, easing:'inOutSine'}, {value: 80, easing:'inOutSine'}],
            [null,  {value: 60, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value:110, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value: 85, easing:'inOutSine'}, {value: 80, easing:'inOutSine'}, {value: 95, easing:'inOutSine'}, {value:100, easing:'inOutSine'}],
            [null,  {value: 70, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value:120, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}]
        ]
    },
    // 4. left
    left: {
        duration: 3000,                             // 再生時間[ms]
        loop: true,                                 // ループ再生有無
        cuePoints: [0.0, 0.25, 0.5, 0.75, 1.0],     // キューポイント
        keyFrames: [                                // キーフレーム（行:サーボ12個 × 列:キューポイントごとの角度とイージングの種類）
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value:  0, easing:'inOutSine'}, {value:  0, easing:'inOutSine'}, {value:  0, easing:'inOutSine'}, {value:  0, easing:'inOutSine'}],
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value:180, easing:'inOutSine'}, {value:180, easing:'inOutSine'}, {value:180, easing:'inOutSine'}, {value:180, easing:'inOutSine'}],
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value: 95, easing:'inOutSine'}, {value:100, easing:'inOutSine'}, {value: 85, easing:'inOutSine'}, {value: 80, easing:'inOutSine'}],
            [null,  {value:110, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 60, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value: 85, easing:'inOutSine'}, {value: 80, easing:'inOutSine'}, {value: 95, easing:'inOutSine'}, {value:100, easing:'inOutSine'}],
            [null,  {value:120, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 70, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}]
        ]
    },
    // 5. green
    green: {
        duration: 1500,                             // 再生時間[ms]
        loop: true,                                 // ループ再生有無
        cuePoints: [0.0, 0.4, 0.6, 0.8, 1.0],       // キューポイント
        keyFrames: [                                // キーフレーム（行:サーボ12個 × 列:キューポイントごとの角度とイージングの種類）
            [null,  {value: 90, easing:'inOutSine'}, {value:100, easing:'inOutSine'}, {value: 80, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value:120, easing:'inOutSine'}, {value:120, easing:'inOutSine'}, {value:120, easing:'inOutSine'}, {value:120, easing:'inOutSine'}],
            [null,  {value: 90, easing:'inOutSine'}, {value:130, easing:'inOutSine'}, {value:130, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value: 90, easing:'inOutSine'}, {value:110, easing:'inOutSine'}, {value:110, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value: 60, easing:'inOutSine'}, {value: 60, easing:'inOutSine'}, {value: 60, easing:'inOutSine'}, {value: 60, easing:'inOutSine'}],
            [null,  {value: 90, easing:'inOutSine'}, {value: 50, easing:'inOutSine'}, {value: 50, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value: 90, easing:'inOutSine'}, {value: 70, easing:'inOutSine'}, {value: 70, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}]
        ]
    },
    // 6. yellow
    yellow: {
        duration: 1500,                             // 再生時間[ms]
        loop: true,                                 // ループ再生有無
        cuePoints: [0.0, 0.5, 1.0],                 // キューポイント
        keyFrames: [                                // キーフレーム（行:サーボ12個 × 列:キューポイントごとの角度とイージングの種類）
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value:120, easing:'inOutSine'}, {value:120, easing:'inOutSine'}],
            [null,  {value:120, easing:'inOutSine'}, {value:120, easing:'inOutSine'}],
            [null,  {value:130, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value:180, easing:'inOutSine'}, {value:180, easing:'inOutSine'}],
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}]
        ]
    },
    // 7. blue
    blue: {
        duration: 5000,                             // 再生時間[ms]
        loop: true,                                 // ループ再生有無
        cuePoints: [0.0, 0.2, 0.3, 0.4, 0.5, 0.7, 0.8, 1.0],     // キューポイント
        keyFrames: [                                // キーフレーム（行:サーボ12個 × 列:キューポイントごとの角度とイージングの種類）
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value:120, easing:'inOutSine'}, {value:120, easing:'inOutSine'}, {value:120, easing:'inOutSine'}, {value:120, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value:120, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value:130, easing:'inOutSine'}, {value:130, easing:'inOutSine'}, {value:130, easing:'inOutSine'}, {value:130, easing:'inOutSine'}, {value:130, easing:'inOutSine'}, {value:130, easing:'inOutSine'}, {value:130, easing:'inOutSine'}],
            [null,  {value: 70, easing:'inOutSine'}, {value:110, easing:'inOutSine'}, {value: 70, easing:'inOutSine'}, {value:110, easing:'inOutSine'}, {value:110, easing:'inOutSine'}, {value:110, easing:'inOutSine'}, {value:110, easing:'inOutSine'}],
            [null,  {value: 60, easing:'inOutSine'}, {value: 60, easing:'inOutSine'}, {value: 60, easing:'inOutSine'}, {value: 60, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 60, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value: 50, easing:'inOutSine'}, {value: 50, easing:'inOutSine'}, {value: 50, easing:'inOutSine'}, {value: 50, easing:'inOutSine'}, {value: 50, easing:'inOutSine'}, {value: 50, easing:'inOutSine'}, {value: 50, easing:'inOutSine'}],
            [null,  {value:110, easing:'inOutSine'}, {value: 70, easing:'inOutSine'}, {value:110, easing:'inOutSine'}, {value: 70, easing:'inOutSine'}, {value: 70, easing:'inOutSine'}, {value: 70, easing:'inOutSine'}, {value: 70, easing:'inOutSine'}],
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}]
        ]
    },
    // 8. red
    red: {
        duration: 1500,                             // 再生時間[ms]
        loop: true,                                 // ループ再生有無
        cuePoints: [0.0, 0.5, 1.0],                 // キューポイント
        keyFrames: [                                // キーフレーム（行:サーボ12個 × 列:キューポイントごとの角度とイージングの種類）
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value: 60, easing:'inOutSine'}, {value: 60, easing:'inOutSine'}],
            [null,  {value:  0, easing:'inOutSine'}, {value:  0, easing:'inOutSine'}],
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value: 60, easing:'inOutSine'}, {value: 60, easing:'inOutSine'}],
            [null,  {value: 50, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}]
        ]
    },
    // 9. push
    push: {
        duration: 5000,                             // 再生時間[ms]
        loop: true,                                 // ループ再生有無
        cuePoints: [0.0, 0.2, 0.4, 0.6, 1.0],       // キューポイント
        keyFrames: [                                // キーフレーム（行:サーボ12個 × 列:キューポイントごとの角度とイージングの種類）
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 40, easing:'inOutSine'}, null],
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value:140, easing:'inOutSine'}, null],
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, null],
            [null,  {value:130, easing:'inOutSine'}, {value:130, easing:'inOutSine'}, {value: 70, easing:'inOutSine'}, null],
            [null,  {value:110, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, null],
            [null,  {value:180, easing:'inOutSine'}, {value:180, easing:'inOutSine'}, {value:180, easing:'inOutSine'}, null],
            [null,  {value: 50, easing:'inOutSine'}, {value: 50, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, null],
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, null],
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, null],
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, null],
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, null],
            [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, null]
        ]
    }

    // モーションのテンプレート（valueはSTOPの値、4フレーム動作の例）
    // モーションを増やす時にコピーして使うと便利
    // 使えるイージング ... https://www.npmjs.com/package/ease-component
    // イージング早見表 ... http://easings.net/ja
    //
    // X. templete
    // forward: {
    //     duration: 3000,                             // 再生時間[ms]
    //     loop: false,                                // ループ再生有無
    //     cuePoints: [0.0, 0.25, 0.5, 0.75, 1.0],     // キューポイント
    //     keyFrames: [                                // キーフレーム（行:サーボ12個 × 列:キューポイントごとの角度とイージングの種類）
    //         [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
    //         [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
    //         [null,  {value:  0, easing:'inOutSine'}, {value:  0, easing:'inOutSine'}, {value:  0, easing:'inOutSine'}, {value:  0, easing:'inOutSine'}],
    //         [null,  {value:130, easing:'inOutSine'}, {value:130, easing:'inOutSine'}, {value:130, easing:'inOutSine'}, {value:130, easing:'inOutSine'}],
    //         [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
    //         [null,  {value:180, easing:'inOutSine'}, {value:180, easing:'inOutSine'}, {value:180, easing:'inOutSine'}, {value:180, easing:'inOutSine'}],
    //         [null,  {value: 50, easing:'inOutSine'}, {value: 50, easing:'inOutSine'}, {value: 50, easing:'inOutSine'}, {value: 50, easing:'inOutSine'}],
    //         [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
    //         [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
    //         [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
    //         [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}],
    //         [null,  {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}, {value: 90, easing:'inOutSine'}]
    //     ]
    // }
};


// LEDの諸設定
// ledという名前で外部から読めるようにexports
exports.led = { R: {pin: 6}, G: {pin: 5}, B: {pin: 3} };

// 表情の諸設定
// faceという名前で外部から読めるようにexports
exports.face = {
    white: {
        duration: 3000,                         // 再生時間
        loop: true,                             // ループ再生有無
        cuePoints: [0.0, 0.4, 0.5, 0.9, 1.0],   // キューポイント
        keyFrames: [                            // キーフレーム（行:LED3個 × 列:キューポイントごとの明るさとイージングの種類）
            [{value:0, easing:'linear'}, {value:255, easing:'linear'}, {value:0, easing:'linear'}, {value:255, easing:'linear'}, {value:0, easing:'linear'}],
            [{value:0, easing:'linear'}, {value:255, easing:'linear'}, {value:0, easing:'linear'}, {value:255, easing:'linear'}, {value:0, easing:'linear'}],
            [{value:0, easing:'linear'}, {value:255, easing:'linear'}, {value:0, easing:'linear'}, {value:255, easing:'linear'}, {value:0, easing:'linear'}]
        ]
    },
    red: {
        duration: 1500,
        loop: true,
        cuePoints: [0.0, 1.0],
        keyFrames: [
            [{value:0, easing:'linear'}, {value:255, easing:'linear'}],
            [{value:0, easing:'linear'}, {value:  0, easing:'linear'}],
            [{value:0, easing:'linear'}, {value:  0, easing:'linear'}]
        ]
    },
    green: {
        duration: 2000,
        loop: true,
        cuePoints: [0.0, 0.25, 0.5, 0.75, 1.0],
        keyFrames: [
            [{value:0, easing:'linear'}, {value:  0, easing:'linear'}, {value:0, easing:'linear'}, {value:  0, easing:'linear'}, {value:0, easing:'linear'}],
            [{value:0, easing:'linear'}, {value:255, easing:'linear'}, {value:0, easing:'linear'}, {value:255, easing:'linear'}, {value:0, easing:'linear'}],
            [{value:0, easing:'linear'}, {value:  0, easing:'linear'}, {value:0, easing:'linear'}, {value:  0, easing:'linear'}, {value:0, easing:'linear'}]
        ]
    },
    blue: {
        duration: 3000,
        loop: true,
        cuePoints: [0.0, 0.4, 0.5, 0.9, 1.0],
        keyFrames: [
            [{value:0, easing:'linear'}, {value:  0, easing:'linear'}, {value:0, easing:'linear'}, {value:  0, easing:'linear'}, {value:0, easing:'linear'}],
            [{value:0, easing:'linear'}, {value:  0, easing:'linear'}, {value:0, easing:'linear'}, {value:  0, easing:'linear'}, {value:0, easing:'linear'}],
            [{value:0, easing:'linear'}, {value:255, easing:'linear'}, {value:0, easing:'linear'}, {value:255, easing:'linear'}, {value:0, easing:'linear'}]
        ]
    },
    yellow: {
        duration: 1500,
        loop: true,
        cuePoints: [0.0, 1.0],
        keyFrames: [
            [{value:0, easing:'linear'}, {value:255, easing:'linear'}],
            [{value:0, easing:'linear'}, {value:255, easing:'linear'}],
            [{value:0, easing:'linear'}, {value:  0, easing:'linear'}]
        ]
    },
};