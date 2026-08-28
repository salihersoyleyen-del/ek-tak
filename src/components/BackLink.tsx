import Link from "next/link";

export default function BackLink({
  href = "/",
  label = "Ana sayfa",
}: {
  href?: string;
  label?: string;
}) {
  return (
    <Link
      href={href}
      className="mb-4 inline-block text-sm text-blue-600 hover:underline"
    >
      ← {label}
    </Link>
  );
}
