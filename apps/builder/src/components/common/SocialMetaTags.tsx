import React from 'react';
import Head from 'next/head';

export const SocialMetaTags = ({
  title = 'Ignai-bot - Plataforma inteligente de chatbot',
  description = 'Plataforma inteligente de chatbot da Ignai - Powered by: Diamondbigger.',
  currentUrl,
  imagePreviewUrl = 'https://home.typebot.io/images/preview.png',
}: {
  title?: string
  description?: string
  currentUrl: string
  imagePreviewUrl?: string
}) => (
  <Head>
    <title>{title}</title>
    <meta name="title" content={title} />
    <meta property="og:title" content={title} />
    <meta property="twitter:title" content={title} />

    <meta property="twitter:url" content={currentUrl} />
    <meta property="og:url" content={currentUrl} />

    <meta name="description" content={description} />
    <meta property="twitter:description" content={description} />
    <meta property="og:description" content={description} />

    <meta property="og:image" content={imagePreviewUrl} />
    <meta property="twitter:image" content={imagePreviewUrl} />

    <meta property="og:type" content="website" />
    <meta property="twitter:card" content="summary_large_image" />

    <meta property="fb:app_id" content="2919783058077552" />
  </Head>
);