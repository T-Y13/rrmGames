import React from "react";

import { Coins, Loader2, X } from "lucide-react";

import {

  FINAL_GAME_DAY,

  LAST_DAILY_DAY,

} from "../constants/gameBalance";

import {

  GAME_TITLE_WITH_ACRONYM,

  PRERELEASE_SOLO_ONLY,

  SOLO_PRERELEASE_NOTICE,

  TITLE_LOGO_PATH,

} from "../constants/branding";

import { publicAssetUrl } from "../lib/publicAssetUrl";

import TopRightHud from "./TopRightHud";
import CopyClipboardButton from "./CopyClipboardButton";

/** pointerdown で即実行（背景 BGM 解除や再描画で click が落ちるのを防ぐ）。キーボードは onClick も残す */
function bindPrimaryAction(handler, disabled) {
  const run = () => {
    if (disabled) return;
    handler();
  };
  return {
    onPointerDown: (e) => {
      if (disabled || e.button !== 0) return;
      run();
    },
    onClick: run,
  };
}



/** ルーム作成・参加 */

export default function Lobby({

  myFullId,

  copied,

  onCopyMyId,

  seVolume,

  bgmVolume,

  onSeVolumeChange,

  onBgmVolumeChange,

  loading,

  onSoloPlay,

  multiOpen,

  onToggleMultiOpen,

  multiAction,

  onSetMultiAction,

  isPrivateRoom,

  onSetPrivateRoom,

  onCreateRoom,

  joinInput,

  onJoinInputChange,

  onJoinRoom,

  invitesPanelOpen = false,

  pendingInvites = [],

  invitesLoading = false,

  invitesProbeReady = false,

  onFetchInvites,

  onJoinInvite,

  uiError,

  onClearUiError,

}) {

  const multiplayerLocked = PRERELEASE_SOLO_ONLY;

  const multiplayerPanelOpen = multiOpen && !multiplayerLocked;

  const hasInvites = pendingInvites.length > 0;

  const inviteCheckDisabled = loading || invitesLoading;



  return (

    <div className="min-h-screen bg-slate-950 p-4 text-slate-100 flex items-center justify-center">

      <TopRightHud

        myFullId={myFullId}

        seVolume={seVolume}

        bgmVolume={bgmVolume}

        onSeVolumeChange={onSeVolumeChange}

        onBgmVolumeChange={onBgmVolumeChange}

      />



      <div className="w-full max-w-md space-y-5 pt-10">

        <div className="flex flex-col items-center gap-4 text-center">

          <img

            src={publicAssetUrl(TITLE_LOGO_PATH)}

            alt={GAME_TITLE_WITH_ACRONYM}

            className="mx-auto w-full max-w-[min(92vw,440px)] h-auto object-contain select-none drop-shadow-[0_0_28px_rgba(34,211,238,0.14)]"

          />

          <h2 className="font-[Rajdhani] text-lg sm:text-xl font-bold tracking-tight text-slate-50 leading-tight px-1">

            {GAME_TITLE_WITH_ACRONYM}

          </h2>



          <div className="w-full rounded-xl border border-cyan-500/25 bg-slate-900/80 px-3 py-2.5 text-left">

            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-400">News · ひとこと</p>

            <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">{SOLO_PRERELEASE_NOTICE}</p>

          </div>

        </div>



        <div className="text-center space-y-2 pt-1">
          <p className="text-xs text-slate-500">ようこそ</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <p className="text-2xl font-bold font-mono text-cyan-100">{myFullId || "プレイヤー"}</p>
            {myFullId ? (
              <CopyClipboardButton copied={copied} onCopy={onCopyMyId} />
            ) : null}
          </div>
          <p className="text-sm text-slate-400">どのように遊びますか？</p>
        </div>



        <button

          type="button"

          {...bindPrimaryAction(onSoloPlay, loading)}

          disabled={loading}

          className="w-full rounded-2xl bg-gradient-to-br from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 active:scale-[0.98] py-5 font-bold text-white text-xl transition-all disabled:opacity-50 shadow-lg shadow-violet-900/30 flex items-center justify-center gap-3"

        >

          {loading ? (

            <Loader2 size={24} className="animate-spin" />

          ) : (

            <>

              <span className="text-2xl">🎮</span>

              <span>一人で遊ぶ</span>

            </>

          )}

        </button>



        <div className="relative">

          <button

            type="button"

            disabled={multiplayerLocked}

            aria-disabled={multiplayerLocked}

            tabIndex={multiplayerLocked ? -1 : 0}

            title={multiplayerLocked ? "マルチプレイは開発中です" : undefined}

            className={[

              "w-full rounded-2xl py-5 font-bold text-xl shadow-lg flex items-center justify-center gap-3 transition-all",

              multiplayerLocked

                ? "pointer-events-none cursor-not-allowed border border-slate-700/90 bg-slate-900/60 text-slate-500 grayscale opacity-[0.52]"

                : multiOpen

                  ? "bg-cyan-500 text-slate-950 shadow-cyan-900/30"

                  : "bg-slate-800 hover:bg-slate-700 text-white",

            ].join(" ")}

            {...(multiplayerLocked

              ? {}

              : { onClick: onToggleMultiOpen })}

          >

            <span className="text-2xl grayscale">👥</span>

            <span className="opacity-90">みんなで遊ぶ</span>

            {!multiplayerLocked && <span className="text-base opacity-60 ml-1">{multiOpen ? "▲" : "▼"}</span>}

          </button>

          {multiplayerLocked && (

            <div

              className="pointer-events-none absolute -top-3 left-1/2 z-10 flex -translate-x-1/2 flex-wrap items-center justify-center gap-0 px-2"

              aria-hidden="true"

            >

              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-slate-950/92 px-2.5 py-1 shadow-[0_8px_28px_rgba(0,0,0,0.45)] ring-1 ring-cyan-500/15 backdrop-blur-sm">

                <span className="rounded-full bg-gradient-to-r from-amber-400 to-amber-300 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.14em] text-amber-950 shadow-sm">

                  Coming Soon

                </span>

                <span className="pr-1 text-[10px] font-bold tracking-wide text-cyan-100/95">

                  準備中

                </span>

              </span>

            </div>

          )}

        </div>



        {multiplayerPanelOpen && (

          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-4 space-y-3">

            <button

              type="button"

              onClick={() => onSetMultiAction((a) => (a === "create" ? null : "create"))}

              className={`w-full rounded-xl py-3.5 font-semibold transition-all flex flex-col items-center gap-0.5 ${multiAction === "create" ? "bg-cyan-600 text-white" : "bg-slate-800 hover:bg-slate-700 text-slate-200"}`}

            >

              <span className="text-base font-bold">🏠 新しいルームを作成</span>

              <span className="text-xs opacity-60">{multiAction === "create" ? "▲ 閉じる" : "ホストとしてルームを立てる ▼"}</span>

            </button>

            {multiAction === "create" && (

              <div className="rounded-xl bg-slate-800 border border-slate-700 p-3 space-y-3">

                <div className="grid grid-cols-2 gap-2">

                  <button

                    type="button"

                    onClick={() => onSetPrivateRoom(false)}

                    className={`rounded-xl py-2.5 text-sm font-semibold transition-all ${!isPrivateRoom ? "bg-cyan-500 text-slate-950 ring-2 ring-cyan-400/60" : "bg-slate-700 text-slate-300 hover:bg-slate-600"}`}

                  >

                    🌐 公開ルーム

                  </button>

                  <button

                    type="button"

                    onClick={() => onSetPrivateRoom(true)}

                    className={`rounded-xl py-2.5 text-sm font-semibold transition-all ${isPrivateRoom ? "bg-rose-500 text-white ring-2 ring-rose-400/60" : "bg-slate-700 text-slate-300 hover:bg-slate-600"}`}

                  >

                    🔒 招待制

                  </button>

                </div>

                <p className="text-xs text-slate-400 text-center">

                  {isPrivateRoom ? "招待したIDのみ参加可" : "ルームIDを知っていれば誰でも参加可"}

                </p>

                <button

                  type="button"

                  {...bindPrimaryAction(onCreateRoom, loading)}

                  disabled={loading}

                  className="w-full rounded-xl bg-cyan-500 hover:bg-cyan-400 py-2.5 font-bold text-slate-950 transition-colors disabled:opacity-50"

                >

                  {loading ? "作成中…" : "ルームを作成"}

                </button>

              </div>

            )}



            <button

              type="button"

              onClick={() => onSetMultiAction((a) => (a === "join" ? null : "join"))}

              className={`w-full rounded-xl py-3.5 font-semibold transition-all flex flex-col items-center gap-0.5 ${multiAction === "join" ? "bg-cyan-600 text-white" : "bg-slate-800 hover:bg-slate-700 text-slate-200"}`}

            >

              <span className="text-base font-bold">🔑 ルームIDで参加</span>

              <span className="text-xs opacity-60">{multiAction === "join" ? "▲ 閉じる" : "6桁のルーム番号で入室 ▼"}</span>

            </button>

            {multiAction === "join" && (

              <div className="rounded-xl bg-slate-800 border border-slate-700 p-3 space-y-2">

                <div className="flex gap-2">

                  <input

                    value={joinInput}

                    onChange={(e) => onJoinInputChange(e.target.value.toUpperCase())}

                    maxLength={8}

                    onKeyDown={(e) => e.key === "Enter" && onJoinRoom()}

                    className="flex-1 rounded-lg border border-slate-700 bg-slate-700 px-3 py-2 text-sm text-center font-mono tracking-widest focus:border-cyan-500 focus:outline-none"

                    placeholder="ルームID"

                    autoFocus

                  />

                  <button

                    type="button"

                    onClick={onJoinRoom}

                    disabled={loading}

                    className="rounded-xl bg-slate-600 hover:bg-slate-500 px-5 py-2 font-medium transition-colors disabled:opacity-50"

                  >

                    参加

                  </button>

                </div>

              </div>

            )}



          </div>

        )}



        {!multiplayerLocked && (
          <>
            <button
              type="button"
              onClick={onFetchInvites}
              disabled={inviteCheckDisabled}
              className={[
                "w-full rounded-2xl py-3.5 font-semibold transition-all flex flex-col items-center gap-0.5 shadow-lg",
                hasInvites
                  ? "bg-rose-600 hover:bg-rose-500 text-white ring-2 ring-rose-400/50 animate-pulse active:scale-[0.98]"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 active:scale-[0.98]",
                inviteCheckDisabled ? "opacity-60" : "",
              ].join(" ")}
            >
              <span className="text-base font-bold flex items-center gap-2">
                <span className="text-lg">🔔</span>
                {invitesLoading && !invitesProbeReady
                  ? "招待を確認中…"
                  : hasInvites
                    ? `招待が ${pendingInvites.length} 件あります`
                    : "招待を確認"}
              </span>
              <span className={`text-xs opacity-80 ${hasInvites ? "text-rose-200" : "text-slate-400"}`}>
                {invitesLoading && !invitesProbeReady
                  ? "検索中…"
                  : hasInvites
                    ? "タップして一覧を表示"
                    : invitesProbeReady
                      ? "タップして最新の招待を取得"
                      : "自分宛ての招待ルームを検索"}
              </span>
            </button>

            {invitesPanelOpen && (
              <div className="rounded-xl border border-rose-500/30 bg-slate-800/80 p-3 space-y-2">
                {invitesLoading ? (
                  <p className="flex items-center justify-center gap-2 py-4 text-sm text-slate-400" role="status">
                    <Loader2 size={18} className="animate-spin shrink-0" aria-hidden />
                    招待を読み込み中…
                  </p>
                ) : pendingInvites.length === 0 ? (
                  <p className="py-3 text-center text-sm text-slate-400">表示できる招待はありません</p>
                ) : (
                  <ul className="space-y-2" role="list">
                    {pendingInvites.map((inv) => (
                      <li
                        key={inv.roomId}
                        className="flex items-center gap-3 rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2.5"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-slate-100 truncate">
                            招待者: {inv.hostName}
                          </p>
                          <p className="text-xs text-slate-400 mt-0.5">
                            ルームID{" "}
                            <span className="font-mono tracking-widest text-rose-200/90">{inv.roomId}</span>
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onJoinInvite(inv.roomId)}
                          disabled={loading}
                          className="shrink-0 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-cyan-400 transition-colors disabled:opacity-50"
                        >
                          参加
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </>
        )}



        {uiError && (

          <div

            className="rounded-xl border border-rose-500/40 bg-rose-950/35 px-3 py-3 text-left shadow-lg shadow-black/25"

            role="alert"

          >

            <div className="flex items-start gap-3">

              <span className="text-base leading-none shrink-0 pt-0.5 opacity-95" aria-hidden>

                ⚠️

              </span>

              <p className="flex-1 min-w-0 text-sm text-rose-100/95 leading-relaxed">{uiError}</p>

              {typeof onClearUiError === "function" && (

                <button

                  type="button"

                  onClick={onClearUiError}

                  className="shrink-0 rounded-lg p-1.5 text-rose-200/85 hover:bg-rose-500/15 hover:text-rose-50 transition-colors"

                  aria-label="エラーを閉じる"

                >

                  <X size={18} />

                </button>

              )}

            </div>

          </div>

        )}



        <div className="rounded-xl bg-slate-800/50 border border-slate-800 p-3 text-xs leading-relaxed text-slate-400 space-y-2.5">

          <p className="flex items-center gap-2 font-semibold text-slate-300">
            <span>ゲーム概要</span>
            <span className="inline-flex items-center gap-1 text-yellow-300 font-bold">
              <Coins size={14} aria-hidden={true} />
              お金をたくさん稼いだら勝ち！
              <Coins size={14} aria-hidden={true} />
            </span>
          </p>

          <p>

            <strong className="text-slate-300">1〜{LAST_DAILY_DAY}日目は育成パート。</strong>

            毎ターン、仕事・配信・神社・デイリースロットのどれかを選び、資金や運・技量・善行などを育てていきます。キャラごとに生活費が異なり、行動後に毎回かかるので、お金の持ちぐあいが勝負の土台になります。

          </p>

          <p>

            <strong className="text-slate-300">PON</strong> は行動のたびに少しずつ溜まり、高めになるとイベントが発生しやすくなります（内容は行動種別によって違うことも）。

            配信は運要素が強く、技量や善行が結果に効いてきます。

          </p>

          <p>

            <strong className="text-slate-300">{FINAL_GAME_DAY}日目は決戦。</strong>

            すごろくでゴールを目指し、素早くゴールするとスロットを長く行えます。

          </p>

          <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-700/60 leading-snug">

            具体的な金額・割合・各ステータスの効き方は、プレイ画面の説明やログで確認できます。

          </p>

        </div>

      </div>

    </div>

  );

}


