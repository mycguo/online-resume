import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function BackToProjects({
  className = "back-link",
  children = "All projects",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <Link href="/#projects" className={className}>
      <ArrowLeft size={15} />
      {children}
    </Link>
  );
}
