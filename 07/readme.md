# rapiro.js 07

##  家電の操作

### irMagician-T の利用

---
## 簡単な説明

- RAPIRO に設置した赤外線リモコンシステム irMagician-T で家電を操作する
- irMagician-T に搭載された温度センサの値をブラウザで確認する
- [04]距離センサ、[05]静電容量タッチセンサ、[06]スピーカー搭載前提

## 実行方法

### RAPIRO 内の Raspberry Pi で

- app.js, index.html, rapiro-cfg.js を 任意のディレクトリに置く（e.g. /home/pi/07）
- 3個のwavファイルはその下の/snd/ディレクトリに置く
    - この例では「[効果音ラボ](http://soundeffect-lab.info/)」からダウンロードした音声を利用
- 赤外線情報の入った.jsonファイルはその下の/ir/ディレクトリに置く
    - irmagician モジュールの作者のページを参考に、事前にファイルを作成
    - この例では東芝のテレビの電源、富士通のエアコンの電源ON/OFFのファイルを作成して利用    
- npm で [johnny-five](http://johnny-five.io/), [socket.io](http://socket.io/), [express](http://expressjs.com/ja/), [voicetext](https://github.com/pchw/node-voicetext), [openweather-apis](https://github.com/CICCIOSGAMINO/openweather-apis), [irmagician](https://www.npmjs.com/package/irmagician) をインストール

```
pi@raspberrypi:~ $ npm install johnny-five socket.io express voicetext openweather-apis irmagician
```

- node で app.js を実行
```
pi@raspberrypi:~/07 $ node app.js
```

### PC・タブレット・スマートフォンで

- RAPIRO と 同じ無線LAN ルータにつなぐ
- ブラウザで RAPIRO の IP アドレス:3000 を入力

```
http://192.168.**.***:3000
```

- [tvPow] を押すと Rapiro が右腕を上げ、テレビの電源を ON/OFF させる赤外線を送信
- [acOn] を押すと同様にエアコンの電源をON、[acOff]押すとエアコンの電源をOFFにする
- 温度が表示される


---

## さらに詳しくは...

[二足歩行ロボット Rapiro を Node.js で制御 [6] 家電の操作 @Qiita](http://qiita.com/mkoku/items/3c211f3e7e5deddcdd7b)

---
2017.01.30　by Mitsuteru Kokubun
