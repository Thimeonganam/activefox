import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  path?: string;
}

export function SEO({ 
  title, 
  description, 
  image = 'https://activefox.vn/og-image.jpg',
  path = ''
}: SEOProps) {
  const siteUrl = 'https://activefox.vn';
  const fullUrl = `${siteUrl}${path}`;

  return (
    <Helmet>
      {/* Prime Meta Info */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
}
