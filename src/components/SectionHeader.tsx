interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function SectionHeader({ eyebrow, title, description, action }: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between gap-4 border-b border-ink-200 pb-4">
      <div>
        {eyebrow && (
          <p className="text-eyebrow">{eyebrow}</p>
        )}
        <h2 className="mt-1 font-serif text-2xl font-medium text-ink-950">{title}</h2>
        {description && (
          <p className="mt-1.5 text-sm text-ink-500">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
