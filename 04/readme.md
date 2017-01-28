# rapiro.js 04

## 距離センサの搭載

### 拡張用アナログピンの利用

---
## 簡単な説明

- 距離センサ（GP2Y0A21YK）を搭載します
- 一定未満の範囲に障害物を検出したら動作を変え、障害物が無くなったらもとの動作に戻ります
- 通信には socket.io を使います

## 実行方法

### RAPIRO 内の Raspberry Pi で

- app.js, index.html, rapiro-cfg.js を 任意のディレクトリに置く（e.g. /home/pi/04）
- npm で johnny-five, socket.io, express をインストール

```
pi@raspberrypi:~ $ npm install johnny-five socket.io express
```

- node で app.js を実行
```
pi@raspberrypi:~/04 $ node app.js
```

### PC・タブレット・スマートフォンで

- RAPIRO と 同じ無線LAN ルータにつなぐ
- ブラウザで RAPIRO の IP アドレス:3000 を入力

```
http://192.168.**.***:3000
```

### 動作例

- 例えば以下のように動作します
    - ブラウザのボタンを押して前進させる
    - RAPIRO の前に障害物を置くと、停止して腕を上げ下げし、目が赤くフェードする
    - 障害物を取り除くと、再び前進する


---

## さらに詳しくは...

[二足歩行ロボット Rapiro を Node.js で制御 [4] 距離センサの搭載 @Qiita](http://qiita.com/mkoku/items/d559d7286ecd156f70aa)

---
2017.01.28　by Mitsuteru Kokubun
