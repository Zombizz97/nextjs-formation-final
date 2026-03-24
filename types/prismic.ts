import type {
    KeyTextField,
    DateField,
    RichTextField,
    TitleField,
    BooleanField,
    GroupField,
    AnyRegularField,
    PrismicDocument,
} from "@prismicio/client";

export interface JobOfferDocumentDataTechnologiesItem {
    technology: KeyTextField;
    [key: string]: AnyRegularField;
}

export interface JobOfferDocumentData {
    title: TitleField;
    date: DateField;
    technologies: GroupField<JobOfferDocumentDataTechnologiesItem>;
    description: RichTextField;
    is_featured: BooleanField;
    [key: string]: AnyRegularField | GroupField<JobOfferDocumentDataTechnologiesItem>; // ← index signature requis
}

export type JobOfferDocument = PrismicDocument<
    JobOfferDocumentData,
    "job_offer"
>;