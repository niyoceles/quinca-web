import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LayersIcon from '@material-ui/icons/Layers';
import Link from '@material-ui/core/Link';

export const mainActionButtons = (
	<div>
		<Link variant='body2' href='/account/supplier/dashboard'>
			<ListItem button>
				<ListItemIcon>
					<DashboardIcon />
				</ListItemIcon>
				<ListItemText primary='Dashboard' />
			</ListItem>
		</Link>
		<Link variant='body2' href='/account/supplier/orders'>
			<ListItem button>
				<ListItemIcon>
					<ShoppingCartIcon />
				</ListItemIcon>
				<ListItemText primary='Orders' />
			</ListItem>
		</Link>
		<Link variant='body2' href='/account/supplier/proforma'>
			<ListItem button>
				<ListItemIcon>
					<LayersIcon />
				</ListItemIcon>
				<ListItemText primary='Proforma' />
			</ListItem>
		</Link>
		<Link variant='body2' href='/account/supplier/items'>
			<ListItem button>
				<ListItemIcon>
					<LayersIcon />
				</ListItemIcon>
				<ListItemText primary='Items' />
			</ListItem>
		</Link>
		<Link variant='body2' href='/account/supplier/categories'>
			<ListItem button>
				<ListItemIcon>
					<LayersIcon />
				</ListItemIcon>
				<ListItemText primary='Categories' />
			</ListItem>
		</Link>
		{/* <Link variant='body2' href='/account/supplier/reports'>
			<ListItem button>
				<ListItemIcon>
					<BarChartIcon />
				</ListItemIcon>
				<ListItemText primary='Reports' />
			</ListItem>
		</Link> */}
	</div>
);

export const secondaryActionButtons = (
	<div>
		<ListSubheader inset>...</ListSubheader>
		{/* <ListItem button>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<ListItemText primary='Contact us' />
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<ListItemText primary='About us' />
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<ListItemText primary='Help & Support' />
		</ListItem> */}
	</div>
);
