import Link from 'next/link';
import clsx from 'clsx';
import { formatDate } from '../lib/formatDate';

// ChevronRightIcon Component
const ChevronRightIcon = ({ className, ...props }) => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className} {...props}>
    <path
      d="M6.75 5.75 9.25 8l-2.5 2.25"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Card Component
export const Card = ({ as: Component = 'div', className, children }) => (
  <Component className={clsx('group relative flex flex-col items-start', className)}>
    {children}
  </Component>
);

// CardLink Component
export const CardLink = ({ children, ...props }) => (
  <>
    <div className="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl" />
    <Link {...props}>
      <span className="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl" />
      <span className="relative z-10">{children}</span>
    </Link>
  </>
);

// CardTitle Component
export const CardTitle = ({ as: Component = 'h2', href, children }) => (
  <Component className="text-base font-semibold tracking-tight text-zinc-800">
    {href ? <CardLink href={href}>{children}</CardLink> : children}
  </Component>
);

// CardDescription Component
export const CardDescription = ({ children }) => (
  <p className="relative z-10 mt-2 text-sm text-zinc-600">
    {children}
  </p>
);

// CardCta Component
export const CardCta = ({ children }) => (
  <div
    aria-hidden="true"
    className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500"
  >
    {children}
    <ChevronRightIcon className="ml-1 h-4 w-4 stroke-current" />
  </div>
);

// CardEyebrow Component
export const CardEyebrow = ({
  as: Component = 'p',
  decorate = false,
  className,
  children,
  dateTime,
  ...props
}) => {
  const content = dateTime ? formatDate(dateTime) : children;

  return (
    <Component
      className={clsx(
        'relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400',
        decorate && 'pl-3.5',
        className
      )}
      {...props}
    >
      {decorate && (
        <span className="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
          <span className="h-4 w-0.5 rounded-full bg-zinc-200" />
        </span>
      )}
      {content}
    </Component>
  );
};
