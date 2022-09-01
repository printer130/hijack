
export function Anchor ({ children, src }) {
    return <a src={src} rel="noreferrer" target='_blank'>
        {children}
    </a>
}