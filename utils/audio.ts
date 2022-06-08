export function playSound(sound: string) {
  const audio = new Audio(`./${sound}.mp3`);
  audio.play();

  // const audio = document.createElement("audio");
  // audio.src = `./${sound}.mp3`;
  // audio.play();
}
