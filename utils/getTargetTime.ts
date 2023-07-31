export const getTargetTime = (seconds: number) =>
  new Date(Date.now() + seconds * 1_000).toLocaleTimeString(navigator.language ?? "en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
