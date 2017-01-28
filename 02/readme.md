# rapiro.js 02

## ブラウザからポージング

### Node.js + johnny-five + socket.io による遠隔制御と監視

---
## 簡単な説明

- RAPIRO の12個のサーボをブラウザから制御します
- 通信には socket.io を使います
- やりようによっては地球の裏側からでも制御できます

## 実行方法

### RAPIRO 内の Raspberry Pi で

- app.js と index.html を 任意のディレクトリに置く（e.g. /home/pi/02）
- npm で johnny-five と socket.io をインストール

```
pi@raspberrypi:~ $ npm install johnny-five socket.io
```

- node で app.js を実行
```
pi@raspberrypi:~/02 $ node app.js
```

### PC・タブレット・スマートフォンで

- RAPIRO と 同じ無線LAN ルータにつなぐ
- ブラウザで RAPIRO の IP アドレス:3000 を入力

```
http://192.168.**.***:3000
```

- スライダーをグリグリ動かしてポーズやLEDの色を変えて遊ぶ
- わからなくなったら、リロードして [リセット] を押す- 


---

## さらに詳しくは...

[二足歩行ロボット Rapiro を Node.js で制御 [2] ブラウザからポージング @Qiita](http://qiita.com/mkoku/items/490606b5c70eeb9e5ea3)

---
2017.01.28　by Mitsuteru Kokubun