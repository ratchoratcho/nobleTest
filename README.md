# noble Test
## 注意
- pi0, pi3 どちらで動かすかによって適宜 `Dockerfile` 内のコードを書き換えてください
```dockerfile
FROM balenalib/raspberry-pi-alpine-node:8  # for pi0
# FROM balenalib/raspberrypi3-alpine-node:8  # for pi3
```

- 動かしたいプログラムを `start.sh` 内で指定してください

- balenaOS v2.32.0 での動作検証しかしていません． balenaOS v2.7.8 で動作させたい場合は，別途コンテナ内からbluez?にアクセスするための設定が必要だと思われます．

## version
```sh
$ node -v
v8.12.0
$ balena version
9.3.6
$
```

## get started
```sh
$ git clone https://github.com/ratchoratcho/nobleTest.git
$ cd nobleTest
$ sudo balena local push -s .
```
