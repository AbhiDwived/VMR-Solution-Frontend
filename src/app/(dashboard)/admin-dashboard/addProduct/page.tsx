'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import Breadcrumb from '@/components/common/Breadcrumb';
import { useAuth } from '@/features/auth/hooks/useAuth';
import AdminSidebar from '../components/AdminSidebar';

const AddProductPage = () => {
    const router = useRouter();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        shortDescription: '',
        longDescription: '',
        category: '',
        brand: '',
        price: '',
        discount: '0',
        stock: '',
        sku: '',
        lowStockThreshold: '5',
        gstRate: '18',
        hsnCode: '',
        status: 'draft',
        isFeatured: false,
        weight: '',
        dimensions: '',
    });

    const categories = [
        'Storage Boxes',
        'Kitchen Utensils',
        'Bathroom Accessories',
        'Garden Equipment',
        'Home Utility',
        'Plastic Furniture',
    ];

    const brands = [
        'VMR Premium',
        'PolyStrong',
        'EcoPlastic',
        'Duraseal',
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        setFormData(prev => ({ ...prev, [name]: val }));
    };

    const handleSave = async (isDraft: boolean = false) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert(isDraft ? 'Product saved as draft!' : 'Product added successfully!');
            router.push('/admin-dashboard/products');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-background">
            <main className="flex">
                <AdminSidebar />
                <div className="flex-1 p-6">
                    <Breadcrumb />
                    <div className="max-w-[1400px] mx-auto space-y-8 pb-20">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-espresso mt-2">Add New Product</h1>
                                <p className="text-mocha-grey text-sm">Fill in all the details below to publish your product</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => handleSave(true)}
                                    className="px-6 py-2.5 rounded-xl border border-border bg-white text-espresso font-medium hover:bg-soft-linen transition-all shadow-sm"
                                >
                                    Save as Draft
                                </button>
                                <button
                                    onClick={() => handleSave(false)}
                                    disabled={loading}
                                    className="px-8 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all shadow-md shadow-primary/20 flex items-center gap-2"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <Icon name="CheckIcon" size={20} />
                                    )}
                                    Publish Product
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            <div className="lg:col-span-8 space-y-8">
                                <section className="bg-white border border-border rounded-2xl shadow-sm overflow-hidden">
                                    <div className="px-8 py-5 border-b border-border bg-soft-linen/20">
                                        <h3 className="font-bold text-espresso text-lg flex items-center gap-2">
                                            <Icon name="DocumentTextIcon" size={22} className="text-primary" />
                                            Basic Information
                                        </h3>
                                    </div>
                                    <div className="p-8 space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-espresso">Product Name *</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    placeholder="e.g. Premium Stackable Storage Box"
                                                    className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 outline-none transition-all hover:border-primary/30"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-espresso">Brand</label>
                                                <select
                                                    name="brand"
                                                    value={formData.brand}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none"
                                                >
                                                    <option value="">Select Brand</option>
                                                    {brands.map(b => <option key={b} value={b}>{b}</option>)}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-espresso">Category *</label>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                                {categories.map(cat => (
                                                    <button
                                                        key={cat}
                                                        onClick={() => setFormData({ ...formData, category: cat })}
                                                        className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${formData.category === cat
                                                                ? 'border-primary bg-primary/5 text-primary shadow-sm'
                                                                : 'border-border bg-white text-mocha-grey hover:border-primary/50'
                                                            }`}
                                                    >
                                                        {cat}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-espresso">Short Description *</label>
                                            <textarea
                                                name="shortDescription"
                                                rows={3}
                                                value={formData.shortDescription}
                                                onChange={handleInputChange}
                                                placeholder="High-level overview of the product..."
                                                className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-espresso">Long Description</label>
                                            <textarea
                                                name="longDescription"
                                                rows={6}
                                                value={formData.longDescription}
                                                onChange={handleInputChange}
                                                placeholder="Detailed features, materials, usage instructions..."
                                                className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                                            />
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AddProductPage;