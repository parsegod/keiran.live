"use client";

export function GridBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-zinc-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(161,161,170,0.3),rgba(24,24,27,0))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_600px,rgba(161,161,170,0.1),rgba(24,24,27,0))]" />
      <div className="absolute inset-0 bg-grid bg-[size:40px_40px] [mask-image:linear-gradient(to_bottom,white,transparent)] opacity-40" />
    </div>
  );
}
