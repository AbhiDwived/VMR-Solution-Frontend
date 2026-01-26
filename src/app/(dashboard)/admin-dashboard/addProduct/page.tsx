"use client";

import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useAddAdminProductMutation } from '@/store/api/productsApi';
import { HexColorPicker } from "react-colorful";
import React from "react";
import AdminSidebar from '../components/AdminSidebar';
import Breadcrumb from '@/components/common/Breadcrumb';

// SKU generator
const generateSKU = (slug: string, color: string, size: string) =>
  `${slug}-${color}-${size}`;

// Slug generator
const generateSlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

// Interfaces
interface ProductData {
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  materials: string;
  careInstructions: string;
  specifications: string;
  additionalInfo: string;
  weight: number;
  warranty: string;
  adminEmail: string;
  price: number;
  discountPrice: number;
  stockQuantity: number;
  category: string;
  brand: string;
  videoUrl: string;
  type: "own" | "affiliate";
  affiliateLink?: string;
}

interface Variant {
  sku: string;
  color: string;
  size: string;
  stock: number;
  price: number;
  images: string[];
}

export type DeliveryCharge = {
  division: string;
  district: string;
  charge: number;
};

// Cloudinary Upload Function
const uploadImageToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "campus-needs-upload");

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dwg8d0bfp/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    return data.secure_url;
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
};

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [slugEdited, setSlugEdited] = useState(false);
  const [slugCounter, setSlugCounter] = useState(1);
  const [addAdminProduct] = useAddAdminProductMutation();
  const [productData, setProductData] = useState<ProductData>({
    name: "",
    slug: "",
    description: "",
    longDescription: "",
    materials: "",
    careInstructions: "",
    specifications: "",
    additionalInfo: "",
    weight: 0,
    warranty: "",
    adminEmail: "",
    price: 0,
    discountPrice: 0,
    stockQuantity: 0,
    category: "",
    brand: "",
    videoUrl: "",
    type: "own",
  });

  const [productImages, setProductImages] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([""]);
  const [colors, setColors] = useState<string[]>([""]);
  const [sizes, setSizes] = useState<string[]>([""]);
  const [features, setFeatures] = useState<string[]>([""]);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isNewArrival, setIsNewArrival] = useState(false);
  const [brandSlug, setBrandSlug] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [currentColor, setCurrentColor] = useState("#ff0000");
  const { user } = useAuth();
  const [deliveryCharges, setDeliveryCharges] = React.useState<DeliveryCharge[]>([]);
  const [defaultDeliveryCharge, setDefaultDeliveryCharge] = React.useState(0);

  const handleDeliveryChange = (
    charges: DeliveryCharge[],
    defaultCharge: number
  ) => {
    setDeliveryCharges(charges);
    setDefaultDeliveryCharge(defaultCharge);
  };

  const addColor = () => {
    if (currentColor && !colors.includes(currentColor)) {
      setColors([...colors, currentColor]);
    }
  };

  const removeColor = (color: string) => {
    setColors(colors.filter((c) => c !== color));
  };

  useEffect(() => {
    setBrandSlug("admin-vmr");
  }, []);



  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (name === 'name') {
      const baseSlug = generateSlug(value);
      setProductData((prev) => ({
        ...prev,
        name: value,
        slug: slugCounter > 1 ? `${baseSlug}-${slugCounter}` : baseSlug,
      }));
    } else {
      setProductData((prev) => ({
        ...prev,
        [name]: type === "number" ? Number(value) : value,
      }));
    }
  };

  const handleArrayChange = (setter: any, index: number, value: string) => {
    setter((prev: string[]) =>
      prev.map((item, idx) => (idx === index ? value : item))
    );
  };

  const addArrayItem = (setter: any) =>
    setter((prev: string[]) => [...prev, ""]);

  const removeArrayItem = (setter: any, index: number) =>
    setter((prev: string[]) => prev.filter((_, idx) => idx !== index));

  const handleVariantChange = (color: string, size: string) => {
    const sku = generateSKU(productData.slug, color, size);
    if (!variants.some((v) => v.color === color && v.size === size)) {
      setVariants((prev) => [
        ...prev,
        { sku, color, size, stock: 0, price: productData.price, images: [] },
      ]);
    }
  };

  const updateVariantField = (
    color: string,
    size: string,
    field: keyof Variant,
    value: any
  ) => {
    setVariants((prev) =>
      prev.map((variant) =>
        variant.color === color && variant.size === size
          ? { ...variant, [field]: value }
          : variant
      )
    );
  };

  const resetForm = () => {
    setProductData({
      name: "",
      slug: "",
      description: "",
      longDescription: "",
      materials: "",
      careInstructions: "",
      specifications: "",
      additionalInfo: "",
      weight: 0,
      warranty: "",
      adminEmail: "",
      price: 0,
      discountPrice: 0,
      stockQuantity: 0,
      category: "",
      brand: "",
      videoUrl: "",
      type: "own",
    });
    setProductImages([]);
    setTags([""]);
    setColors([""]);
    setSizes([""]);
    setFeatures([""]);
    setVariants([]);
    setIsFeatured(false);
    setIsNewArrival(false);
    setSlugEdited(false);
    setSlugCounter(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const finalCategory =
      selectedCategory === "Others" ? customCategory.trim() : selectedCategory;

    if (!finalCategory) {
      toast.error("❌ Please select or enter a category.");
      return;
    }

    const adminEmail = user?.email || "";
    const adminName = user?.name || "";
    const adminNumber = user?.phone || 0;

    const finalData = {
      ...productData,
      category: finalCategory,
      type: productData.affiliateLink ? "affiliate" : "own",
      productImages,
      tags,
      colors,
      sizes,
      features,
      isFeatured,
      isNewArrival,
      variants,
      adminEmail,
      adminName,
      adminNumber,
      deliveryCharges,
      defaultDeliveryCharge,
    };

    setLoading(true);

    try {
      console.log("data", finalData);
      const response = await addAdminProduct(finalData).unwrap();
      toast.success("✅ Product added successfully!");
      resetForm();
      setSelectedCategory("");
      setCustomCategory("");
    } catch (err: any) {
      console.error("Error adding product:", err);
      if (err.status === 400 && err.data?.message?.includes('slug')) {
        setSlugCounter(prev => prev + 1);
        toast.error("Slug exists, trying with different number...");
        return;
      }
      if (err.status === 400) {
        toast.error(
          `❌ ${err.data?.message || "Validation error."}`
        );
      } else {
        toast.error("❌ Failed to add product.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setLoading(true);
    try {
      const uploadPromises = files.map((file) => uploadImageToCloudinary(file));
      const uploadedUrls = await Promise.all(uploadPromises);
      setProductImages((prev) => [...prev, ...uploadedUrls]);
      toast.success("✅ Images uploaded!");
    } catch (error) {
      toast.error("❌ Image upload failed!");
    } finally {
      setLoading(false);
    }
  };

  const renderInputField = (
    label: string,
    name: keyof ProductData,
    type = "text",
    required = false
  ) => {
    const isMultiline = name === "description" || name === "longDescription";

    return (
      <div className="flex flex-col gap-1">
        <label className="font-semibold text-gray-800 mb-1 flex items-center gap-1">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>

        <div className="relative">
          {isMultiline ? (
            <textarea
              name={name}
              required={required}
              value={productData[name] as string}
              onChange={handleInputChange}
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-200"
            />
          ) : (
            <input
              type={type}
              name={name}
              required={required}
              value={productData[name] === 0 ? "" : productData[name]}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-200"
            />
          )}
        </div>
      </div>
    );
  };

  const renderArrayField = (
    label: string,
    state: string[],
    setter: any,
    required = false
  ) => (
    <div className="flex flex-col gap-2">
      <label className="font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {label === "Product Images" ? (
        <>
          <input
            type="file"
            multiple
            onChange={handleImageUpload}
            className="w-full p-3 border border-gray-300 rounded-md"
            required={required}
          />
          <div className="flex flex-wrap gap-4 mt-4">
            {state.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="Uploaded Preview"
                className="w-24 h-24 object-cover rounded-md border"
              />
            ))}
          </div>
        </>
      ) : (
        <>
          {state.map((val, idx) => (
            <div key={idx} className="flex gap-2 items-center">
              <input
                value={val}
                onChange={(e) => handleArrayChange(setter, idx, e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required={required}
              />
              <button
                type="button"
                onClick={() => removeArrayItem(setter, idx)}
                className="bg-red-500 text-white px-3 py-1 rounded-md"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem(setter)}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-gray-700"
          >
            Add {label}
          </button>
        </>
      )}
    </div>
  );

  const renderVariants = () =>
    colors.flatMap((color) =>
      sizes.map((size) => (
        <div
          key={`${color}-${size}`}
          className="border p-6 my-4 rounded-lg shadow-md hover:shadow-xl transition-shadow"
        >
          <h4 className="font-bold text-xl">
            {color} - {size}
          </h4>
          <div className="flex gap-4 items-center">
            <input
              value={generateSKU(productData.slug, color, size)}
              disabled
              className="p-3 border border-gray-300 rounded-md w-full"
            />
            <button
              type="button"
              onClick={() => handleVariantChange(color, size)}
              className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700"
            >
              Add Variant
            </button>
          </div>
          {variants.some((v) => v.color === color && v.size === size) && (
            <div className="mt-4 grid grid-cols-3 gap-4">
              <input
                type="number"
                placeholder="Stock"
                onChange={(e) =>
                  updateVariantField(
                    color,
                    size,
                    "stock",
                    Number(e.target.value)
                  )
                }
                className="p-3 border border-gray-300 rounded-md"
              />
              <input
                type="number"
                placeholder="Price"
                onChange={(e) =>
                  updateVariantField(
                    color,
                    size,
                    "price",
                    Number(e.target.value)
                  )
                }
                className="p-3 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Images (comma separated)"
                onChange={(e) =>
                  updateVariantField(
                    color,
                    size,
                    "images",
                    e.target.value.split(",")
                  )
                }
                className="p-3 border border-gray-300 rounded-md"
              />
            </div>
          )}
        </div>
      ))
    );

  const DeliveryChargesForm = ({ initialDeliveryCharges, initialDefaultCharge, onChange }: any) => {
    const [charges, setCharges] = useState(initialDeliveryCharges || []);
    const [defaultCharge, setDefaultCharge] = useState(initialDefaultCharge || 0);

    const addCharge = () => {
      const newCharge = { division: "", district: "", charge: 0 };
      const updatedCharges = [...charges, newCharge];
      setCharges(updatedCharges);
      onChange(updatedCharges, defaultCharge);
    };

    const removeCharge = (index: number) => {
      const updatedCharges = charges.filter((_: any, i: number) => i !== index);
      setCharges(updatedCharges);
      onChange(updatedCharges, defaultCharge);
    };

    const updateCharge = (index: number, field: string, value: any) => {
      const updatedCharges = charges.map((charge: any, i: number) =>
        i === index ? { ...charge, [field]: value } : charge
      );
      setCharges(updatedCharges);
      onChange(updatedCharges, defaultCharge);
    };

    const updateDefaultCharge = (value: number) => {
      setDefaultCharge(value);
      onChange(charges, value);
    };

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Delivery Charges</h3>
        
        <div className="space-y-2">
          <label className="font-medium text-gray-700">Default Delivery Charge</label>
          <input
            type="number"
            value={defaultCharge}
            onChange={(e) => updateDefaultCharge(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Default charge for all areas"
          />
        </div>

        <div className="space-y-3">
          <label className="font-medium text-gray-700">Specific Area Charges</label>
          {charges.map((charge: any, index: number) => (
            <div key={index} className="grid grid-cols-4 gap-3 items-center">
              <input
                type="text"
                placeholder="Division"
                value={charge.division}
                onChange={(e) => updateCharge(index, "division", e.target.value)}
                className="p-3 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="District"
                value={charge.district}
                onChange={(e) => updateCharge(index, "district", e.target.value)}
                className="p-3 border border-gray-300 rounded-md"
              />
              <input
                type="number"
                placeholder="Charge"
                value={charge.charge}
                onChange={(e) => updateCharge(index, "charge", Number(e.target.value))}
                className="p-3 border border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={() => removeCharge(index)}
                className="bg-red-500 text-white px-3 py-2 rounded-md"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addCharge}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Add Delivery Charge
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="flex">
        <AdminSidebar />
        <div className="flex-1 min-h-screen">
          <div className="p-6 lg:p-8">
            <Breadcrumb />
            <div className="mt-6">
              <div className="p-8 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
                <ToastContainer />
                {loading && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </div>
                    </div>
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="text-center text-2xl font-semibold text-gray-800">
                    Add Product
                  </div>
                  {renderInputField("Product Name", "name", "text", true)}
                  {renderInputField("Slug", "slug", "text", true)}
                  {renderInputField("Description", "description", "text", true)}
                  {renderInputField("Long Description", "longDescription", "text")}
                  {renderInputField("Materials", "materials", "text")}
                  {renderInputField("Care Instructions", "careInstructions", "text")}
                  {renderInputField("Specifications", "specifications", "text")}
                  {renderInputField("Additional Info", "additionalInfo", "text")}
                  {renderInputField("Weight", "weight", "number")}
                  {renderInputField("Warranty", "warranty", "text")}
                  {renderInputField("Price", "price", "number", true)}
                  {renderInputField("After Discount Price", "discountPrice", "number", true)}
                  {renderInputField("Stock Quantity", "stockQuantity", "number", true)}
                  <label
                    className="block text-base font-medium mb-1"
                    style={{ color: "#F6550C" }}
                  >
                    Category<span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">Select a category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Books">Books</option>
                    <option value="Home & Kitchen">Home & Kitchen</option>
                    <option value="Beauty & Personal Care">Beauty & Personal Care</option>
                    <option value="Sports & Outdoors">Sports & Outdoors</option>
                    <option value="Toys & Games">Toys & Games</option>
                    <option value="Automotive">Automotive</option>
                    <option value="Health & Wellness">Health & Wellness</option>
                    <option value="Office Supplies">Office Supplies</option>
                    <option value="Jewelry & Accessories">Jewelry & Accessories</option>
                    <option value="Garden & Outdoor">Garden & Outdoor</option>
                    <option value="Baby Products">Baby Products</option>
                    <option value="Groceries & Gourmet Food">
                      Groceries & Gourmet Food
                    </option>
                    <option value="Pet Supplies">Pet Supplies</option>
                    <option value="Music & Instruments">Music & Instruments</option>
                    <option value="Movies & TV Shows">Movies & TV Shows</option>
                    <option value="Tools & Hardware">Tools & Hardware</option>
                    <option value="Computers & Accessories">
                      Computers & Accessories
                    </option>
                    <option value="Mobile Phones & Accessories">
                      Mobile Phones & Accessories
                    </option>
                    <option value="Footwear">Footwear</option>
                    <option value="Handbags & Wallets">Handbags & Wallets</option>
                    <option value="Art & Craft Supplies">Art & Craft Supplies</option>
                    <option value="Luggage & Travel Gear">Luggage & Travel Gear</option>
                    <option value="Collectibles & Memorabilia">
                      Collectibles & Memorabilia
                    </option>
                    <option value="Kitchen Appliances">Kitchen Appliances</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Software & Apps">Software & Apps</option>
                    <option value="Industrial & Scientific">
                      Industrial & Scientific
                    </option>
                    <option value="Others">Others</option>
                  </select>

                  {selectedCategory === "Others" && (
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      placeholder="Enter custom category"
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                    />
                  )}

                  {renderInputField("Brand", "brand", "text")}
                  {renderInputField("Video URL", "videoUrl", "text")}
                  {renderArrayField(
                    "Product Images",
                    productImages,
                    setProductImages,
                    true
                  )}
                  {renderArrayField("Tags", tags, setTags)}
                  
                  <div className="mb-6">
                    <label className="block text-base font-semibold text-gray-800 mb-2">
                      Pick Product Colors
                    </label>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                      <div>
                        <HexColorPicker
                          color={currentColor}
                          onChange={setCurrentColor}
                          className="w-full rounded-lg shadow"
                        />
                      </div>

                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                          <input
                            type="text"
                            value={currentColor}
                            onChange={(e) => setCurrentColor(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 text-sm w-32"
                            placeholder="#ffffff"
                          />
                          <div
                            className="w-8 h-8 rounded-full border shadow"
                            style={{ backgroundColor: currentColor }}
                          ></div>
                          <button
                            type="button"
                            onClick={addColor}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
                          >
                            + Add
                          </button>
                        </div>

                        {colors.length > 0 && (
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Selected Colors:</p>
                            <div className="flex flex-wrap gap-2">
                              {colors.map((color) => (
                                <div
                                  key={color}
                                  onClick={() => removeColor(color)}
                                  className="w-7 h-7 rounded-full border shadow cursor-pointer"
                                  style={{ backgroundColor: color }}
                                  title={`Click to remove ${color}`}
                                ></div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {renderArrayField("Sizes", sizes, setSizes)}
                  {renderArrayField("Features", features, setFeatures)}
                  {renderInputField(
                    "Affiliate Link (Only fill if product is affiliate type)",
                    "affiliateLink",
                    "text",
                    false
                  )}

                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 text-gray-700">
                      <input
                        type="checkbox"
                        checked={isFeatured}
                        onChange={(e) => setIsFeatured(e.target.checked)}
                      />
                      Featured
                    </label>
                    <label className="flex items-center gap-2 text-gray-700">
                      <input
                        type="checkbox"
                        checked={isNewArrival}
                        onChange={(e) => setIsNewArrival(e.target.checked)}
                      />
                      New Arrival
                    </label>
                  </div>
                  <h3 className="text-lg font-semibold mt-6 text-gray-800">
                    Variants (Color + Size)
                  </h3>
                  {renderVariants()}
                  <DeliveryChargesForm
                    initialDeliveryCharges={deliveryCharges}
                    initialDefaultCharge={defaultDeliveryCharge}
                    onChange={handleDeliveryChange}
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 w-full"
                  >
                    Add Product
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddProduct;