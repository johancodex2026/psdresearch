import { getEventBus, type SystemStreamEvent } from "@/lib/event-bus";
import { isNextResponse, requireApiActor, apiError } from "@/lib/http";
import { getRepository } from "@/lib/repository";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const encoder = new TextEncoder();

function frame(event: string, data: unknown): Uint8Array {
  return encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
}

export async function GET(request: Request, context: { params: Promise<{ coreId: string }> }) {
  const actor = await requireApiActor();
  if (isNextResponse(actor)) return actor;
  const { coreId } = await context.params;
  const repository = await getRepository();
  if (!(await repository.getProtoBeing(coreId))) return apiError(404, "PSD_NOT_FOUND", "Proto-ser não encontrado.");
  const bus = getEventBus();
  const channel = `core:${coreId}`;
  let cleanup = () => {};
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(frame("activity", { type: "stream-open", coreId, actor: actor.email, occurredAt: new Date().toISOString() }));
      const listener = (event: SystemStreamEvent) => controller.enqueue(frame(event.type, event.data));
      bus.on(channel, listener);
      const heartbeat = setInterval(() => controller.enqueue(frame("heartbeat", { coreId, occurredAt: new Date().toISOString() })), 20_000);
      cleanup = () => {
        clearInterval(heartbeat);
        bus.off(channel, listener);
        try { controller.close(); } catch {}
      };
      request.signal.addEventListener("abort", cleanup, { once: true });
    },
    cancel() { cleanup(); },
  });
  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
