'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import { useAuth } from '@/features/auth/hooks/useAuth';

const AdminSidebar = () => {
    const pathname = usePathname();
    const { logout } = useAuth();

    const menuGroups = [
        {
            items: [
                { title: 'Dashboard', icon: 'ChartBarIcon', href: '/admin-dashboard' },
                { title: 'Add Product', icon: 'PlusCircleIcon', href: '/admin-dashboard/addProduct' },
                { title: 'Analytics', icon: 'PresentationChartLineIcon', href: '/admin-dashboard/analytics' },
                { title: 'Brands', icon: 'TagIcon', href: '/admin-dashboard/brands' },
                { title: 'Categories', icon: 'TableCellsIcon', href: '/admin-dashboard/categories' },
                { title: 'Coupons', icon: 'TicketIcon', href: '/admin-dashboard/coupons' },
                { title: 'Inactive Draft', icon: 'DocumentIcon', href: '/admin-dashboard/inactive-draft' },
                { title: 'Inquiries', icon: 'ChatBubbleLeftRightIcon', href: '/admin-dashboard/inquiries' },
                { title: 'Inventory', icon: 'RectangleStackIcon', href: '/admin-dashboard/inventory' },
                { title: 'Notifications', icon: 'BellIcon', href: '/admin-dashboard/notifications' },
                { title: 'Orders', icon: 'ShoppingBagIcon', href: '/admin-dashboard/orders' },
                { title: 'Products', icon: 'ArchiveBoxIcon', href: '/admin-dashboard/products' },
                { title: 'Profile', icon: 'UserIcon', href: '/admin-dashboard/profile' },
                { title: 'Return', icon: 'ArrowUturnLeftIcon', href: '/admin-dashboard/return' },
                { title: 'Revenue', icon: 'CurrencyDollarIcon', href: '/admin-dashboard/revenue' },
                { title: 'Subscription', icon: 'CreditCardIcon', href: '/admin-dashboard/subscription' },
                { title: 'Users', icon: 'UsersIcon', href: '/admin-dashboard/users' },
                { title: 'Withdrawal', icon: 'BanknotesIcon', href: '/admin-dashboard/withdrawal' },
            ]
        }
    ];

    return (
        <aside className="w-64 bg-white border-r border-border h-screen sticky top-0 shadow-sm hidden md:block flex-shrink-0">
            <div className="p-6 border-b border-border">
                <h2 className="text-xl font-bold text-espresso">Admin Panel</h2>
                <p className="text-xs text-mocha-grey">VMR Solution Management</p>
            </div>

            <div className="h-[calc(100vh-140px)] overflow-y-auto custom-scrollbar pb-20">
                <nav className="p-4 space-y-6">
                    {menuGroups.map((group, groupIndex) => (
                        <div key={groupIndex} className="space-y-2">
                            {group.groupName && (
                                <h3 className="px-4 text-[11px] font-bold text-mocha-grey/60 tracking-wider">
                                    {group.groupName}
                                </h3>
                            )}
                            <div className="space-y-1">
                                {group.items.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${isActive
                                                ? 'bg-primary text-primary-foreground shadow-sm'
                                                : 'text-mocha-grey hover:bg-soft-linen hover:text-espresso'
                                                }`}
                                        >
                                            <Icon name={item.icon as any} size={18} />
                                            <span className="text-sm font-medium">{item.title}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-white">
                <button
                    onClick={() => logout()}
                    className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                    <Icon name="ArrowLeftOnRectangleIcon" size={20} />
                    <span className="font-medium text-sm">Sign Out</span>
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;