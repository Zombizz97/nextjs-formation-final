"use client";

import {useJobOffersStore} from '@/store/jobOffers.store';
import JobCard from "@/components/JobCard";
import Link from "next/link";
import {useApplicationStore} from '@/store/application.store'
import {PrismicRichText} from '@prismicio/react'
import {asDate} from '@prismicio/client'

export default function Pins() {
    const jobOffers = useJobOffersStore((state) => state.jobOffers);
    const applications = useApplicationStore((state) => state.applications);

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

            <section className="profil-section">
                <h2 className="profil-section__title">Historique des candidatures</h2>

                {applications.length > 0 ? (
                    <div className="application-history">
                        {applications.map((app, i) => (
                            <div key={i} className="application-history__item">
                                <div className="application-history__meta">
                                    <span className="material-symbols-outlined">
                                        date_range
                                    </span>
                                    <span>
                                        {app.data.date ? asDate(app.data.date).toLocaleDateString("fr-FR", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                        }) : ""}
                                    </span>
                                </div>

                                <Link href={`/offers/${app.uid}`} className="application-history__title">
                                    {app.data.title}
                                </Link>

                                {app.data.technologies.length > 0 && (
                                    <div className="application-history__techs">
                                        <span className="material-symbols-outlined">
                                            code
                                        </span>
                                        <span>{app.data.technologies
                                            .map((t) => t.technology).filter(Boolean).join(", ")}</span>
                                    </div>
                                )}

                                <div className="application-history__message">
                                    <PrismicRichText field={app.data.description} />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="profil-empty">
                        <p>Vous n&apos;avez pas encore postulé à une offre.</p>
                    </div>
                )}
            </section>
        </div>
    );
}