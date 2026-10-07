import Link from 'next/link'

export const PER_PAGE = 5

export function paginate<T>(items: T[], page: number) {
  const total = Math.max(1, Math.ceil(items.length / PER_PAGE))
  const curr = Math.min(Math.max(Math.trunc(page) || 1, 1), total)
  return {
    curr,
    total,
    items: items.slice((curr - 1) * PER_PAGE, curr * PER_PAGE),
  }
}

export const totalPages = (count: number) =>
  Math.max(1, Math.ceil(count / PER_PAGE))

const pageHref = (n: number) =>
  n === 1 ? '/posts/all' : `/posts/all/page/${n}`

function pageNumbers(curr: number, total: number) {
  const set = new Set([1, total, curr - 1, curr, curr + 1])
  return [...set].filter(p => p >= 1 && p <= total).sort((a, b) => a - b)
}

const linkCls =
  'rounded-md border border-color-4 px-3 py-1.5 text-sm text-color-2 transition-colors hover:border-brand hover:text-brand'
const activeCls =
  'rounded-md bg-brand px-3 py-1.5 text-sm font-semibold text-white'
const disabledCls =
  'rounded-md border border-color-4 px-3 py-1.5 text-sm text-color-4 opacity-50'

export function Pager({ curr, total }: { curr: number; total: number }) {
  if (total <= 1) return null
  const nums = pageNumbers(curr, total)
  const items: React.ReactNode[] = []

  items.push(
    curr > 1 ? (
      <Link key='prev' href={pageHref(curr - 1)} className={linkCls}>
        Previous
      </Link>
    ) : (
      <span key='prev' className={disabledCls}>
        Previous
      </span>
    ),
  )

  let prev = 0
  for (const n of nums) {
    if (n - prev > 1) {
      items.push(
        <span key={`gap-${n}`} className='px-1 text-sm text-color-3'>
          …
        </span>,
      )
    }
    items.push(
      n === curr ? (
        <span key={n} aria-current='page' className={activeCls}>
          {n}
        </span>
      ) : (
        <Link key={n} href={pageHref(n)} className={linkCls}>
          {n}
        </Link>
      ),
    )
    prev = n
  }

  items.push(
    curr < total ? (
      <Link key='next' href={pageHref(curr + 1)} className={linkCls}>
        Next
      </Link>
    ) : (
      <span key='next' className={disabledCls}>
        Next
      </span>
    ),
  )

  return (
    <nav
      aria-label='Pagination'
      className='flex items-center justify-center gap-2 py-8'
    >
      {items}
    </nav>
  )
}
