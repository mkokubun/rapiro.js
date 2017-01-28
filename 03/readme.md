# rapiro.js 03

## 10個の基本動作の実装

### RAPIRO 標準の基本動作の移植

---
## 簡単な説明

- 歩くなど、連続的な動作アニメーションをさせます
- RAPIRO 標準の10個の動作を移植（完全に同一ではありませんが）
- 通信には socket.io を使います

## 実行方法

### RAPIRO 内の Raspberry Pi で

- app.js, index.html, rapiro-cfg.js を 任意のディレクトリに置く（e.g. /home/pi/03）
- npm で johnny-five, socket.io, express をインストール

```
pi@raspberrypi:~ $ npm install johnny-five socket.io express
```

- node で app.js を実行
```
pi@raspberrypi:~/03 $ node app.js
```

### PC・タブレット・スマートフォンで

- RAPIRO と 同じ無線LAN ルータにつなぐ
- ブラウザで RAPIRO の IP アドレス:3000 を入力

```
http://192.168.**.***:3000
```

- ボタンを押して動かして遊ぶ

### SSH のコマンドラインからも制御可能

- rapiro.execMotion('forward') や rapiro.execFace('blue') などのコマンドをうつ
```
pi@raspberrypi:~/03 $ rapiro.execMotion('forward')
pi@raspberrypi:~/03 $ rapiro.execFace('blue')
```


---

## さらに詳しくは...

[二足歩行ロボット Rapiro を Node.js で制御 [3] 10個の基本動作を実装 @Qiita](http://qiita.com/mkoku/items/e04289eafd86ea64f28d)

---
2017.01.28　by Mitsuteru Kokubun
