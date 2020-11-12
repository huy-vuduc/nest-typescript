// @material-ui/icons
import {
    Dashboard,
    Person,
    List,
    CategoryOutlined,
    PublicOutlined,
    ListAltRounded
} from '@material-ui/icons/';
import { PRODUCT_RESOURCE } from './resource/product.resource';
import { SERVICE_RESOURCE } from './resource/service.resource';

const dashboardRoutes = [
    {
        path: '/dashboard',
        name: 'Dashboard',
        icon: Dashboard,
        layout: '/admin'
    },
    {
        path: '/product/list',
        name: PRODUCT_RESOURCE.TITLE_LIST_PRODUCT,
        icon: List,
        layout: '/admin'
    },
    {
        path: '/product-category/list',
        name: PRODUCT_RESOURCE.TITLE_LIST_PRODUCT_CATEGORY,
        icon: CategoryOutlined,
        layout: '/admin'
    },
    {
        path: '/service/list',
        name: SERVICE_RESOURCE.TITLE_LIST_SERVICE,
        icon: ListAltRounded,
        layout: '/admin'
    },
    {
        path: '/service-category/list',
        name: SERVICE_RESOURCE.TITLE_LIST_SERVICE_CATEGORY,
        icon: PublicOutlined,
        layout: '/admin'
    }
];

export default dashboardRoutes;
