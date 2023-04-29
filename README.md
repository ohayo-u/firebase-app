# MOG

[MOG](https://m0g.app/)は食材と仲良くなれるアプリです。<br>
料理と、その料理に使った食材を登録することで、食材との仲良し度を上げることができます。

![料理登録の画面](https://user-images.githubusercontent.com/124668307/235273375-f5a58cd5-09b7-4227-95e5-11d7fe5ceba4.png)
使った食材と一緒に料理を登録します。

![玉ねぎ料理をたくさん登録している状態](https://user-images.githubusercontent.com/124668307/235273525-2cdc64e3-b3c5-4444-9228-8f6365decd20.png)
その食材を使った料理を作れば作るほど、食材との仲良し度が上がっていきます！

## 機能一覧

- ログイン機能(firebase authentication)
  - google ログイン
  - 匿名ログイン
- 料理登録機能(cloud firestore)
  - 料理写真登録(firestore storage)
  - 料理名登録
  - 使用食材登録(react-select)

## 使用技術

- react 18.2.0
- react-router-dom 6.9.0
- react-select 5.7.2
- firebase(auth, firestore, storage) 9.17.2
- sass 1.60.0
