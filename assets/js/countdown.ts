const pad = (value: number): string => String(value).padStart(2, "0");

for (const element of document.querySelectorAll<HTMLElement>("[data-countdown]")) {
  const ends = new Date(element.dataset["countdown"] ?? "").getTime();
  let timer = 0;
  const tick = (): void => {
    const left = Math.max(0, ends - Date.now());
    const days = Math.floor(left / 86_400_000);
    const hours = Math.floor(left / 3_600_000) % 24;
    const minutes = Math.floor(left / 60_000) % 60;
    const seconds = Math.floor(left / 1000) % 60;
    element.textContent = `${String(days)}d ${pad(hours)}:${pad(minutes)}:${pad(seconds)} left`;
    if (left === 0) {
      window.clearInterval(timer);
    }
  };
  timer = window.setInterval(tick, 1000);
  tick();
}
