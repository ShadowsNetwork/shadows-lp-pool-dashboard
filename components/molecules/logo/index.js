import Link from 'next/link'

export default function Logo(props) {
  return (
    <Link href="/">
      <a href="" {...props}>
        <img src="/images/logo.svg" />
      </a>
    </Link>
  )
}
