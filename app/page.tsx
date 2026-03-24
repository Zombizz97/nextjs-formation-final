import Link from "next/link";
import { createClient } from "@/prismicio";
import JobCard from "@/components/JobCard";
import Image from 'next/image'

export const revalidate = 60;

export default async function HomePage() {
    const client = createClient();

    const jobs = await client.getAllByType("job_offer", {
        orderings: [{ field: "my.job_offer.date", direction: "desc" }],
        limit: 6,
    });

    return (
        <>
            <section className="hero">
                <Image src="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1400&q=80"
                       fill
                       style={{ objectFit: "cover", objectPosition: "center 40%" }}
                       priority
                       alt="Bureau développeur" />
            </section>

            <div className="section-heading">
                <h2>Nos dernières opportunités</h2>
            </div>

            {jobs.length > 0 ? (
                <div className="job-grid">
                    {jobs.map((job) => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <p>Aucune offre disponible pour le moment. Revenez bientôt !</p>
                </div>
            )}

            <div className="cta-wrap">
                <Link href="/offers" className="btn-primary">
                    Voir toutes les offres
                </Link>
            </div>
        </>
    );
}