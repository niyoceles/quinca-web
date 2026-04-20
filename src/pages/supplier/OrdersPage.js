import React from 'react';
import SupplierLayout from '../../layouts/SupplierLayout';
import AllOrders from '../../components/Tables/AllOrders';

const OrdersPage = () => {
	return (
		<SupplierLayout>
			<AllOrders />
		</SupplierLayout>
	);
};
export default OrdersPage;
