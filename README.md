# NS-TYPING

数字・記号専用のタイピング練習ゲームです。

## 画面遷移図

![画面遷移図](./images/flow.png)

[UI トレース](https://www.figma.com/proto/ilvpEFLPiIpurK50sKYBUJ/UI%E3%83%88%E3%83%AC%E3%83%BC%E3%82%B9?page-id=0%3A1&type=design&node-id=1-2&viewport=127%2C247%2C0.14&t=WNtpkY8cXm1EmoMP-1&scaling=scale-down&starting-point-node-id=1%3A2&mode=design)

[Figma のプロトタイプのリンク](https://www.figma.com/proto/5m2lONFVvXU8gQbnKYqB7V/%E7%94%BB%E9%9D%A2%E9%81%B7%E7%A7%BB%E5%9B%B3?page-id=0%3A1&type=design&node-id=1-2&viewport=-846%2C126%2C0.37&t=k3MWdwYGd1GHFb1A-1&scaling=scale-down&starting-point-node-id=1%3A2&mode=design)

## 環境構築

### Minikube, kubectl のインストール（macOS）

```
brew install minikube kubectl
```

### Minikube を起動し、クラスターを作成

```
minikube start
```

### Ingressコントローラーを有効化
```
minikube addons enable ingress
```

### Minikube の Docker デーモンでビルドするための設定

```
eval $(minikube docker-env)
```

### Docker イメージを作成

```
docker build -t game:1 .
```

### マニフェストファイル（yaml）から Deployment, Service, Ingress を作成

```
kubectl apply -f k8s/
```

### Service の URL を取得

```
minikube service tetsu19n1101087-game-service --url
```
出力された URL にアクセスする。

### host名で名前解決できるよう設定
`minikube ip` で外部のIPを取得。

次のように取得したIPと名前解決したいホスト名を、`/etc/hosts` に追記する。
```
192.168.74.4 tetsu19n1101087-game.app
```

### host名でアプリにアクセスできることを確認
```
curl tetsu19n1101087-game.app
```