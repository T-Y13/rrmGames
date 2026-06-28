import React from "react";

import { GAME_TITLE_SHORT } from "../constants/branding";
import { clearRoomSession } from "../lib/playerPresence";

export class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV && typeof console !== "undefined" && console.error) {
      console.error("[AppErrorBoundary]", error, info?.componentStack);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReturnToEntry = () => {
    clearRoomSession();
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 p-6 text-slate-100 flex items-center justify-center">
          <div
            className="w-full max-w-md space-y-6 rounded-2xl border border-slate-700/80 bg-slate-900/90 p-8 text-center shadow-xl"
            role="alert"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400/90">
              {GAME_TITLE_SHORT}
            </p>
            <h1 className="text-xl font-bold text-slate-50">表示中に問題が発生しました</h1>
            <p className="text-sm text-slate-400 leading-relaxed">
              データの読み込みや画面の描画中に予期しないエラーが起きました。再読み込みで改善することがあります。
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={this.handleReload}
                className="rounded-xl bg-cyan-500 px-6 py-3 font-bold text-slate-950 hover:bg-cyan-400 transition-colors"
              >
                ページを再読み込み
              </button>
              <button
                type="button"
                onClick={this.handleReturnToEntry}
                className="rounded-xl border border-slate-600 bg-slate-800 px-6 py-3 font-bold text-slate-200 hover:bg-slate-700 transition-colors"
              >
                セッションをリセットして開始画面へ
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
