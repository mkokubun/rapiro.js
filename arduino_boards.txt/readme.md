# RAPIRO 用 Arduino IDE ボード定義ファイル "boards.txt"

RAPIRO には 拡張用のアナログピン A6・A7 があり、アナログのセンサを追加できます。

Firmata 経由で RAPIRO 制御する場合、Arduino IDE で StandardFirmataPlus を書き込みますが、通常の "Arduino/Genuino Uno" を選択して書き込むと、A6・A7ピンが使えません。

この boards.txt を使い、Arduino IDE で "Rapiro Control Board" を選択して書き込むことで、A6・A7ピンが使えるようになります。

---
## 使い方

- この "boards.txt" をダウンロード
- 以下の場所の "boards.txt" と置き換える（Windows の場合）
    - {Arduino IDE のインストールディレクトリ} \hardware\arduino\avr
- Arduino IDE の [ツール] => [ボード] で "Rapiro Control Board" を選択
- StandardFirmataPlus を書き込む

---

## さらに詳しくは...

[二足歩行ロボット Rapiro を Node.js で制御 [3.5] A6/A7ピンを使う @Qiita](http://qiita.com/mkoku/items/253b7b2869f0baba2fa2)

---
2017.01.28　by Mitsuteru Kokubun
