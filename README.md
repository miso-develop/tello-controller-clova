# Tello Conrtoller (Clovaスキル)

Clovaスキルからトイドローン「Tello」を音声操作する方法です。  
当リポジトリにはエンドポイントで実行するNode.jsプログラムおよびClovaスキルの対話モデルTSVを含みます。  



## 必要なもの

* Tello  
* Clova搭載デバイス (Clova Friends等)  
* PC (Raspberry Pi等でも可)  
* Tello接続用Wi-Fiポート (USB Wi-Fiコネクタ等)  



## PC環境

* git ver2以上
* Node.js ver8系
* npm ver5系
* PCにはグローバルネットワーク接続用とTelloへのWi-Fi接続用の2つのネットワークポートが必要です  



## セットアップ

### エンドポイントをPC上で実行

以下のコマンドを実行しエンドポイントをPC上で実行します。  

```
git clone https://github.com/miso-develop/tello-controller-clova
cd tello-controller-clova

npm install

node index.js
```

### ngrokのインストール・実行

別のターミナルを起動し、当リポジトリのディレクトリで以下のコマンドを実行します。

```
npm install -g ngrok

ngrok http 3000
```

以下のような結果が返ってきますので、httpsのURLをコピーします。

```
ngrok by @inconshreveable                                       (Ctrl+C to quit)

Session Status                online
Account                       Miso Tanaka (Plan: Free)
Version                       2.2.8
Region                        United States (us)
Web Interface                 http://127.0.0.1:4040
Forwarding                    http://xxxxxxxx.ngrok.io -> localhost:3000
Forwarding                    https://xxxxxxxx.ngrok.io -> localhost:3000

Connections                   ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```

### Clovaスキルの作成

Clova Developer Centerにてスキルを作成します。  
途中、「ExtensionサーバーのURL」にて先ほどコピーしたngrokのURLを入力します。  

対話モデル画面まで進んだら、以下のようTSVファイルをアップロードしスロットを作成します。  

1. カスタム スロットタイプを追加します
1. slottypeのTSVと同名のスロット名を入力します
1. TSVファイルをアップロード
1. 保存
1. 上記を「action」「direction」「particle」「unit」のTSVでそれぞれ繰り返します
1. ビルトイン スロットタイプの「CLOVA.NUMBER」も追加しておきます

次にインテントのTSVファイルをアップロードします。  

1. カスタム インテントを追加します
1. インテント名に「ControllIntent」と入力します
1. intentのTSVファイルをアップロード
1. 保存
1. ビルド

以上でセットアップは完了です。  



### PCのWi-Fi設定

PCにUSB等のWi-Fiコネクタを接続します。  
これによりPC自体のネットワークに加え、もうひとつネットワークが追加されます。  
片方をグローバルネットワークに、もう片方をTelloに接続します。  



## スキルの実行

この状態でClovaスキルを実行すると、Telloを音声操作できます。  

### 操作発話

|操作|発話例|備考|
|---|---|---|
|離陸|離陸<br>発進||
|着陸|着陸<br>着地||
|移動|100cm前進<br>右に50cm|距離（20～200cm ※1）と方向（前後左右）を同時に伝えます。|
|上昇/下降|100cm上昇<br>下に50cm|距離（20～200cm ※1）を同時に伝えます。|
|旋回|90度右旋回<br>左に180度旋回|角度（1～360度）と方向（左右）を同時に伝えます。|
|フリップ|バックフリップ<br>右フリップ|方向（前後左右）を同時に伝えます。|

※1 距離はプログラム上200cmまでとしていますが、プログラムを書き換えることで最長500cmまで指定可能です。



