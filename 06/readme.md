# rapiro.js 06

## 音声合成と天気予報

### VoiceText / OpenWeatherMap Web API 利用

---
## 簡単な説明

- RAPIRO 内部に搭載したスピーカーから音を鳴らす
- 効果音（起動音・障害物検出音・タッチセンサタッチ音）
- 音声合成（時刻・天気）
- [04]距離センサと[05]静電容量タッチセンサ搭載前提

## 実行方法

### RAPIRO 内の Raspberry Pi で

- app.js, index.html, rapiro-cfg.js を 任意のディレクトリに置く（e.g. /home/pi/06）
- 3個のwavファイルも同じディレクトリに置く
    - この例では「[効果音ラボ](http://soundeffect-lab.info/)」からダウンロードした音声を利用
- npm で [johnny-five](http://johnny-five.io/), [socket.io](http://socket.io/), [express](http://expressjs.com/ja/), [voicetext](https://github.com/pchw/node-voicetext), [openweather-apis](https://github.com/CICCIOSGAMINO/openweather-apis) をインストール

```
pi@raspberrypi:~ $ npm install johnny-five socket.io express voicetext openweather-apis
```

- node で app.js を実行
```
pi@raspberrypi:~/06 $ node app.js
```

### 動作例

- 起動音が鳴る
- 各 Feeler に触れるとタッチ音が鳴る
- Feeler #0（右の角）に触れると天気情報を話す
    - この例では名古屋市の翌日・翌々日の天気と気温
- Feeler #1（右の耳）に触れると現在時刻を話す


### PC・タブレット・スマートフォンで

- RAPIRO と 同じ無線LAN ルータにつなぐ
- ブラウザで RAPIRO の IP アドレス:3000 を入力

```
http://192.168.**.***:3000
```

- [いま何時？] を押すと現在時刻を話す
- [お天気は？] を押すと天気情報を話す
    - この例では名古屋市の翌日の天気と気温


---

## さらに詳しくは...

[二足歩行ロボット Rapiro を Node.js で制御 [6] 音声合成と天気予報 @Qiita](http://qiita.com/mkoku/items/f978161b5ab247111d8a)

---
2017.01.29　by Mitsuteru Kokubun
