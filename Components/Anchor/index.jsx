import Link from 'next/link'

export function Anchor ({ children, src, cls = '' }) {
  return (
    <Link href={src}>
      <a className={cls} rel='noreferrer' target='_blank'>
        {children}
      </a>
    </Link>
  )
}
