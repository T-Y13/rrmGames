import { soundAssetUrl } from "./soundAssetUrl";

/** スロット演出用サウンド（Web Audio + MP3） */
export function createSlotSoundManager() {
  let actx = null;
  let muted = false;
  let spinNode = null;
  let finalDrone = null;
  /** 効果音〜1.0、BGM は別スライダー（既定 8%） */
  let seVol = 0.82;
  let bgmVol = 0.08;
  let dailyBgmPlaying = false;
  /** アプリ側が開始を要求済みだが読み込み前／再生失敗リカバリ用 */
  let dailyBgmDesired = false;
  let dailyBgmStartInFlight = false;
  let dailyBgmPointerUnlockScheduled = false;
  let day8BgmPlaying = false;
  let day8BgmDesired = false;
  let day8BgmStartInFlight = false;
  let day8BgmPointerUnlockScheduled = false;
  /** タイトル〜ロビー〜待機室（キャラ選択） */
  let menuBgmPlaying = false;
  let menuBgmDesired = false;
  let menuBgmStartInFlight = false;
  let menuBgmPointerUnlockScheduled = false;
  const cache = {};

  function clamp01(v) {
    const n = Number(v);
    if (!Number.isFinite(n)) return 1;
    return Math.max(0, Math.min(1, n));
  }

  function getCtx() {
    if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)();
    if (actx.state === "suspended") actx.resume().catch(() => {});
    return actx;
  }

  function synth({ freq = 440, dur = 0.15, type = "triangle", vol = 0.28, ramp = true } = {}) {
    if (muted) return;
    try {
      const ac = getCtx();
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ac.currentTime);
      const v = vol * seVol;
      gain.gain.setValueAtTime(v, ac.currentTime);
      if (ramp) gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + dur);
      osc.start(ac.currentTime);
      osc.stop(ac.currentTime + dur + 0.01);
    } catch (_) {}
  }

  function arpeggio(freqs, interval = 0.07, dur = 0.12, type = "triangle") {
    freqs.forEach((f, i) =>
      setTimeout(() => synth({ freq: f, dur, type, vol: 0.22 }), i * interval * 1000),
    );
  }

  function stopSpinInternal() {
    if (spinNode) {
      try {
        spinNode.osc.stop();
        spinNode.lfo.stop();
      } catch (_) {}
      spinNode = null;
    }
    stopFile("spin");
  }

  async function preloadUrl(cacheKey, fileNameWithExt) {
    try {
      const url = soundAssetUrl(fileNameWithExt);
      const res = await fetch(url, { method: "GET", cache: "force-cache" });
      if (!res.ok) {
        if (import.meta.env.DEV && String(cacheKey).endsWith("_bgm")) {
          console.warn(`[PONS BGM] ${res.status} ${res.statusText}: ${url} — public/sounds/${fileNameWithExt}`);
        }
        cache[cacheKey] = null;
        return;
      }
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      const audio = new Audio(objectUrl);
      audio.preload = "auto";
      await new Promise((resolve, reject) => {
        audio.addEventListener("canplaythrough", resolve, { once: true });
        audio.addEventListener("error", reject, { once: true });
        setTimeout(reject, 4000);
      });
      cache[cacheKey] = audio;
    } catch (_) {
      if (import.meta.env.DEV && String(cacheKey).endsWith("_bgm")) {
        console.warn(`[PONS BGM] 読み込みに失敗: ${soundAssetUrl(fileNameWithExt)}`);
      }
      cache[cacheKey] = null;
    }
  }

  async function preload(key) {
    return preloadUrl(key, `${key}.mp3`);
  }

  function pauseWarHorn() {
    stopFile("war_horn");
  }

  function stopFinalDroneHard() {
    if (finalDrone) {
      if (finalDrone.type === "synth") {
        try {
          finalDrone.osc.stop();
          finalDrone.osc2.stop();
        } catch (_) {}
      }
      finalDrone = null;
    }
    stopFile("final_battle");
  }

  function mp3VolumeForKey(key) {
    if (key === "daily_bgm" || key === "day8_bgm" || key === "menu_bgm") return bgmVol;
    return seVol;
  }

  function playFile(key, loop = false) {
    if (muted) return false;
    const a = cache[key];
    if (!a) return false;
    try {
      a.loop = loop;
      a.volume = mp3VolumeForKey(key);
      a.currentTime = 0;
      a.play().catch(() => {});
      return true;
    } catch (_) {
      return false;
    }
  }

  function stopFile(key) {
    const a = cache[key];
    if (a) {
      try {
        a.pause();
        a.currentTime = 0;
      } catch (_) {}
    }
  }

  function queueDailyBgmPointerUnlockRetry() {
    if (dailyBgmPointerUnlockScheduled || !dailyBgmDesired || muted) return;
    dailyBgmPointerUnlockScheduled = true;
    const onPointer = () => {
      dailyBgmPointerUnlockScheduled = false;
      document.removeEventListener("pointerdown", onPointer, true);
      tryStartDailyBgmPlayback();
    };
    document.addEventListener("pointerdown", onPointer, { capture: true, once: true });
  }

  function tryStartDailyBgmPlayback() {
    stopDay8BgmPlaybackOnly();
    stopMenuBgmPlaybackOnly();
    if (muted || !dailyBgmDesired || dailyBgmStartInFlight || dailyBgmPlaying) return;
    const a = cache.daily_bgm;
    if (!a) return;
    a.loop = true;
    a.volume = bgmVol;
    dailyBgmStartInFlight = true;
    try {
      a.currentTime = 0;
      void a
        .play()
        .then(() => {
          dailyBgmPlaying = true;
          dailyBgmStartInFlight = false;
        })
        .catch(() => {
          dailyBgmStartInFlight = false;
          dailyBgmPlaying = false;
          queueDailyBgmPointerUnlockRetry();
        });
    } catch (_) {
      dailyBgmStartInFlight = false;
      queueDailyBgmPointerUnlockRetry();
    }
  }

  function stopDailyBgmPlaybackOnly() {
    dailyBgmStartInFlight = false;
    stopFile("daily_bgm");
    dailyBgmPlaying = false;
  }

  function stopDailyBgmInternal() {
    dailyBgmDesired = false;
    stopDailyBgmPlaybackOnly();
  }

  function stopDay8BgmPlaybackOnly() {
    day8BgmStartInFlight = false;
    stopFile("day8_bgm");
    day8BgmPlaying = false;
  }

  function stopDay8BgmInternal() {
    day8BgmDesired = false;
    stopDay8BgmPlaybackOnly();
  }

  function queueMenuBgmPointerUnlockRetry() {
    if (menuBgmPointerUnlockScheduled || !menuBgmDesired || muted) return;
    menuBgmPointerUnlockScheduled = true;
    const onPointer = () => {
      menuBgmPointerUnlockScheduled = false;
      document.removeEventListener("pointerdown", onPointer, true);
      tryStartMenuBgmPlayback();
    };
    document.addEventListener("pointerdown", onPointer, { capture: true, once: true });
  }

  function tryStartMenuBgmPlayback() {
    stopDailyBgmPlaybackOnly();
    stopDay8BgmPlaybackOnly();
    if (muted || !menuBgmDesired || menuBgmStartInFlight || menuBgmPlaying) return;
    const a = cache.menu_bgm;
    if (!a) return;
    a.loop = true;
    a.volume = bgmVol;
    menuBgmStartInFlight = true;
    try {
      a.currentTime = 0;
      void a
        .play()
        .then(() => {
          menuBgmPlaying = true;
          menuBgmStartInFlight = false;
        })
        .catch(() => {
          menuBgmStartInFlight = false;
          menuBgmPlaying = false;
          queueMenuBgmPointerUnlockRetry();
        });
    } catch (_) {
      menuBgmStartInFlight = false;
      queueMenuBgmPointerUnlockRetry();
    }
  }

  function stopMenuBgmPlaybackOnly() {
    menuBgmStartInFlight = false;
    stopFile("menu_bgm");
    menuBgmPlaying = false;
  }

  function stopMenuBgmInternal() {
    menuBgmDesired = false;
    stopMenuBgmPlaybackOnly();
  }

  function queueDay8BgmPointerUnlockRetry() {
    if (day8BgmPointerUnlockScheduled || !day8BgmDesired || muted) return;
    day8BgmPointerUnlockScheduled = true;
    const onPointer = () => {
      day8BgmPointerUnlockScheduled = false;
      document.removeEventListener("pointerdown", onPointer, true);
      tryStartDay8BgmPlayback();
    };
    document.addEventListener("pointerdown", onPointer, { capture: true, once: true });
  }

  function tryStartDay8BgmPlayback() {
    stopDailyBgmPlaybackOnly();
    stopMenuBgmPlaybackOnly();
    if (muted || !day8BgmDesired || day8BgmStartInFlight || day8BgmPlaying) return;
    const a = cache.day8_bgm;
    if (!a) return;
    a.loop = true;
    a.volume = bgmVol;
    day8BgmStartInFlight = true;
    try {
      a.currentTime = 0;
      void a
        .play()
        .then(() => {
          day8BgmPlaying = true;
          day8BgmStartInFlight = false;
        })
        .catch(() => {
          day8BgmStartInFlight = false;
          day8BgmPlaying = false;
          queueDay8BgmPointerUnlockRetry();
        });
    } catch (_) {
      day8BgmStartInFlight = false;
      queueDay8BgmPointerUnlockRetry();
    }
  }

  return {
    async init() {
      await Promise.allSettled([
        Promise.all(["start", "spin", "stop", "reach", "win", "jackpot", "final_battle", "war_horn"].map((k) => preload(k))),
        preloadUrl("daily_bgm", "View_from_the_Fifth_Floor.mp3"),
        preloadUrl("day8_bgm", "Morning_of_the_Stand.mp3"),
        preloadUrl("menu_bgm", "Velvet_Current.mp3"),
      ]);
      if (day8BgmDesired && cache.day8_bgm && !muted) tryStartDay8BgmPlayback();
      else if (dailyBgmDesired && cache.daily_bgm && !muted) tryStartDailyBgmPlayback();
      else if (menuBgmDesired && cache.menu_bgm && !muted) tryStartMenuBgmPlayback();
    },

    setSeVolume(v) {
      seVol = clamp01(v);
    },

    setBgmVolume(v) {
      bgmVol = clamp01(v);
      for (const k of ["daily_bgm", "day8_bgm", "menu_bgm"]) {
        const a = cache[k];
        if (a) a.volume = bgmVol;
      }
    },

    /** 日常 1〜7日目（ゲーム側で呼び分け）。ループ。 */
    startDailyBgm() {
      stopMenuBgmInternal();
      stopDay8BgmInternal();
      dailyBgmDesired = true;
      if (muted) return;
      tryStartDailyBgmPlayback();
    },

    stopDailyBgm() {
      stopDailyBgmInternal();
    },

    /** 8日目すごろく（subPhase day8）。同じ BGM スライダー。 */
    startDay8Bgm() {
      stopMenuBgmInternal();
      stopDailyBgmInternal();
      day8BgmDesired = true;
      if (muted) return;
      tryStartDay8BgmPlayback();
    },

    stopDay8Bgm() {
      stopDay8BgmInternal();
    },

    /** 初期画面〜モード選択〜待機室（キャラ選択）。ループ。 */
    startMenuBgm() {
      stopDailyBgmInternal();
      stopDay8BgmInternal();
      menuBgmDesired = true;
      if (muted) return;
      tryStartMenuBgmPlayback();
    },

    stopMenuBgm() {
      stopMenuBgmInternal();
    },

    setMuted(v) {
      muted = v;
      if (v) {
        this.stopSpin();
        this.stopFinalBattleAmbient();
        stopDailyBgmPlaybackOnly();
        stopDay8BgmPlaybackOnly();
        stopMenuBgmPlaybackOnly();
      } else if (day8BgmDesired && cache.day8_bgm) {
        tryStartDay8BgmPlayback();
      } else if (dailyBgmDesired && cache.daily_bgm) {
        tryStartDailyBgmPlayback();
      } else if (menuBgmDesired && cache.menu_bgm) {
        tryStartMenuBgmPlayback();
      }
    },
    getMuted() {
      return muted;
    },

    playStart() {
      if (!playFile("start")) arpeggio([523, 659, 784], 0.06, 0.1, "square");
    },

    startSpin() {
      if (muted || spinNode) return;
      if (playFile("spin", true)) return;
      try {
        const ac = getCtx();
        const osc = ac.createOscillator();
        const lfo = ac.createOscillator();
        const lfoG = ac.createGain();
        const gain = ac.createGain();
        lfo.frequency.value = 14;
        lfoG.gain.value = 20;
        lfo.connect(lfoG);
        lfoG.connect(osc.frequency);
        osc.connect(gain);
        gain.connect(ac.destination);
        osc.type = "sawtooth";
        osc.frequency.value = 160;
        gain.gain.value = 0.07 * seVol;
        lfo.start();
        osc.start();
        spinNode = { osc, lfo };
      } catch (_) {}
    },

    stopSpin() {
      stopSpinInternal();
    },

    playStop(reelIdx = 0) {
      if (!playFile("stop")) synth({ freq: 220 - reelIdx * 35, dur: 0.09, type: "square", vol: 0.18 });
    },

    playReach() {
      if (!playFile("reach")) arpeggio([392, 523, 659, 784, 1047], 0.075, 0.16);
    },

    /** 日常の配信ミスなど：アニメ的な「ガーン」（下降ワウ） */
    playStreamFailGaan() {
      if (muted) return;
      synth({ freq: 155, dur: 0.06, type: "square", vol: 0.22, ramp: true });
      setTimeout(() => {
        synth({ freq: 85, dur: 0.08, type: "square", vol: 0.2, ramp: true });
      }, 40);
      try {
        const ac = getCtx();
        const t0 = ac.currentTime;
        const osc = ac.createOscillator();
        const gain = ac.createGain();
        osc.connect(gain);
        gain.connect(ac.destination);
        osc.type = "triangle";
        osc.frequency.setValueAtTime(295, t0);
        osc.frequency.exponentialRampToValueAtTime(72, t0 + 0.95);
        gain.gain.setValueAtTime(0.32 * seVol, t0);
        gain.gain.exponentialRampToValueAtTime(0.002, t0 + 1.05);
        osc.start(t0);
        osc.stop(t0 + 1.08);
      } catch (_) {}
      setTimeout(() => synth({ freq: 98, dur: 0.2, type: "sine", vol: 0.08, ramp: true }), 720);
    },

    /** 配信でPON発火（大炎上）：パチパチ＋轟音風 */
    playStreamPonBurn() {
      if (muted) return;
      setTimeout(() => synth({ freq: 1750, dur: 0.055, type: "square", vol: 0.16, ramp: true }), 40);
      setTimeout(() => synth({ freq: 2200, dur: 0.045, type: "square", vol: 0.12, ramp: true }), 110);
      for (let i = 0; i < 16; i++) {
        setTimeout(() => {
          synth({
            freq: 320 + Math.random() * 750,
            dur: 0.035,
            type: Math.random() > 0.5 ? "square" : "sawtooth",
            vol: 0.1 + Math.random() * 0.09,
            ramp: true,
          });
        }, i * 26);
      }
      setTimeout(() => {
        synth({ freq: 520, dur: 0.07, type: "triangle", vol: 0.22, ramp: true });
        synth({ freq: 380, dur: 0.09, type: "square", vol: 0.18, ramp: true });
      }, 380);
      try {
        const ac = getCtx();
        const t0 = ac.currentTime + 0.42;
        const osc = ac.createOscillator();
        const gain = ac.createGain();
        osc.connect(gain);
        gain.connect(ac.destination);
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(260, t0);
        osc.frequency.exponentialRampToValueAtTime(38, t0 + 0.58);
        gain.gain.setValueAtTime(0.36 * seVol, t0);
        gain.gain.exponentialRampToValueAtTime(0.002, t0 + 0.65);
        osc.start(t0);
        osc.stop(t0 + 0.68);
      } catch (_) {}
      setTimeout(() => synth({ freq: 120, dur: 0.35, type: "triangle", vol: 0.14, ramp: true }), 520);
    },

    /** 仕事でPON発火（弁償）：お皿のガラガラ→ガシャーン風 */
    playWorkPonPlateBreak() {
      if (muted) return;
      for (let i = 0; i < 9; i++) {
        setTimeout(() => {
          synth({
            freq: 2100 + Math.random() * 2600,
            dur: 0.022,
            type: "square",
            vol: 0.11 + Math.random() * 0.07,
            ramp: true,
          });
        }, i * 34);
      }
      setTimeout(() => synth({ freq: 440, dur: 0.045, type: "triangle", vol: 0.18, ramp: true }), 300);
      setTimeout(() => {
        synth({ freq: 165, dur: 0.26, type: "sawtooth", vol: 0.34, ramp: true });
        synth({ freq: 92, dur: 0.3, type: "square", vol: 0.24, ramp: true });
      }, 332);
      setTimeout(() => synth({ freq: 68, dur: 0.4, type: "triangle", vol: 0.2, ramp: true }), 420);
      setTimeout(() => synth({ freq: 52, dur: 0.18, type: "sine", vol: 0.09, ramp: true }), 460);
    },

    /** チャンスカットインのあとハズレ（ガセ）時：短い不協和バズ→下降＋気落ち気味の一息 */
    playReachGaseSting() {
      if (muted) return;
      synth({ freq: 310, dur: 0.1, type: "sawtooth", vol: 0.2, ramp: true });
      setTimeout(() => {
        synth({ freq: 195, dur: 0.16, type: "square", vol: 0.14, ramp: true });
      }, 70);
      setTimeout(() => {
        synth({ freq: 142, dur: 0.24, type: "triangle", vol: 0.12, ramp: true });
      }, 180);
      try {
        const ac = getCtx();
        const t0 = ac.currentTime;
        const osc = ac.createOscillator();
        const gain = ac.createGain();
        osc.connect(gain);
        gain.connect(ac.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(198, t0);
        osc.frequency.exponentialRampToValueAtTime(128, t0 + 0.42);
        gain.gain.setValueAtTime(0.065 * seVol, t0);
        gain.gain.exponentialRampToValueAtTime(0.0015, t0 + 0.52);
        osc.start(t0);
        osc.stop(t0 + 0.54);
      } catch (_) {}
    },

    /** 待機室・ステータス抽選のダイス演出（粗いカタカタ音） */
    startDiceRoll() {
      if (muted) return { stop() {} };
      const iv = setInterval(() => {
        synth({
          freq: 90 + Math.random() * 150,
          dur: 0.036,
          type: Math.random() > 0.45 ? "square" : "triangle",
          vol: 0.14,
          ramp: true,
        });
      }, 56);
      return {
        stop: () => clearInterval(iv),
      };
    },

    /** 各ゲージ確定時の短い「ピッ」 */
    playDiceTick() {
      if (muted) return;
      synth({ freq: 1047, dur: 0.052, type: "square", vol: 0.2 });
    },

    /** 出目5（目盛りMAX）時の軽い強調音 */
    playDiceMaxSpark() {
      if (muted) return;
      arpeggio([784, 1175, 1568], 0.042, 0.09, "square");
    },

    playWin(tier = "small") {
      const key = tier === "jackpot" ? "jackpot" : "win";
      if (playFile(key)) return;
      const freqMap = {
        small: [523, 659],
        atari: [523, 659, 784],
        mid: [523, 659, 784, 1047],
        big: [523, 659, 784, 1047, 1319],
        jackpot: [523, 659, 784, 1047, 1319, 1568, 2093],
      };
      arpeggio(freqMap[tier] ?? freqMap.small, 0.065, 0.14);
    },

    stopWarHorn() {
      pauseWarHorn();
    },

    tryPlayWarHornIfLoaded() {
      if (muted) return false;
      const a = cache.war_horn;
      if (!a) return false;
      try {
        stopSpinInternal();
        a.volume = seVol;
        a.currentTime = 0;
        void a.play();
      } catch (_) {
        return false;
      }
      return true;
    },

    stopFinalBattleAmbient() {
      stopFinalDroneHard();
      pauseWarHorn();
    },

    startFinalBattleAmbient() {
      if (muted) return;
      stopSpinInternal();
      if (finalDrone || playFile("final_battle", true)) return;
      try {
        const ac = getCtx();
        const osc = ac.createOscillator();
        const osc2 = ac.createOscillator();
        const gain = ac.createGain();
        osc.type = "sine";
        osc2.type = "sine";
        osc.frequency.value = 52;
        osc2.frequency.value = 78;
        osc.connect(gain);
        osc2.connect(gain);
        gain.connect(ac.destination);
        gain.gain.value = 0.055 * seVol;
        osc.start();
        osc2.start();
        finalDrone = { type: "synth", osc, osc2, gain, ac };
      } catch (_) {}
    },
  };
}
