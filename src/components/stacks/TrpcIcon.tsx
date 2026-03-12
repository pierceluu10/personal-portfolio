interface Props { size?: string | number }

export function TrpcIcon({ size = 18 }: Props) {
  const s = typeof size === "string" ? parseInt(size, 10) : size;
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l6.9 3.45L12 11.09 5.1 7.63 12 4.18zM4 8.82l7 3.5v7.36l-7-3.5V8.82zm9 10.86v-7.36l7-3.5v7.36l-7 3.5z" />
    </svg>
  );
}
