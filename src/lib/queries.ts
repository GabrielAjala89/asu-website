/**
 * GROQ queries — all Sanity data fetching lives here.
 * Import the query constant + call sanityFetch(QUERY) from any page.
 */

// ─── Shared fragments ────────────────────────────────────────────────────────

const imageFields = `
  asset->{url, metadata{lqip, dimensions}},
  alt,
  caption,
  hotspot,
  crop
`;

const authorFields = `
  name,
  slug,
  role,
  organisation,
  photo{${imageFields}},
  bio,
  linkedin
`;

const topicFields = `title, slug`;

// ─── Articles ─────────────────────────────────────────────────────────────────

export const ALL_ARTICLES_QUERY = `
  *[_type == "article"] | order(publishedAt desc) {
    _id, title, slug, publishedAt, readTime, excerpt, featured, tierRequired,
    heroImage{${imageFields}},
    author->{${authorFields}},
    topics[]->{${topicFields}}
  }
`;

export const FEATURED_ARTICLES_QUERY = `
  *[_type == "article" && featured == true] | order(publishedAt desc)[0...6] {
    _id, title, slug, publishedAt, readTime, excerpt, tierRequired,
    heroImage{${imageFields}},
    topics[]->{${topicFields}}
  }
`;

export const ARTICLE_BY_SLUG_QUERY = `
  *[_type == "article" && slug.current == $slug][0] {
    _id, title, slug, publishedAt, readTime, excerpt, body, tierRequired, seoTitle, seoDescription,
    heroImage{${imageFields}},
    author->{${authorFields}},
    topics[]->{${topicFields}}
  }
`;

export const LATEST_ARTICLES_QUERY = `
  *[_type == "article"] | order(publishedAt desc)[0...$limit] {
    _id, title, slug, publishedAt, readTime, excerpt, tierRequired,
    heroImage{${imageFields}},
    topics[]->{${topicFields}}
  }
`;

// ─── Videos ───────────────────────────────────────────────────────────────────

export const ALL_VIDEOS_QUERY = `
  *[_type == "video"] | order(publishedAt desc) {
    _id, title, slug, publishedAt, duration, description, youtubeUrl, featured, tierRequired,
    thumbnail{${imageFields}},
    topics[]->{${topicFields}}
  }
`;

export const LATEST_VIDEOS_QUERY = `
  *[_type == "video"] | order(publishedAt desc)[0...$limit] {
    _id, title, slug, publishedAt, duration, youtubeUrl, tierRequired,
    thumbnail{${imageFields}},
    topics[]->{${topicFields}}
  }
`;

// ─── Reports ──────────────────────────────────────────────────────────────────

export const ALL_REPORTS_QUERY = `
  *[_type == "report"] | order(publishedAt desc) {
    _id, title, slug, subtitle, publishedAt, description, features, pricePaid, priceMember, stripePaymentLink, featured,
    coverImage{${imageFields}},
    topics[]->{${topicFields}}
  }
`;

export const FEATURED_REPORTS_QUERY = `
  *[_type == "report" && featured == true] | order(publishedAt desc)[0...4] {
    _id, title, slug, subtitle, pricePaid, priceMember, stripePaymentLink, features,
    coverImage{${imageFields}}
  }
`;

export const REPORT_BY_SLUG_QUERY = `
  *[_type == "report" && slug.current == $slug][0] {
    _id, title, slug, subtitle, publishedAt, description, features, pricePaid, priceMember, stripePaymentLink,
    coverImage{${imageFields}},
    "pdfFreeUrl": pdfFree.asset->url,
    "pdfFullUrl": pdfFull.asset->url,
    topics[]->{${topicFields}}
  }
`;

// ─── Trackers ─────────────────────────────────────────────────────────────────

export const ALL_TRACKERS_QUERY = `
  *[_type == "tracker"] | order(publishedAt desc) {
    _id, title, slug, subtitle, publishedAt, description, features, pricePaid, priceMember, stripePaymentLink, featured,
    airtableEmbedFull, airtableEmbedSample,
    coverImage{${imageFields}}
  }
`;

export const TRACKER_BY_SLUG_QUERY = `
  *[_type == "tracker" && slug.current == $slug][0] {
    _id, title, slug, subtitle, publishedAt, description, features, pricePaid, priceMember, stripePaymentLink,
    airtableEmbedFull, airtableEmbedSample,
    coverImage{${imageFields}}
  }
`;

// ─── Case Studies ─────────────────────────────────────────────────────────────

export const ALL_CASE_STUDIES_QUERY = `
  *[_type == "caseStudy"] | order(displayOrder asc) {
    _id, title, slug, clientName, summary, outcomes,
    "documentUrl": document.asset->url,
    clientLogo{${imageFields}},
    heroImage{${imageFields}}
  }
`;

// ─── Testimonials ─────────────────────────────────────────────────────────────

export const ALL_TESTIMONIALS_QUERY = `
  *[_type == "testimonial"] | order(displayOrder asc) {
    _id, name, role, organisation, quote,
    photo{${imageFields}},
    organisationLogo{${imageFields}}
  }
`;

// ─── Trusted By ───────────────────────────────────────────────────────────────

export const ALL_TRUSTED_BY_QUERY = `
  *[_type == "trustedBy"] | order(displayOrder asc) {
    _id, name, url,
    logo{${imageFields}}
  }
`;

// ─── Site Settings ────────────────────────────────────────────────────────────

export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    siteTitle, siteTagline, siteDescription,
    footerTagline, newsletterHeading, newsletterSubtext,
    calendlyUrl,
    socialTwitter, socialLinkedin, socialInstagram, socialYoutube, socialSpotify,
    logo{${imageFields}},
    logoWhite{${imageFields}}
  }
`;

// ─── Knowledge Hub combined (articles + videos + reports + trackers) ──────────

export const KNOWLEDGE_HUB_QUERY = `
{
  "articles": *[_type == "article"] | order(publishedAt desc)[0...20] {
    _id, _type, title, slug, publishedAt, readTime, excerpt, tierRequired,
    heroImage{${imageFields}},
    topics[]->{${topicFields}}
  },
  "videos": *[_type == "video"] | order(publishedAt desc)[0...20] {
    _id, _type, title, slug, publishedAt, duration, youtubeUrl, tierRequired,
    thumbnail{${imageFields}},
    topics[]->{${topicFields}}
  },
  "reports": *[_type == "report"] | order(publishedAt desc)[0...20] {
    _id, _type, title, slug, subtitle, pricePaid, tierRequired,
    coverImage{${imageFields}}
  },
  "trackers": *[_type == "tracker"] | order(publishedAt desc)[0...20] {
    _id, _type, title, slug, subtitle, pricePaid, tierRequired,
    coverImage{${imageFields}}
  }
}
`;
