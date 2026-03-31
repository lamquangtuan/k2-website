import { getRoomMedia, siteMedia } from "@/lib/media-data";
import { homeHighlights, roomTypes } from "@/lib/k2-content";
import { pricingData } from "@/lib/pricing-data";
import { siteConfig } from "@/lib/site-config";

export function buildRoomStructuredData(room: (typeof roomTypes)[number]) {
  const baseUrl = siteConfig.siteUrl;
  const roomUrl = `${baseUrl}/rooms/${room.slug}`;
  return [{"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Trang chủ",item:baseUrl},{"@type":"ListItem",position:2,name:"Phòng",item:`${baseUrl}/rooms`},{"@type":"ListItem",position:3,name:room.name.vi,item:roomUrl}]},{"@context":"https://schema.org","@type":"HotelRoom",name:room.name.vi,description:room.summary.vi,url:roomUrl,image:[`${baseUrl}${getRoomMedia(room.slug).ogImage.src}`],bed:room.bed.vi,occupancy:{"@type":"QuantitativeValue",maxValue:room.guestCount},amenityFeature:room.amenityGroups.flatMap((group)=>group.items.map((item)=>({"@type":"LocationFeatureSpecification",name:item.vi,value:true}))),containedInPlace:{"@type":"LodgingBusiness",name:siteConfig.name,address:siteConfig.address,telephone:siteConfig.phoneDisplay},offers:{"@type":"Offer",priceCurrency:"VND",price:room.numericPriceFrom,availability:"https://schema.org/InStock",url:`${baseUrl}/booking?room=${room.slug}`}}];
}

export function buildHomepageStructuredData() {
  const baseUrl = siteConfig.siteUrl;
  const minPrice = Math.min(pricingData.single.priceFromVnd, pricingData.family.priceFromVnd, pricingData.dorm.priceFromVnd);
  const maxPrice = Math.max(pricingData.single.priceFromVnd, pricingData.family.priceFromVnd, pricingData.dorm.priceFromVnd);
  return [{"@context":"https://schema.org","@type":"LodgingBusiness","@id":`${baseUrl}/#lodging`,name:siteConfig.name,url:baseUrl,image:[`${baseUrl}${siteMedia.heroFrontAlt.src}`],description:"K2 Homestay tại trung tâm Ninh Kiều, có phòng đơn, phòng gia đình và phòng dorm giường tầng.",telephone:siteConfig.phoneDisplay,email:siteConfig.email,priceRange:`${minPrice.toLocaleString("vi-VN").replace(/,/g, ".")} VND - ${maxPrice.toLocaleString("vi-VN").replace(/,/g, ".")} VND`,address:{"@type":"PostalAddress",streetAddress:"60 Xô Viết Nghệ Tĩnh",addressLocality:"Phường Ninh Kiều",addressRegion:"Thành phố Cần Thơ",addressCountry:"VN"},amenityFeature:homeHighlights.map((item)=>({"@type":"LocationFeatureSpecification",name:item.title.vi,value:true})),makesOffer:roomTypes.map((room)=>({"@type":"Offer",name:room.name.vi,priceCurrency:"VND",price:room.numericPriceFrom,availability:"https://schema.org/InStock",url:`${baseUrl}/rooms/${room.slug}`}))}];
}