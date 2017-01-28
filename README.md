# rapiro.js
Node.js controlled RAPIRO

ロボットキット [RAPIRO](https://github.com/mkokubun/rapiro.js.git) を Node.js (JavaScript) のみで制御することで IoT デバイスのようにする、個人的な趣味のプロジェクトです。
常に開発途上かつ気分次第です。


---

## コンテンツ

### 公開済み

|No.|タイトル|概要|
|:-:|---|---|---|
|[01](https://github.com/mkokubun/rapiro.js/tree/master/01)|サーボとLEDの制御     |Node.js + johnny-five による制御の基礎|
|[02](https://github.com/mkokubun/rapiro.js/tree/master/02)|ブラウザからポージング |Node.js + johnny-five + socket.io による遠隔制御と監視|
|[03](https://github.com/mkokubun/rapiro.js/tree/master/03)|10個の基本動作の実装   |RAPIRO 標準の基本動作の移植|
|[04](https://github.com/mkokubun/rapiro.js/tree/master/04)|距離センサの搭載      |拡張用アナログピンの利用|

### 今後の予定
|No.|タイトル|概要|
|:-:|---|---|
|05|静電容量タッチセンサの搭載 |拡張用 I2C ピンの利用|
|06|スピーカーの搭載と音声合成 |VoiceText Web API の利用|
|07|天気情報をしゃべる        |OpenWeatherMap API の利用|
|08|カメラの搭載              |静止画・動画撮影とストリーミング|
|09|家電の操作               |irMagician-T の利用|
|10|引き続き考え中...         | |


---

## 準備するもの・こと

このプロジェクトで遊ぶためには、以下の準備が必要です。

- RAPIRO 本体
    - 購入（販売しているのは[こちら](http://www.rapiro.com/ja/#buy)）
    - 組み立て（組み立てマニュアルは[こちら](http://www.rapiro.com/ja/assembly-manual/)）
- ACアダプタ
    - RAPIRO で動作確認済のもの（例えば[こちら](http://wiki.rapiro.com/page/ac-adaptor_ja/)）
- Raspberry Pi 3 Model B
    - [NOOBS_v2_1_0](https://www.raspberrypi.org/downloads/noobs/) をインストール済
    - 無線LAN の設定・接続済
    - SSH や VNC によるリモート接続の設定済
    - シリアル通信の設定済（例えば[こちら](http://qiita.com/mkoku/items/111e6ec21395065f0c28)の手順で）
    - Node.js のインストール済（例えば[こちら](http://qiita.com/mkoku/items/111e6ec21395065f0c28)の手順で）
    - RAPIRO 内に搭載済（例えば[こちら](http://qiita.com/mkoku/items/191ead1b62693003bf64)の手順で）
- PC
    - コーディングしたり、RAPIRO 内の Raspberry Pi に SSH や VNC や FTP したり、Arduino IDE で RAPIRO に Firmata を書き込んだりできれば、なんでも構いません
    - 私は Windows 10 の ノートPC（5万円）を使っています
- 無線LAN 環境
    - RAPIRO (Raspberry Pi) に PC・タブレット・スマートフォンなどでアクセスできれば、どんな環境でも構いません
    - 私はスマートフォンのテザリング（インターネット共有）でまかなっています
- RAPIRO のメイン基板への Firmata の書き込み
    - [Arduino IDE](https://www.arduino.cc/en/main/software) で StandardFirmataPlus を書き込んでおきます
    - ただし、普通に "Arduino/Genuino Uno" の設定で書き込むと、RAPIRO に拡張用に備わっているアナログ A6・A7 ピンが使えないため、[こちらの手順](http://qiita.com/mkoku/items/253b7b2869f0baba2fa2)で書き込んでおきます

---

## 履歴

- 2017/01/28
    - rapiro.js リポジトリを新規作成
    - コンテンツ 01～04 をアップ