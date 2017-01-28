# rapiro.js 01

## サーボとLEDの制御

### Node.js + johnny-five による制御の基礎

---
## 簡単な説明

- RAPIRO の12個のサーボを初期状態（直立）にします
- RAPIRO の3個のLEDを任意の色で点灯させます

## 実行方法

### RAPIRO 内の Raspberry Pi で

- app.js を任意のディレクトリに置く（e.g. /home/pi/01）
- npm で johnny-five をインストール

```
pi@raspberrypi:~ $ npm install johnny-five
```

- node で app.js を実行
```
pi@raspberrypi:~/01 $ node app.js
```

---

## さらに詳しくは...

[二足歩行ロボット Rapiro を Node.js で制御 [1] サーボとLED制御のテスト @Qiita](http://qiita.com/mkoku/items/191ead1b62693003bf64)

---
2017.01.28　by Mitsuteru Kokubun