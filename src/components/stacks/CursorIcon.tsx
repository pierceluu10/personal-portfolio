interface Props { size?: string | number }

export function CursorIcon({ size = 18 }: Props) {
  const s = typeof size === "string" ? parseInt(size, 10) : size;
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13.64 21.97c-.5.15-1-.17-1.4-.6l-2.5-3.5-2 2.5c-.24.3-.58.47-.95.47-.53 0-.97-.34-1.13-.84L4.5 6.5c-.15-.5-.02-1.04.35-1.41l1-1c.37-.37.91-.5 1.41-.35l11 3.5c.5.15.84.6.84 1.13 0 .37-.17.71-.47.95l-2.5 2 3.5 2.5c.43.4.75.9.6 1.4-.15.5-.6.84-1.13.84l-4.5-.5-.5 4.5c-.1.53-.53.97-1.06.97z" />
    </svg>
  );
}
