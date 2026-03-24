"use client";
import Link from "next/link";
import {useJobOffersStore} from '@/store/jobOffers.store'

export default function Navbar() {
    const jobOffers = useJobOffersStore((state) => state.jobOffers);
    return (
        <nav className="navbar">
            <div className="navbar__container">
                <Link href="/" className="navbar__logo">
                    <span className="material-symbols-outlined">
                        logo_dev
                    </span>
                    <span>DEV</span>
                </Link>

                <Link href="/pins" className="navbar__account">
                        {jobOffers.length}
                        <span className="material-symbols-outlined cursor-pointer">
                            bookmark_star
                        </span>
                    </Link>
            </div>
        </nav>
    );
}