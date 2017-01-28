# rapiro.js 05

## タッチセンサの搭載

### 拡張用I2Cピンの利用

---
## 簡単な説明

- 静電容量タッチセンサ（GROVE I2C MPR121）を搭載します
- タッチした場所に応じて様々な動作・表情を実行します
- コンテンツ04の距離センサ（GP2Y0A21YK）は搭載した状態

## 実行方法

### RAPIRO 内の Raspberry Pi で

- app.js, index.html, rapiro-cfg.js を 任意のディレクトリに置く（e.g. /home/pi/05）
- npm で johnny-five, socket.io, express をインストール

```
pi@raspberrypi:~ $ npm install johnny-five socket.io express
```

- node で app.js を実行
```
pi@raspberrypi:~/05 $ node app.js
```

### PC・タブレット・スマートフォンで

- RAPIRO と 同じ無線LAN ルータにつなぐ
- ブラウザで RAPIRO の IP アドレス:3000 を入力

```
http://192.168.**.***:3000
```
- タッチセンサの値が表示されていればOK

### 動作例

- 各 Feeler に触れると、所定の動作・表情が実行されればOK

|Feeler の位置| Feeler 番号|動作 / 表情|
|:-------:|:-:|:-:|
|右の角|0|forward / blue|
|右の耳|1|yellow / yellow|
|左の角|2|stop / white|
|左の耳|3|red / red|

---

## さらに詳しくは...

[二足歩行ロボット Rapiro を Node.js で制御 [5] タッチセンサの搭載 @Qiita](http://qiita.com/mkoku/items/e2515c8398c9690fadf4)

---
2017.01.28　by Mitsuteru Kokubun
