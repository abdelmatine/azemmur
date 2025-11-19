
export function RefinedOliveLogo(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" role="img" aria-labelledby="title desc" {...props}>
            <title id="title">Stylized Olive Logo</title>
            <desc id="desc">A modern, stylized illustration of a single green olive with a stem and a leaf.</desc>
            <g transform="rotate(15 50 50)">
                <path d="M78,85 C97,63 95,30 75,18 C55,6 35,20 25,45 C15,70 59,107 78,85 Z" fill="#2F5249"/>
                <path d="M42,32 C45,42 43,53 36,58 C29,63 26,51 28,40 C30,29 39,22 42,32 Z" fill="#97B067" opacity="0.8"/>
                <path d="M68,23 C70,15 65,8 60,10 C55,12 56,21 61,28 L72,15" fill="none" stroke="#E3DE61" strokeWidth="6" strokeLinecap="round"/>
                <path d="M72,15 C85,20 90,35 85,45" fill="#437057"/>
            </g>
        </svg>
    )
}
