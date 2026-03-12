interface Props { size?: string | number }

export function PrismaIcon({ size = 18 }: Props) {
  const s = typeof size === "string" ? parseInt(size, 10) : size;
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M21.806 18.194L13.003 2.38a1.125 1.125 0 0 0-1.986 0L2.194 18.194a1.126 1.126 0 0 0 .405 1.54l9.013 5.26a1.14 1.14 0 0 0 1.17 0l9.013-5.26a1.126 1.126 0 0 0 .405-1.54zM12 19.854l-7.578-4.42L12 4.587l7.578 10.847L12 19.854z" />
    </svg>
  );
}
