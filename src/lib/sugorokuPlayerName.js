/** すごろく表示用プレイヤー名（Name#1234 → Name。盤面では # 以降は出さない） */
export function sugorokuPlayerName(name) {
  if (typeof name !== "string" || !name) return "";
  const hashIdx = name.indexOf("#");
  if (hashIdx < 0) return name;
  const base = name.slice(0, hashIdx).trimEnd();
  return base || name.slice(0, hashIdx);
}
