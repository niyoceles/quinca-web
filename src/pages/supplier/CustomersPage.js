import React from 'react';
import SupplierLayout from '../../layouts/SupplierLayout';
import { Card } from '../../components/Ui/Card';
import { Typography } from '../../components/Ui/Typography';
import { Users } from 'lucide-react';

const CustomersPage = () => {
	return (
		<SupplierLayout>
			<div className="space-y-6">
				<div>
					<Typography variant="h3">Customers Management</Typography>
					<p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
						View and manage your client relationships
					</p>
				</div>
				
				<Card className="border-none shadow-premium rounded-[2.5rem] bg-white p-12 flex flex-col items-center justify-center text-center">
					<div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-200">
						<Users size={32} />
					</div>
					<Typography variant="h4" className="mb-2">Customer List Coming Soon</Typography>
					<p className="text-sm font-medium text-slate-400 max-w-sm">
						We are currently synchronizing your customer database. This feature will be available shortly.
					</p>
				</Card>
			</div>
		</SupplierLayout>
	);
};

export default CustomersPage;
