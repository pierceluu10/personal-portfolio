interface Props { size?: string | number }

export function NextjsIcon({ size = 18 }: Props) {
  const s = typeof size === "string" ? parseInt(size, 10) : size;
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M11.572 0c.946 0 1.791.114 2.507.309v3.236a5.61 5.61 0 0 0-1.368-.168c-2.946 0-4.998 2.472-4.998 5.82 0 2.577 1.198 4.42 3.138 5.295-1.065.21-1.896.966-1.896 1.89v2.835H4.22V6.375c0-1.89.946-3.558 2.4-4.581C8.002 1.185 9.626 0 11.572 0zm8.397 5.25v2.835h-2.835v8.505h-2.835V8.085h-2.835V5.25h8.505z" />
    </svg>
  );
}
