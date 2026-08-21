import "@/lib/domain";

declare module "@/lib/domain" {
  interface CortexDescriptor {
    [key: string]: string | undefined;
  }
}
