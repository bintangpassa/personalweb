import type { z } from 'astro/zod';
import MetaDefaultImage from '@/assets/images/bintang_passa.jpg';
import avatar from '@/assets/images/bintang_passa.jpg';
import type { seoSchemaWithoutImage } from '@/content.config';
import astroConfig from 'astro.config.mjs';

export type AuthorInfo = {
  name: string;
  avatar: any;
  headline: string;
  username?: string;
  location?: string;
  pronouns?: string;
}

export type Seo = z.infer<typeof seoSchemaWithoutImage> & {
  image?: any;
}

type DefaultConfigurationType = {
  baseUrl: string,
  author: AuthorInfo;
  seo: Seo;
}

export const DEFAULT_CONFIGURATION: DefaultConfigurationType = {
  baseUrl: astroConfig.site || 'https://bintangpassa.com',
  author: {
    avatar,
    name: 'Bintang Passa Ramadhan',
    headline: 'Software Engineering Manager | SaaS | ISO27001 Compliance | Cloud Service Certified',
    username: 'Engineering Manager at Versafleet',
    location: 'Jakarta - Indonesia',
    pronouns: 'He/Him',
  },
  seo: {
    title: 'Bintang Passa',
    description: 'Engineering Manager',
    type: 'website',
    image: MetaDefaultImage,
    twitter: {
      creator: '@bintangpassapersonalweb'
    },
    robots: 'noindex, nofollow',
  }
};