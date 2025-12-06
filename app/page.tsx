import Link from "next/link";

export default function Home() {
    return(
        <>
            <Link href="/settings"> 
                <button className="border rounded text-black">Settings</button>
            </Link>
        </>
    )
}