import React from "react";
import SoundSettingsControl from "./SoundSettingsControl";

/**
 * 右上: 名前#ID、その下に ⚙ から音量パネル
 */
export default function TopRightHud({
  myFullId,
  seVolume,
  bgmVolume,
  onSeVolumeChange,
  onBgmVolumeChange,
  onReturnToLobby,
  returnToLobbyLabel,
  returnToLobbyHint,
}) {
  if (!myFullId) return null;

  return (
    <div className="fixed top-3 right-3 z-[200] flex flex-col items-end gap-1 select-none">
      <div className="max-w-[min(calc(100vw-5.5rem),18rem)] rounded-xl border border-cyan-500/30 bg-slate-800/95 px-3 py-1.5 shadow-md">
        <span className="block truncate font-mono text-xs font-bold text-cyan-300" title={myFullId}>
          {myFullId}
        </span>
      </div>
      <SoundSettingsControl
        seVolume={seVolume}
        bgmVolume={bgmVolume}
        onSeVolumeChange={onSeVolumeChange}
        onBgmVolumeChange={onBgmVolumeChange}
        onReturnToLobby={onReturnToLobby}
        returnToLobbyLabel={returnToLobbyLabel}
        returnToLobbyHint={returnToLobbyHint}
        className="w-full pr-0.5"
      />
    </div>
  );
}
