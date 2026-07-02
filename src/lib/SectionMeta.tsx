import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

type Props = {
  title: string;
  description: string;
  url?: string;
  image?: string;
  keywords?: string;
};

export default function SectionMeta({ title, description, url, image, keywords }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { margin: '-40%' });

  const canonical = url || 'https://blessed-rico.netlify.app/';

  return (
    <>
      <span ref={ref} className="sr-only" />
      {inView && (
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          {keywords && <meta name="keywords" content={keywords} />}
          <link rel="canonical" href={canonical} />

          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:url" content={canonical} />
          <meta property="og:type" content="website" />
          {image && <meta property="og:image" content={image} />}

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          {image && <meta name="twitter:image" content={image} />}
        </Helmet>
      )}
    </>
  );
}
