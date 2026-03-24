"use client";

import {useJobOffersStore} from '@/store/jobOffers.store';
import JobCard from "@/components/JobCard";
import Link from "next/link";

export default function Pins() {
    const jobOffers = useJobOffersStore((state) => state.jobOffers);

    return (
        <div className="profil-page">
            <div className="profil-header">
                <h1 className="profil-title">Bienvenue</h1>
            </div>

            <section className="profil-section">
                <h2 className="profil-section__title">Offres enregistrées</h2>

                {jobOffers.length > 0 ? (
                    <div className="job-grid">
                        {jobOffers.map((job) => (
                            <JobCard key={job.id} job={job}/>
                        ))}
                    </div>
                ) : (
                    <div className="profil-empty">
                        <p>Aucune offre enregistrée pour le moment.</p>
                        <Link href="/offers" className="btn-primary" style={{display: "inline-block", marginTop: 12}}>
                            Parcourir les offres
                        </Link>
                    </div>
                )}
            </section>
        </div>
    );
}