import { CurrentJob } from "@/models/CurrentJob";
import { fetchWithKey, postWithKey } from "./withKeys";

export const fetchCurrentJob = async () => await fetchWithKey<CurrentJob>("/api/job");

export const startCurrentJob = async () =>
  await postWithKey("/api/job", {
    command: "start",
  });

export const cancelCurrentJob = async () =>
  await postWithKey("/api/job", {
    command: "cancel",
  });

export const pauseCurrentJob = async () =>
  await postWithKey("/api/job", {
    command: "pause",
    action: "pause",
  });

export const resumeCurrentJob = async () =>
  await postWithKey("/api/job", {
    command: "pause",
    action: "resume",
  });
