interface Props { size?: string | number }

export function ReactIcon({ size = 18 }: Props) {
  const s = typeof size === "string" ? parseInt(size, 10) : size;
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m0-5A1.5 1.5 0 0 0 10.5 12 1.5 1.5 0 0 0 12 13.5 1.5 1.5 0 0 0 13.5 12 1.5 1.5 0 0 0 12 10.5M10 2a2 2 0 0 1 2 2 2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2 2H8a2 2 0 0 1-2-2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h2m8 14a2 2 0 0 1 2 2 2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2 2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2M4 8a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1-2 2H6a2 2 0 0 1-2-2m14 0a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z" />
    </svg>
  );
}
