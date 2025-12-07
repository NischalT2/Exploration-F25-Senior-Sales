import Link from "next/link";

export default function Home() {
    return(
        <>
            <Link href="/sellupload"> 
                <button className="border rounded text-white">Sell</button>
            </Link>
        
        </>
    )
}