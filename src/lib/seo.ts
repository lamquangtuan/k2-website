import type { Metadata } from "next";
import type { BlogPost } from "@/lib/blog-data";
import { getRoomMedia, siteMedia } from "@/lib/media-data";
import { homeHighlights, roomTypes, type RoomType } from "@/lib/k2-content";
import { siteConfig } from "@/lib/site-config";

export function buildRoomStructuredData(room: RoomType) {
  const baseUrl = siteConfig.siteUrl;
  const roomUrl = `${baseUrl}/rooms/${room.slug}`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Trang chủ",
          item: baseUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Phòng",
          item: `${baseUrl}/rooms`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: room.name.vi,
          item: roomUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "HotelRoom",
      name: room.name.vi,
      description: room.summary.vi,
      url: roomUrl,
      image: [`${baseUrl}${getRoomMedia(room.slug).ogImage.src}`],
      bed: room.bed.vi,
      occupancy: {
        "@type": "QuantitativeValue",
        maxValue: room.guestCount,
      },
      amenityFeature: room.amenityGroups.flatMap((group) =>
        group.items.map((item) => ({
          "@type": "LocationFeatureSpecification",
          name: item.vi,
          value: true,
        })),
      ),
      containedInPlace: {
        "@type": "LodgingBusiness",
        name: siteConfig.name,
        address: siteConfig.address,
        telephone: siteConfig.phoneDisplay,
      },
      offers: {
        "@type": "Offer",
        priceCurrency: "VND",
        price: room.numericPriceFrom,
        availability: "https://schema.org/InStock",
        url: `${baseUrl}/booking?room=${room.slug}`,
      },
    },
  ];
}

export function buildHomepageStructuredData() {
  const baseUrl = siteConfig.siteUrl;

  return [
    {
      "@context": "https://schema.org",
      "@type": ["Hotel", "LodgingBusiness"],
      "@id": `${baseUrl}/#lodging`,
      name: siteConfig.name,
      url: baseUrl,
      image: [`${baseUrl}${siteMedia.heroFrontAlt.src}`],
      description:
        "K2 Homestay tại trung tâm Ninh Kiều, Cần Thơ, có phòng đơn, phòng gia đình và dorm giường tầng.",
      telephone: siteConfig.phoneRaw,
      email: siteConfig.email,
      priceRange: "120000-500000 VND",
      areaServed: "Cần Thơ",
      address: {
        "@type": "PostalAddress",
        streetAddress: "60 Xô Viết Nghệ Tĩnh",
        addressLocality: "Ninh Kiều",
        addressRegion: "Cần Thơ",
        addressCountry: "VN",
      },
      amenityFeature: homeHighlights.map((item) => ({
        "@type": "LocationFeatureSpecification",
        name: item.title.vi,
        value: true,
      })),
      makesOffer: roomTypes.map((room) => ({
        "@type": "Offer",
        name: room.name.vi,
        priceCurrency: "VND",
        price: room.numericPriceFrom,
        availability: "https://schema.org/InStock",
        url: `${baseUrl}/rooms/${room.slug}`,
      })),
    },
  ];
}

export function buildBlogPostMetadata(post: BlogPost): Metadata {
  const pageUrl = `${siteConfig.siteUrl}/blog/${post.slug}`;

  return {
    title: post.seoTitle,
    description: post.seoDescription,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      type: "article",
      url: pageUrl,
      images: [
        {
          url: `${siteConfig.siteUrl}${post.image}`,
          width: 1200,
          height: 630,
          alt: post.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.seoDescription,
      images: [`${siteConfig.siteUrl}${post.image}`],
    },
  };
}
