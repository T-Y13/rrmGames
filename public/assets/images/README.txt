このフォルダに配置: slot-machine.png
例: public/assets/images/slot-machine.png
（フルパス例）RRM-game\public\assets\images\slot-machine.png

ブラウザからの URL: /assets/images/slot-machine.png
※ Vite は public/ 以下をサイトルートにそのまま配信します。

※ Windows で拡張子を隠していると「slot-machine.png」に見えても、実際は
  「slot-machine.png.png」のように二重拡張子だと 404 になります。拡張子表示をオンにして確認してください。

調整は src/index.css の :root（--slot-window-* など）と App.jsx の SPIN ボタン座標を参照。

※ 筐体の表示は src/assets/slot-machine.png を import しています。差し替えはまずこちらを更新（public は onError 用）。
