import Link from "next/link";
import { createClient } from "@/prismicio";
import Image from 'next/image'
import JobBoard from "@/components/JobBoard";

export const revalidate = 60;

export default async function HomePage() {
    const client = createClient();

    const jobs = await client.getAllByType("job_offer", {
        orderings: [{ field: "my.job_offer.date", direction: "desc" }],
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

            <JobBoard jobs={jobs} />

            <div className="cta-wrap">
                <Link href="/offers" className="btn-primary">
                    Voir toutes les offres
                </Link>
            </div>
        </>
    );
}