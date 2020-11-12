export const UPLOAD_CONTROLLER_RESOURCE = {
  PATH: {
    ROOT: 'admin/upload',
    PRODUCT: '/product/:id',
    SERVICE: '/service/:id',
    SERVICE_CATEGORY: '/service-category/:id',
    PRODUCT_CATEGORY: '/product-category/:id'
  },
  BODY: {
    SERVICE: 'service',
    PRODUCT: 'product',
    SERVICE_CATEGORY: 'service-category',
    PRODUCT_CATEGORY: 'product-category'
  }
};

export const UPLOAD_COMMON_FOLDER_PATH = './files';

export const FILE_SIZE = {
  PICTURE: 2097152
};
