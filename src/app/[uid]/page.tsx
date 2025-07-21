import { Metadata } from "next";
import { notFound } from "next/navigation";

import { SliceZone } from "@prismicio/client";
import * as prismic from "@prismicio/client";

import { createClient } from "../../prismicio";
import { components } from "@/slices";

type Params = {uid: string};

/**
 * This page renders a  Prismic Document dynamically based on the `uid` in the URL.
 */

export async function generateMetadata({
    params,
}: {
    params: Params;
}): Promise<Metadata> {
    const client = createClient();
    const page = await client
        .getByUID("page", params.uid)
        .catch(() => notFound());

        return {
            title: prismic.asText(page.data.title),
            description: page.data.meta_description,
            openGraph: {
                title: page.data.meta_title || undefined,
                images: [
                    {
                        url: page.data.meta_image.url || "",
                    }
                ]

            }
        }
}