export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  inStock: boolean;
}

export const products: Product[] = [
  // Buckets
  { id: 1, name: "Bucket 10Ltr. Frosty", price: 55, category: "Buckets", image: "/assets/products/1.jpg", description: "Durable 10L plastic bucket", inStock: true },
  { id: 2, name: "Bucket 15Ltr. Frosty", price: 75, category: "Buckets", image: "/assets/products/2.jpg", description: "Durable 15L plastic bucket", inStock: true },
  { id: 3, name: "Bucket 20Ltr. Frosty", price: 100, category: "Buckets", image: "/assets/products/3.jpg", description: "Durable 20L plastic bucket", inStock: true },
  { id: 4, name: "Bucket 25Ltr. Frosty", price: 110, category: "Buckets", image: "/assets/products/4.jpg", description: "Durable 25L plastic bucket", inStock: true },
  { id: 5, name: "Lid 25 Ltr. Frosty", price: 34, category: "Lids", image: "/assets/products/5.jpg", description: "Lid for 25L Frosty bucket", inStock: true },
  { id: 6, name: "Bucket 10Ltr. Flora", price: 50, category: "Buckets", image: "/assets/products/6.jpg", description: "Flora design 10L bucket", inStock: true },
  { id: 7, name: "Bucket 15 Ltr. Flora", price: 65, category: "Buckets", image: "/assets/products/7.jpg", description: "Flora design 15L bucket", inStock: true },
  { id: 8, name: "Bucket 20 Ltr. Flora", price: 80, category: "Buckets", image: "/assets/products/8.jpg", description: "Flora design 20L bucket", inStock: true },
  { id: 9, name: "Bucket 25 Ltr. Flora", price: 105, category: "Buckets", image: "/assets/products/9.jpg", description: "Flora design 25L bucket", inStock: true },
  { id: 10, name: "Lid 25 Ltr Flora", price: 34, category: "Lids", image: "/assets/products/10.jpg", description: "Lid for 25L Flora bucket", inStock: true },
  { id: 11, name: "Bucket 15 Ltr. Rolex", price: 70, category: "Buckets", image: "/assets/products/11.jpg", description: "Rolex design 15L bucket", inStock: true },
  { id: 12, name: "Bucket 20 Ltr. Rolex", price: 80, category: "Buckets", image: "/assets/products/12.jpg", description: "Rolex design 20L bucket", inStock: true },
  { id: 13, name: "Bucket 25 Ltr. Rolex", price: 100, category: "Buckets", image: "/assets/products/13.jpg", description: "Rolex design 25L bucket", inStock: true },
  { id: 14, name: "Lid 15 Ltr. Rolex", price: 29, category: "Lids", image: "/assets/products/14.jpg", description: "Lid for 15L Rolex bucket", inStock: true },
  { id: 15, name: "Lid 20 Ltr. Rolex", price: 32, category: "Lids", image: "/assets/products/15.jpg", description: "Lid for 20L Rolex bucket", inStock: true },
  { id: 16, name: "Lid 25 Ltr. Rolex", price: 34, category: "Lids", image: "/assets/products/16.jpg", description: "Lid for 25L Rolex bucket", inStock: true },
  { id: 17, name: "Bucket 5 Ltr. Titan", price: 40, category: "Buckets", image: "/assets/products/17.jpg", description: "Titan design 5L bucket", inStock: true },
  { id: 18, name: "Bucket 10 Ltr. Titan", price: 50, category: "Buckets", image: "/assets/products/18.jpg", description: "Titan design 10L bucket", inStock: true },
  { id: 19, name: "Bucket 15 Ltr. Titan", price: 65, category: "Buckets", image: "/assets/products/19.jpg", description: "Titan design 15L bucket", inStock: true },
  { id: 20, name: "Bucket 20 Ltr. Titan", price: 75, category: "Buckets", image: "/assets/products/20.jpg", description: "Titan design 20L bucket", inStock: true },
  { id: 21, name: "Bucket 25 Ltr. Titan", price: 100, category: "Buckets", image: "/assets/products/21.jpg", description: "Titan design 25L bucket", inStock: true },
  { id: 22, name: "Lid 15 Ltr. Titan", price: 29, category: "Lids", image: "/assets/products/22.jpg", description: "Lid for 15L Titan bucket", inStock: true },
  { id: 23, name: "Lid 20 Ltr. Titan", price: 32, category: "Lids", image: "/assets/products/23.jpg", description: "Lid for 20L Titan bucket", inStock: true },
  { id: 24, name: "Lid 25 Ltr. Titan", price: 34, category: "Lids", image: "/assets/products/24.jpg", description: "Lid for 25L Titan bucket", inStock: true },
  { id: 25, name: "Bucket 101. Lovely", price: 48, category: "Buckets", image: "/assets/products/25.jpg", description: "Lovely design bucket", inStock: true },
  { id: 26, name: "Bucket 201 Rangoli", price: 100, category: "Buckets", image: "/assets/products/26.jpg", description: "Rangoli design bucket", inStock: true },
  { id: 27, name: "Bucket 301 Rangoli", price: 125, category: "Buckets", image: "/assets/products/27.jpg", description: "Rangoli design bucket", inStock: true },
  { id: 28, name: "Lid 101 Rangoli Plain", price: 14, category: "Lids", image: "/assets/products/28.jpg", description: "Plain Rangoli lid", inStock: true },
  { id: 29, name: "Lid 201 Rangoli Plain", price: 32, category: "Lids", image: "/assets/products/29.jpg", description: "Plain Rangoli lid", inStock: true },
  { id: 30, name: "Lid 301 Rangoli Plain", price: 34, category: "Lids", image: "/assets/products/30.jpg", description: "Plain Rangoli lid", inStock: true },
  { id: 31, name: "Bucket 10 Ltr. Rangoli", price: 48, category: "Buckets", image: "/assets/products/31.jpg", description: "Rangoli 10L bucket", inStock: true },
  { id: 32, name: "Bucket 7 Ltr. Rangoli", price: 37, category: "Buckets", image: "/assets/products/32.jpg", description: "Rangoli 7L bucket", inStock: true },
  { id: 33, name: "Lid 7 Ltr. Rangoli", price: 15, category: "Lids", image: "/assets/products/33.jpg", description: "Lid for 7L Rangoli bucket", inStock: true },
  { id: 34, name: "Bucket 5 Ltr Rangoli", price: 45, category: "Buckets", image: "/assets/products/34.jpg", description: "Rangoli 5L bucket", inStock: true },
  { id: 35, name: "Bucket 10 Ltr. Rangoli", price: 55, category: "Buckets", image: "/assets/products/35.jpg", description: "Rangoli 10L bucket", inStock: true },
  { id: 36, name: "Bucket 15 Ltr. Rangoli", price: 80, category: "Buckets", image: "/assets/products/36.jpg", description: "Rangoli 15L bucket", inStock: true },
  { id: 37, name: "Bucket 20 Ltr. Rangoli", price: 100, category: "Buckets", image: "/assets/products/37.jpg", description: "Rangoli 20L bucket", inStock: true },
  { id: 38, name: "Bucket 25 Ltr. Rangoli", price: 120, category: "Buckets", image: "/assets/products/38.jpg", description: "Rangoli 25L bucket", inStock: true },
  { id: 39, name: "Bucket 20 Ltr. Futura", price: 110, category: "Buckets", image: "/assets/products/39.jpg", description: "Futura 20L bucket", inStock: true },
  { id: 40, name: "Bucket 25 Ltr. Futura", price: 135, category: "Buckets", image: "/assets/products/40.jpg", description: "Futura 25L bucket", inStock: true },
  { id: 41, name: "Bucket 20 Ltr. Futura", price: 125, category: "Buckets", image: "/assets/products/41.jpg", description: "Futura 20L bucket", inStock: true },
  { id: 42, name: "Bucket 25 Ltr. Futura", price: 155, category: "Buckets", image: "/assets/products/42.jpg", description: "Futura 25L bucket", inStock: true },
  { id: 43, name: "Bucket 201 (Printed)", price: 110, category: "Buckets", image: "/assets/products/43.jpg", description: "Printed bucket 201", inStock: true },
  { id: 44, name: "Bucket 301 (Printed)", price: 135, category: "Buckets", image: "/assets/products/44.jpg", description: "Printed bucket 301", inStock: true },
  { id: 45, name: "Bucket Eco 18 Ltr Plain", price: 80, category: "Buckets", image: "/assets/products/45.jpg", description: "18L Eco plain bucket", inStock: true },
  { id: 46, name: "Bucket Eco 18 Ltr Printed", price: 95, category: "Buckets", image: "/assets/products/46.jpg", description: "18L Eco printed bucket", inStock: true },
  { id: 47, name: "Bucket 5 Ltr. Shaktiman", price: 47, category: "Buckets", image: "/assets/products/47.jpg", description: "Shaktiman 5L bucket", inStock: true },
  { id: 48, name: "Bucket 10 Ltr. Shaktiman", price: 88, category: "Buckets", image: "/assets/products/48.jpg", description: "Shaktiman 10L bucket", inStock: true },
  { id: 49, name: "Bucket 16 Ltr. Shaktiman", price: 110, category: "Buckets", image: "/assets/products/49.jpg", description: "Shaktiman 16L bucket", inStock: true },
  { id: 50, name: "Bucket 19 Ltr. Shaktiman", price: 140, category: "Buckets", image: "/assets/products/50.jpg", description: "Shaktiman 19L bucket", inStock: true },
  { id: 51, name: "Lid 5 Ltr. Shaktiman", price: 26, category: "Lids", image: "/assets/products/51.jpg", description: "Lid for 5L Shaktiman bucket", inStock: true },
  { id: 52, name: "Lid 10 Ltr. Shaktiman", price: 29, category: "Lids", image: "/assets/products/52.jpg", description: "Lid for 10L Shaktiman bucket", inStock: true },
  { id: 53, name: "Lid 16 Ltr. Shaktiman", price: 33, category: "Lids", image: "/assets/products/53.jpg", description: "Lid for 16L Shaktiman bucket", inStock: true },
  { id: 54, name: "Lid 19 Ltr. Shaktiman", price: 35, category: "Lids", image: "/assets/products/54.jpg", description: "Lid for 19L Shaktiman bucket", inStock: true },

  // Patlas
  { id: 55, name: "Patla Pancham", price: 80, category: "Patlas", image: "/assets/products/55.jpg", description: "Pancham design patla", inStock: true },
  { id: 56, name: "Patla Square Pancham", price: 90, category: "Patlas", image: "/assets/products/56.jpg", description: "Square Pancham patla", inStock: true },
  { id: 57, name: "Patla Square Big Pancham", price: 110, category: "Patlas", image: "/assets/products/57.jpg", description: "Big Square Pancham patla", inStock: true },
  { id: 58, name: "Patla Bhim", price: 110, category: "Patlas", image: "/assets/products/58.jpg", description: "Bhim design patla", inStock: true },
  { id: 59, name: "Patla Sumo", price: 115, category: "Patlas", image: "/assets/products/59.jpg", description: "Sumo design patla", inStock: true },
  { id: 60, name: "Patla Master", price: 105, category: "Patlas", image: "/assets/products/60.jpg", description: "Master design patla", inStock: true },
  { id: 61, name: "Patla Elephanta", price: 125, category: "Patlas", image: "/assets/products/61.jpg", description: "Elephanta design patla", inStock: true },
  { id: 62, name: "Patla Hippo", price: 135, category: "Patlas", image: "/assets/products/62.jpg", description: "Hippo design patla", inStock: true },
  { id: 63, name: "Patla Pilot", price: 118, category: "Patlas", image: "/assets/products/63.jpg", description: "Pilot design patla", inStock: true },
  { id: 64, name: "Patla Panda", price: 124, category: "Patlas", image: "/assets/products/64.jpg", description: "Panda design patla", inStock: true },
  { id: 65, name: "Patla Natraj", price: 125, category: "Patlas", image: "/assets/products/65.jpg", description: "Natraj design patla", inStock: true },
  { id: 66, name: "Patla Square", price: 135, category: "Patlas", image: "/assets/products/66.jpg", description: "Square design patla", inStock: true },
  { id: 67, name: "Patla Square 800 No", price: 150, category: "Patlas", image: "/assets/products/67.jpg", description: "Square 800 patla", inStock: true },
  { id: 68, name: "Patla Square 1000 No", price: 180, category: "Patlas", image: "/assets/products/68.jpg", description: "Square 1000 patla", inStock: true },
  { id: 69, name: "Patla Crown (Plain)", price: 115, category: "Patlas", image: "/assets/products/69.jpg", description: "Plain Crown patla", inStock: true },
  { id: 70, name: "Patla Crown (Printed)", price: 135, category: "Patlas", image: "/assets/products/70.jpg", description: "Printed Crown patla", inStock: true },

  // Furniture
  { id: 75, name: "Samrat Patra", price: 270, category: "Furniture", image: "/assets/products/75.jpg", description: "Samrat Patra chair", inStock: true },
  { id: 76, name: "Stool Square 21\"", price: 190, category: "Furniture", image: "/assets/products/76.jpg", description: "21 inch square stool", inStock: true },
  { id: 77, name: "Stool Comfort 21\"", price: 200, category: "Furniture", image: "/assets/products/77.jpg", description: "21 inch comfort stool", inStock: true },
  { id: 78, name: "Master Stool 14\"", price: 165, category: "Furniture", image: "/assets/products/78.jpg", description: "14 inch master stool", inStock: true },
  { id: 79, name: "Champion Stool 18\"", price: 200, category: "Furniture", image: "/assets/products/79.jpg", description: "18 inch champion stool", inStock: true },
  { id: 80, name: "Silver Stool Comfort 21\"", price: 125, category: "Furniture", image: "/assets/products/80.jpg", description: "21 inch silver comfort stool", inStock: true },

  // Basins & Tubs
  { id: 85, name: "Basin 13 No.", price: 65, category: "Basins", image: "/assets/products/85.jpg", description: "13 No basin", inStock: true },
  { id: 86, name: "Spiral Basin-20 No.", price: 75, category: "Basins", image: "/assets/products/86.jpg", description: "Spiral 20 No basin", inStock: true },
  { id: 87, name: "Basin 29 No.", price: 115, category: "Basins", image: "/assets/products/87.jpg", description: "29 No basin", inStock: true },
  { id: 88, name: "Basin 222 No. (13 Ltr)", price: 75, category: "Basins", image: "/assets/products/88.jpg", description: "222 No 13L basin", inStock: true },
  { id: 89, name: "Basin 333 No.", price: 100, category: "Basins", image: "/assets/products/89.jpg", description: "333 No basin", inStock: true },
  { id: 95, name: "Tub Flora", price: 115, category: "Tubs", image: "/assets/products/95.jpg", description: "Flora design tub", inStock: true },
  { id: 96, name: "Tub Sumo", price: 110, category: "Tubs", image: "/assets/products/96.jpg", description: "Sumo design tub", inStock: true },
  { id: 97, name: "Tub Mini Flora", price: 70, category: "Tubs", image: "/assets/products/97.jpg", description: "Mini Flora tub", inStock: true },
  { id: 98, name: "Tub Spiral", price: 105, category: "Tubs", image: "/assets/products/98.jpg", description: "Spiral design tub", inStock: true },
  { id: 99, name: "Tub 551 Shaktiman", price: 145, category: "Tubs", image: "/assets/products/99.jpg", description: "Shaktiman 551 tub", inStock: true },
  { id: 100, name: "Tub 651 Shaktiman", price: 200, category: "Tubs", image: "/assets/products/100.jpg", description: "Shaktiman 651 tub", inStock: true },

  // Mugs
  { id: 116, name: "Mug Flora 200", price: 15, category: "Mugs", image: "/assets/products/vmr (1).jpg", description: "200ml Flora mug", inStock: true },
  { id: 117, name: "Mug Rangoli 100 (Plain)", price: 13, category: "Mugs", image: "/assets/products/vmr (2).jpg", description: "100ml plain Rangoli mug", inStock: true },
  { id: 118, name: "Mug Rangoli 200 (Plain)", price: 17, category: "Mugs", image: "/assets/products/vmr (3).jpg", description: "200ml plain Rangoli mug", inStock: true },
  { id: 119, name: "Mug Rangoli 100 (Printed)", price: 16, category: "Mugs", image: "/assets/products/vmr (4).jpg", description: "100ml printed Rangoli mug", inStock: true },
  { id: 120, name: "Mug Rangoli 200 (Printed)", price: 20, category: "Mugs", image: "/assets/products/vmr (5).jpg", description: "200ml printed Rangoli mug", inStock: true },

  // Planters
  { id: 123, name: "Planter 8\"", price: 21, category: "Planters", image: "/assets/products/vmr (9).jpg", description: "8 inch planter", inStock: true },
  { id: 124, name: "Planter 10\"", price: 33, category: "Planters", image: "/assets/products/vmr (10).jpg", description: "10 inch planter", inStock: true },
  { id: 125, name: "Planter 12\"", price: 45, category: "Planters", image: "/assets/products/vmr (11).jpg", description: "12 inch planter", inStock: true },
  { id: 126, name: "Planter 14\"", price: 68, category: "Planters", image: "/assets/products/vmr (12).jpg", description: "14 inch planter", inStock: true },
  { id: 127, name: "Planter 16\"", price: 120, category: "Planters", image: "/assets/products/vmr (13).jpg", description: "16 inch planter", inStock: true },

  // Kitchen Items
  { id: 229, name: "Tasla 16\" (CGP)", price: 70, category: "Kitchen", image: "/assets/products/vmr (19).jpg", description: "16 inch tasla", inStock: true },
  { id: 230, name: "Tasla 17\" (CGP)", price: 85, category: "Kitchen", image: "/assets/products/vmr (20).jpg", description: "17 inch tasla", inStock: true },
  { id: 231, name: "Tasla 18\" (CGP)", price: 95, category: "Kitchen", image: "/assets/products/vmr (21).jpg", description: "18 inch tasla", inStock: true },
  { id: 232, name: "Tasla 20\" (CGP)", price: 115, category: "Kitchen", image: "/assets/products/vmr (22).jpg", description: "20 inch tasla", inStock: true },
  { id: 233, name: "Tasla 22\" (CGP)", price: 140, category: "Kitchen", image: "/assets/products/vmr (23).jpg", description: "22 inch tasla", inStock: true },
  { id: 234, name: "Bread Box Small", price: 37, category: "Kitchen", image: "/assets/products/vmr (24).jpg", description: "Small bread box", inStock: true },
  { id: 235, name: "Bread Box Big", price: 49, category: "Kitchen", image: "/assets/products/vmr (25).jpg", description: "Big bread box", inStock: true },
  { id: 238, name: "Cool Jug Plain 2500 ML", price: 40, category: "Kitchen", image: "/assets/products/vmr (26).jpg", description: "2.5L plain cool jug", inStock: true },
  { id: 239, name: "Cool Jug Printed 2500 ML", price: 48, category: "Kitchen", image: "/assets/products/vmr (27).jpg", description: "2.5L printed cool jug", inStock: true },
  { id: 249, name: "Ice Tray", price: 25, category: "Kitchen", image: "/assets/products/vmr (28).jpg", description: "Plastic ice tray", inStock: true },
  { id: 255, name: "LUNCH BOX 800 ML (TASTY)", price: 60, category: "Kitchen", image: "/assets/products/vmr (29).jpg", description: "800ml lunch box", inStock: true },
  { id: 256, name: "LUNCH BOX 600 ML (TASTY)", price: 50, category: "Kitchen", image: "/assets/products/vmr (30).jpg", description: "600ml lunch box", inStock: true },

  // Miscellaneous
  { id: 112, name: "Dustpan", price: 14, category: "Cleaning", image: "/assets/products/bucket (1).jpg", description: "Plastic dustpan", inStock: true },
  { id: 113, name: "Soap case 3 in 1", price: 11, category: "Bathroom", image: "/assets/products/bucket (2).jpg", description: "3 in 1 soap case", inStock: true },
  { id: 114, name: "Soap Case Rangoli (Plain)", price: 14, category: "Bathroom", image: "/assets/products/bucket (3).jpg", description: "Plain Rangoli soap case", inStock: true },
  { id: 115, name: "Soap Case rangoli (Printed)", price: 18, category: "Bathroom", image: "/assets/products/bucket (4).jpg", description: "Printed Rangoli soap case", inStock: true },
  { id: 252, name: "Bucket 200 No Polo", price: 115, category: "Buckets", image: "/assets/products/bucket (5).jpg", description: "Polo 200 bucket", inStock: true },
  { id: 253, name: "Bucket 250 No Polo", price: 145, category: "Buckets", image: "/assets/products/bucket (6).jpg", description: "Polo 250 bucket", inStock: true }
];

export const categories = [
  "All",
  "Buckets",
  "Lids", 
  "Patlas",
  "Furniture",
  "Basins",
  "Tubs",
  "Mugs",
  "Planters",
  "Kitchen",
  "Bathroom",
  "Cleaning"
];
