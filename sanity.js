import {createClient} from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'



const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION // "2023-05-03"

export const config = {
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
}

export const sanityClient = createClient(config);
export const urlFor = (source) => imageUrlBuilder(config).image(source)

  