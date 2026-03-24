"use client";
import Link from "next/link";
import { asDate } from "@prismicio/client";
import {JobOfferDocument} from '@/prismicio-types'
import {useJobOffersStore} from '@/store/jobOffers.store'

export default function JobCard({ job }: { job: JobOfferDocument }) {
    const title = job.data.title;
    const date = job.data.date ? asDate(job.data.date) : null;
    const technologies = job.data.technologies ?? [];
    const jobOffers = useJobOffersStore((state) => state.jobOffers);
    const addJobOffer = useJobOffersStore((state) => state.addJobOffer);
    const removeJobOffer = useJobOffersStore((state) => state.removeJobOffer);

    const formattedDate = date
        ? date.toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        })
        : "";

    return (
        <Link href={`/offers/${job.uid}`} className="job-card">
            <div className="job-card__header">
                <h3 className="job-card__title">{title}</h3>
                <div>
                    {jobOffers.includes(job) ? (
                        <span className="material-symbols-outlined cursor-pointer"
                              onClick={(e) => {
                                  e.preventDefault();
                                  removeJobOffer(job);
                              }}>
                                bookmark_star
                            </span>
                    ) : (
                            <span className="material-symbols-outlined cursor-pointer"
                                  onClick={(e) => {
                                      e.preventDefault();
                                      addJobOffer(job);
                                  }}>
                                bookmark
                            </span>
                    )}
                </div>
            </div>

            {formattedDate && (
                <div className="job-card__date">
                    <span className="material-symbols-outlined">
                        date_range
                    </span>
                    <span>{formattedDate}</span>
                </div>
            )}

            {technologies.length > 0 && (
                <div className="job-card__technologies">
                    <span className="material-symbols-outlined">
                        code
                    </span>
                    <span>
            {technologies
                .map((t) => t.technology)
                .filter(Boolean)
                .join(", ")}
          </span>
                </div>
            )}

            <p className="job-card__excerpt">
                {job.data.description &&
                    Array.isArray(job.data.description) &&
                    job.data.description
                        .filter((block) => block.type === "paragraph")
                        .slice(0, 1)
                        .map((block) => ("text" in block ? block.text : ""))
                        .join("")
                        .slice(0, 120)}
                ...
            </p>
        </Link>
    );
}