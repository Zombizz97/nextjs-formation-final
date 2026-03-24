"use client";
import Link from "next/link";
import { asDate } from "@prismicio/client";
import {JobOfferDocument} from '@/prismicio-types'

export default function JobCard({ job }: { job: JobOfferDocument }) {
    const title = job.data.title;
    const date = job.data.date ? asDate(job.data.date) : null;
    const technologies = job.data.technologies ?? [];

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
                <button
                    className="job-card__bookmark"
                    aria-label="Sauvegarder l'offre"
                    onClick={(e) => e.preventDefault()}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                    </svg>
                </button>
            </div>

            {formattedDate && (
                <div className="job-card__date">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span>{formattedDate}</span>
                </div>
            )}

            {technologies.length > 0 && (
                <div className="job-card__technologies">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="16 18 22 12 16 6" />
                        <polyline points="8 6 2 12 8 18" />
                    </svg>
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