
export function Anchor ({ children, src, cls = "" }) {
    return <a className={cls} src={src} rel="noreferrer" target='_blank'>
        {children}
    </a>
}