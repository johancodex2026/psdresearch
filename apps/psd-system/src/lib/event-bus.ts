import { EventEmitter } from "node:events";

export interface SystemStreamEvent {
  type: "vital-signal" | "alert" | "activity";
  coreId: string;
  data: unknown;
  occurredAt: string;
}

declare global {
  var __psdEventBus: EventEmitter | undefined;
}

export function getEventBus(): EventEmitter {
  if (!globalThis.__psdEventBus) {
    globalThis.__psdEventBus = new EventEmitter();
    globalThis.__psdEventBus.setMaxListeners(250);
  }
  return globalThis.__psdEventBus;
}

export function publishSystemEvent(event: SystemStreamEvent): void {
  const bus = getEventBus();
  bus.emit(`core:${event.coreId}`, event);
  bus.emit("system", event);
}
