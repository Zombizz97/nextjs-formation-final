import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";

/**
 * The project's Prismic repository name.
 * Replace with your actual repository name found in your Prismic dashboard.
 */
export const repositoryName =
    process.env.NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME || "nextjs-formation-final";

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config - Configuration for the Prismic client.
 */
export const createClient = (config: prismicNext.CreateClientConfig = {}) => {
    const client = prismic.createClient(repositoryName, {
        fetchOptions:
            process.env.NODE_ENV === "production"
                ? { next: { tags: ["prismic"] }, cache: "force-cache" }
                : { next: { revalidate: 5 } },
        ...config,
    });

    prismicNext.enableAutoPreviews({ client, ...config });

    return client;
};