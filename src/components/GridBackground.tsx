"use client";

export function GridBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-zinc-950" />
      <div className="absolute inset-0 bg-grid bg-[size:50px_50px] opacity-25" />
    </div>
  );
}
