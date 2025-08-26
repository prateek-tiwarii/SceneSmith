import Link from "next/link"

const Footer = () => {
    return (
        <footer className="bg-[#0A0A0A] border-t border-[#1F1F1F] text-[#C7C8CC] py-10 px-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
                <div className="text-center md:text-left">
                    © {new Date().getFullYear()} Scene-Smith. All rights reserved.
                </div>
                <div className="flex gap-6 text-[#A5A5A5]">
                    <Link href="/" className="hover:text-white transition-colors">Privacy</Link>
                    <Link href="/" className="hover:text-white transition-colors">Terms</Link>
                    <Link href="/" className="hover:text-white transition-colors">Contact</Link>
                </div>
            </div>
        </footer>

    )
}

export default Footer