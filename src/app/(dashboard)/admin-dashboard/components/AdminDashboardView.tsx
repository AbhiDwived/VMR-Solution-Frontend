'use client';

import Icon from '@/components/ui/AppIcon';
import { useAuth } from '@/features/auth/hooks/useAuth';

const AdminDashboardView = () => {
    const { user } = useAuth();
    const stats = [
        { label: 'Total Sales', value: '₹1,24,500', icon: 'CurrencyRupeeIcon', color: 'bg-green-100 text-green-600' },
        { label: 'Total Orders', value: '156', icon: 'ShoppingBagIcon', color: 'bg-blue-100 text-blue-600' },
        { label: 'New Customers', value: '42', icon: 'UsersIcon', color: 'bg-purple-100 text-purple-600' },
        { label: 'Pending Orders', value: '12', icon: 'ClockIcon', color: 'bg-orange-100 text-orange-600' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-espresso">Admin Overview</h1>
                    <p className="text-mocha-grey">Welcome back, {user?.fullName || 'Admin'}! Here's what's happening today.</p>
                </div>
                <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium shadow-md hover:bg-secondary transition-colors flex items-center space-x-2">
                    <Icon name="PlusIcon" size={20} />
                    <span>Add Product</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-sm border border-border flex items-center space-x-4">
                        <div className={`p-4 rounded-xl ${stat.color}`}>
                            <Icon name={stat.icon as any} size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-mocha-grey font-medium">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-espresso">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-border">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-espresso">Recent Orders</h3>
                        <button className="text-primary font-medium hover:underline text-sm">View All</button>
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-soft-linen rounded-xl hover:bg-opacity-80 transition-all">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-border shadow-sm">
                                        <Icon name="ShoppingBagIcon" size={20} className="text-mocha-grey" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-espresso">Order #2026-00{i}</h4>
                                        <p className="text-xs text-mocha-grey font-medium">customer{i}@example.com</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-espresso">₹{1000 + (i * 500)}</p>
                                    <span className="text-[10px] px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full font-bold uppercase tracking-wider">Pending</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-border">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-espresso">Inventory Status</h3>
                        <button className="text-primary font-medium hover:underline text-sm">Manage</button>
                    </div>
                    <div className="space-y-6">
                        {[
                            { label: 'Storage Boxes', stock: 12, total: 100 },
                            { label: 'Plastic Buckets', stock: 85, total: 200 },
                            { label: 'Garden Pots', stock: 5, total: 50 },
                        ].map((item) => (
                            <div key={item.label} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="font-bold text-espresso">{item.label}</span>
                                    <span className={`font-medium ${item.stock < 20 ? 'text-red-500' : 'text-mocha-grey'}`}>
                                        {item.stock} / {item.total} in stock
                                    </span>
                                </div>
                                <div className="h-2 bg-soft-linen rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${item.stock < 20 ? 'bg-red-500' : 'bg-green-500'}`}
                                        style={{ width: `${(item.stock / item.total) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardView;