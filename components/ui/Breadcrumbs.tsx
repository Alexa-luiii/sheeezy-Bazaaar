import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center space-x-2 text-xs uppercase tracking-widest font-bold">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center space-x-2">
          {idx > 0 && <ChevronRight size={12} className="text-text/20" />}

          {item.href && !item.active ? (
            <Link
              href={item.href}
              className="text-text/40 hover:text-accent transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className={cn(
              "select-none",
              item.active ? "text-accent" : "text-text/40"
            )}>
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
