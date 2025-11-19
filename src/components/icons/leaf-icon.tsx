
export function LeafIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22c-2-2-4-5-4-9 0-4.42 3.58-8 8-8 2 0 4 1 5 3-2 3-5 5-8 7z" />
      <path d="M12 10c-2 2-4 4-4 6" />
      <path d="M12 10c2 2 4 4 4 6" />
      <path d="M12 10c0-2-1-4-3-5" />
    </svg>
  );
}
