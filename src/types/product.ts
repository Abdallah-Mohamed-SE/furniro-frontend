export type ProductCategory = "إدارة" | "تحليلات" | "أتمتة";

export type ProductBadgeVariant = "default" | "success" | "warning" | "info";

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: ProductCategory;
  badgeText?: string;
  badgeVariant?: ProductBadgeVariant;
  features: string[];
}
