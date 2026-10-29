// ============================================================================
// LEO — Men's Streetwear & Fashion Ecommerce Platform
// OpenAPI 3.0.3 / Swagger Specification & Interactive UI Handler
// ============================================================================

export const swaggerSpec = {
  openapi: '3.0.3',
  info: {
    title: 'LEO — Men\'s Fashion & Streetwear E-Commerce API',
    version: '1.0.0',
    description:
      'Complete RESTful API documentation for the **LEO ("THE KING")** Men\'s D2C Fashion Storefront and 18-Module Enterprise Admin Dashboard. Supports full CRUD operations for Products, Orders, Hero Banners, Coupons, Customer Reviews, Editorial Blogs, Categories, Collections, Curated Looks, CRM Customers, Returns, and Store Analytics.',
    contact: {
      name: 'LEO Enterprise Engineering',
      email: 'admin@leomenswear.com',
      url: 'http://localhost:3000/admin'
    },
    license: {
      name: 'Proprietary — LEO Menswear',
    }
  },
  servers: [
    {
      url: 'http://localhost:5001',
      description: 'Local Backend API Server (Port 5001)'
    },
    {
      url: 'http://localhost:3000',
      description: 'Local Vite Proxy Server (Port 3000)'
    }
  ],
  tags: [
    { name: 'Products', description: 'Men\'s apparel catalog CRUD, search, filtering & stock updates' },
    { name: 'Orders', description: 'Customer checkout orders, 7-step fulfillment pipeline & tracking' },
    { name: 'Banners', description: 'Homepage promotional hero slider CRUD operations' },
    { name: 'Coupons', description: 'Promotional discount vouchers, flash sales & checkout validation' },
    { name: 'Reviews', description: 'Verified buyer ratings, UGC reviews, moderation & brand replies' },
    { name: 'Blogs & CMS', description: 'LEO Editorial Journal articles & storefront CMS configuration' },
    { name: 'Categories & Collections', description: 'Navigation taxonomy, mega-menu groups & seasonal drops' },
    { name: 'Looks', description: 'Shop The Full Look curated outfit bundles' },
    { name: 'Operations & CRM', description: 'Customers, Returns/Refunds, Inventory, Variants & Team Users' },
    { name: 'Analytics & Utilities', description: 'Executive KPIs, revenue trends & Indian pincode serviceability' }
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Optional Admin JWT token (`Authorization: Bearer <token>`)'
      },
      AdminApiKey: {
        type: 'apiKey',
        in: 'header',
        name: 'X-Admin-Key',
        description: 'Optional Admin API Key for protected administrative mutations'
      }
    },
    schemas: {
      Product: {
        type: 'object',
        required: ['title', 'price', 'category'],
        properties: {
          id: { type: 'string', example: 'leo-101' },
          title: { type: 'string', example: 'Signature Heavyweight Oversized Tee' },
          subtitle: { type: 'string', example: '240 GSM Bio-Washed Combed Cotton' },
          slug: { type: 'string', example: 'signature-heavyweight-oversized-tee' },
          sku: { type: 'string', example: 'LEO-TSH-001' },
          category: { type: 'string', example: 'oversized-tees' },
          gender: { type: 'string', example: 'men' },
          price: { type: 'number', example: 799 },
          mrp: { type: 'number', example: 1599 },
          discount: { type: 'string', example: '50% OFF' },
          gst: { type: 'number', example: 5 },
          inventory: { type: 'integer', example: 84 },
          fit: { type: 'string', example: 'Oversized Boxy Fit' },
          fabric: { type: 'string', example: '100% Super Combed Cotton, 240 GSM' },
          isBestseller: { type: 'boolean', example: true },
          isFavourite: { type: 'boolean', example: false },
          rating: { type: 'number', example: 4.9 },
          reviewCount: { type: 'integer', example: 1428 },
          image: { type: 'string', example: '/images/products/POLOPDP-5_5c355606-1884-4943-b73a-f1503bc04014.jpg' },
          description: { type: 'string', example: '100% Super Combed Cotton heavyweight build designed for daily wear.' }
        }
      },
      ProductInput: {
        type: 'object',
        required: ['title', 'price', 'category'],
        properties: {
          title: { type: 'string', example: '240 GSM Oversized Heavyweight Tee' },
          subtitle: { type: 'string', example: 'Men\'s Streetwear Drop' },
          sku: { type: 'string', example: 'LEO-OVZ-240-BLK' },
          category: { type: 'string', example: 'oversized-tees' },
          price: { type: 'number', example: 799 },
          mrp: { type: 'number', example: 1599 },
          gst: { type: 'number', example: 5 },
          inventory: { type: 'integer', example: 50 },
          fit: { type: 'string', example: 'Oversized Boxy Fit' },
          fabric: { type: 'string', example: '240 GSM Super Combed Cotton' },
          isBestseller: { type: 'boolean', example: true },
          isFavourite: { type: 'boolean', example: false },
          image: { type: 'string', example: '/images/products/Black_PDP_1.png' },
          description: { type: 'string', example: 'Heavyweight combed cotton tee with structured drop shoulders.' }
        }
      },
      Order: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'LEO-98421' },
          customerName: { type: 'string', example: 'Rahul Sharma' },
          customerEmail: { type: 'string', example: 'rahul.s@example.com' },
          customerPhone: { type: 'string', example: '9876543210' },
          status: {
            type: 'string',
            enum: ['Placed', 'Pending', 'Confirmed', 'Processing', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'],
            example: 'Delivered'
          },
          orderStatus: { type: 'string', example: 'Delivered' },
          paymentMethod: { type: 'string', example: 'Prepaid UPI (Razorpay)' },
          paymentStatus: { type: 'string', example: 'Paid' },
          subtotal: { type: 'number', example: 1998 },
          discount: { type: 'number', example: 100 },
          shippingFee: { type: 'number', example: 0 },
          totalAmount: { type: 'number', example: 1898 },
          placedAt: { type: 'string', format: 'date-time' },
          shippingAddress: {
            type: 'object',
            properties: {
              fullName: { type: 'string', example: 'Rahul Sharma' },
              addressLine: { type: 'string', example: 'Flat 402, Oakwood Residency, Indiranagar' },
              city: { type: 'string', example: 'Bengaluru' },
              state: { type: 'string', example: 'Karnataka' },
              pincode: { type: 'string', example: '560038' },
              phone: { type: 'string', example: '9876543210' }
            }
          },
          items: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string', example: 'leo-101' },
                title: { type: 'string', example: 'Signature Heavyweight Oversized Tee' },
                color: { type: 'string', example: 'Jet Black' },
                size: { type: 'string', example: 'L' },
                price: { type: 'number', example: 799 },
                quantity: { type: 'integer', example: 1 }
              }
            }
          }
        }
      },
      Banner: {
        type: 'object',
        required: ['title', 'desktopImage'],
        properties: {
          id: { type: 'string', example: 'banner-1' },
          title: { type: 'string', example: '240 GSM HEAVYWEIGHT COLLECTION' },
          subtitle: { type: 'string', example: 'Engineered with Combed Cotton for effortless daily comfort' },
          badge: { type: 'string', example: 'NEW DROP' },
          ctaText: { type: 'string', example: 'SHOP NOW' },
          ctaLink: { type: 'string', example: '/shop' },
          desktopImage: { type: 'string', example: 'https://nobero.com/cdn/shop/files/AW_26_Homepage_Banners_Desktop_jpg.jpg' },
          mobileImage: { type: 'string', example: 'https://nobero.com/cdn/shop/files/AW_26_Homepage_Banners_Desktop_jpg.jpg' },
          active: { type: 'boolean', example: true },
          order: { type: 'integer', example: 1 }
        }
      },
      Coupon: {
        type: 'object',
        required: ['code', 'type', 'value'],
        properties: {
          code: { type: 'string', example: 'LEO100' },
          type: { type: 'string', enum: ['flat', 'percent', 'percentage'], example: 'flat' },
          value: { type: 'number', example: 100 },
          minOrder: { type: 'number', example: 799 },
          maxDiscount: { type: 'number', example: 500 },
          description: { type: 'string', example: 'Flat ₹100 off on your order above ₹799' },
          active: { type: 'boolean', example: true },
          isFlashSale: { type: 'boolean', example: false },
          usageLimit: { type: 'integer', example: 500 },
          endDate: { type: 'string', example: '2026-11-30' }
        }
      },
      Review: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'rev-1' },
          productId: { type: 'string', example: 'leo-101' },
          productTitle: { type: 'string', example: 'Signature Heavyweight Oversized Tee' },
          customerName: { type: 'string', example: 'Aditya Verma' },
          author: { type: 'string', example: 'Aditya Verma' },
          rating: { type: 'integer', minimum: 1, maximum: 5, example: 5 },
          title: { type: 'string', example: 'Best oversized tee in the Indian market!' },
          comment: { type: 'string', example: 'The 240 GSM weight is real. Holds its shape all day.' },
          verified: { type: 'boolean', example: true },
          status: { type: 'string', enum: ['approved', 'pending', 'rejected'], example: 'approved' },
          brandReply: { type: 'string', example: 'Thank you for choosing LEO!' },
          date: { type: 'string', example: '2026-10-28' }
        }
      },
      Blog: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'blog-1' },
          title: { type: 'string', example: 'How to Style Oversized T-Shirts: The Complete Guide' },
          slug: { type: 'string', example: 'how-to-style-oversized-tees' },
          category: { type: 'string', example: 'Style Guide' },
          author: { type: 'string', example: 'LEO Editorial' },
          readTime: { type: 'string', example: '4 min read' },
          date: { type: 'string', example: 'October 28, 2026' },
          coverImage: { type: 'string', example: '/images/leo/mood_street.jpg' },
          excerpt: { type: 'string', example: 'Why 240 GSM heavyweight cotton drape defines modern streetwear proportions.' },
          content: { type: 'string', example: 'Full article body content...' }
        }
      }
    }
  },
  paths: {
    // ==================== PRODUCTS ====================
    '/api/products': {
      get: {
        tags: ['Products'],
        summary: 'List all Men\'s products with optional search, category & sort filters',
        parameters: [
          { name: 'category', in: 'query', schema: { type: 'string' }, description: 'Category slug (e.g. `oversized-tees`, `polos`, `hoodies`, `joggers`, `co-ords`)' },
          { name: 'filter', in: 'query', schema: { type: 'string', enum: ['bestseller', 'favourite'] }, description: 'Filter by badge' },
          { name: 'search', in: 'query', schema: { type: 'string' }, description: 'Search keyword across title, SKU, subtitle, and category' },
          { name: 'sort', in: 'query', schema: { type: 'string', enum: ['price-low', 'price-high', 'rating'] }, description: 'Sort order' }
        ],
        responses: {
          200: {
            description: 'Array of product objects',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    total: { type: 'integer', example: 1461 },
                    data: { type: 'array', items: { $ref: '#/components/schemas/Product' } }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['Products'],
        summary: 'Create a new Men\'s product',
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ProductInput' }
            }
          }
        },
        responses: {
          201: {
            description: 'Product created successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: { $ref: '#/components/schemas/Product' }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/api/products/{idOrSlug}': {
      get: {
        tags: ['Products'],
        summary: 'Get a single product by ID or URL slug',
        parameters: [
          { name: 'idOrSlug', in: 'path', required: true, schema: { type: 'string' }, example: 'leo-101' }
        ],
        responses: {
          200: { description: 'Product details + 4 related products' },
          404: { description: 'Product not found' }
        }
      },
      put: {
        tags: ['Products'],
        summary: 'Update an existing product by ID',
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'idOrSlug', in: 'path', required: true, schema: { type: 'string' }, example: 'leo-101' }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ProductInput' }
            }
          }
        },
        responses: {
          200: { description: 'Product updated successfully' },
          404: { description: 'Product not found' }
        }
      },
      delete: {
        tags: ['Products'],
        summary: 'Delete a product by ID',
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'idOrSlug', in: 'path', required: true, schema: { type: 'string' }, example: 'leo-101' }
        ],
        responses: {
          200: { description: 'Product deleted successfully' }
        }
      }
    },

    // ==================== ORDERS ====================
    '/api/orders': {
      get: {
        tags: ['Orders'],
        summary: 'List all customer orders',
        security: [{ BearerAuth: [] }],
        responses: {
          200: {
            description: 'List of orders',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: { type: 'array', items: { $ref: '#/components/schemas/Order' } }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['Orders'],
        summary: 'Create / place a new customer order',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Order' }
            }
          }
        },
        responses: {
          201: { description: 'Order placed and tracking initialized' }
        }
      }
    },
    '/api/orders/{id}': {
      get: {
        tags: ['Orders'],
        summary: 'Get order details & 5-step tracking status by Order ID',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' }, example: 'LEO-98421' }
        ],
        responses: {
          200: { description: 'Order details found' },
          404: { description: 'Order ID not found' }
        }
      },
      put: {
        tags: ['Orders'],
        summary: 'Update full order details',
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Order' }
            }
          }
        },
        responses: {
          200: { description: 'Order updated' },
          404: { description: 'Order not found' }
        }
      },
      delete: {
        tags: ['Orders'],
        summary: 'Delete an order by ID',
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
        ],
        responses: {
          200: { description: 'Order deleted' }
        }
      }
    },
    '/api/orders/{id}/status': {
      patch: {
        tags: ['Orders'],
        summary: 'Update order fulfillment status',
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' }, example: 'LEO-98421' }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['status'],
                properties: {
                  status: {
                    type: 'string',
                    enum: ['Pending', 'Confirmed', 'Processing', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'],
                    example: 'Shipped'
                  }
                }
              }
            }
          }
        },
        responses: {
          200: { description: 'Order status updated' },
          404: { description: 'Order not found' }
        }
      }
    },

    // ==================== BANNERS ====================
    '/api/banners': {
      get: {
        tags: ['Banners'],
        summary: 'List homepage promotional hero banners',
        responses: {
          200: {
            description: 'Array of hero banners',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: { type: 'array', items: { $ref: '#/components/schemas/Banner' } }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['Banners'],
        summary: 'Create a new homepage hero banner slide',
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Banner' }
            }
          }
        },
        responses: {
          201: { description: 'Hero banner created' }
        }
      }
    },
    '/api/banners/{id}': {
      put: {
        tags: ['Banners'],
        summary: 'Update an existing hero banner slide',
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Banner' }
            }
          }
        },
        responses: {
          200: { description: 'Banner updated' }
        }
      },
      delete: {
        tags: ['Banners'],
        summary: 'Delete a hero banner slide by ID',
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
        ],
        responses: {
          200: { description: 'Banner deleted' }
        }
      }
    },

    // ==================== COUPONS ====================
    '/api/coupons': {
      get: {
        tags: ['Coupons'],
        summary: 'List all promotional discount coupons',
        responses: {
          200: {
            description: 'Array of coupons',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: { type: 'array', items: { $ref: '#/components/schemas/Coupon' } }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['Coupons'],
        summary: 'Create a new promotional coupon code',
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Coupon' }
            }
          }
        },
        responses: {
          201: { description: 'Coupon created' }
        }
      }
    },
    '/api/coupons/validate': {
      post: {
        tags: ['Coupons'],
        summary: 'Validate a coupon code against an order subtotal',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['code', 'orderAmount'],
                properties: {
                  code: { type: 'string', example: 'LEO100' },
                  orderAmount: { type: 'number', example: 1599 }
                }
              }
            }
          }
        },
        responses: {
          200: { description: 'Coupon valid, returns calculated discountAmount' },
          400: { description: 'Invalid coupon or minimum order requirement not met' }
        }
      }
    },
    '/api/coupons/{code}': {
      put: {
        tags: ['Coupons'],
        summary: 'Update an existing coupon by code',
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'code', in: 'path', required: true, schema: { type: 'string' }, example: 'LEO100' }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Coupon' }
            }
          }
        },
        responses: {
          200: { description: 'Coupon updated' }
        }
      },
      delete: {
        tags: ['Coupons'],
        summary: 'Delete a coupon by code',
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'code', in: 'path', required: true, schema: { type: 'string' }, example: 'LEO100' }
        ],
        responses: {
          200: { description: 'Coupon deleted' }
        }
      }
    },

    // ==================== REVIEWS ====================
    '/api/reviews': {
      get: {
        tags: ['Reviews'],
        summary: 'List customer reviews (optional filter by status or productId)',
        parameters: [
          { name: 'status', in: 'query', schema: { type: 'string', enum: ['approved', 'pending', 'rejected'] } },
          { name: 'productId', in: 'query', schema: { type: 'string' } }
        ],
        responses: {
          200: { description: 'List of customer reviews' }
        }
      },
      post: {
        tags: ['Reviews'],
        summary: 'Submit a new customer review',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Review' }
            }
          }
        },
        responses: {
          201: { description: 'Review created' }
        }
      }
    },
    '/api/reviews/{id}/status': {
      patch: {
        tags: ['Reviews'],
        summary: 'Approve, reject, or reply to a customer review',
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: { type: 'string', enum: ['approved', 'pending', 'rejected'], example: 'approved' },
                  brandReply: { type: 'string', example: 'Thank you for your feedback!' }
                }
              }
            }
          }
        },
        responses: {
          200: { description: 'Review moderation status updated' }
        }
      }
    },
    '/api/reviews/{id}': {
      delete: {
        tags: ['Reviews'],
        summary: 'Delete a customer review by ID',
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
        ],
        responses: {
          200: { description: 'Review deleted' }
        }
      }
    },

    // ==================== BLOGS & CMS ====================
    '/api/blogs': {
      get: {
        tags: ['Blogs & CMS'],
        summary: 'List all LEO Journal editorial articles',
        responses: {
          200: { description: 'Array of blog articles' }
        }
      },
      post: {
        tags: ['Blogs & CMS'],
        summary: 'Create a new LEO Journal blog article',
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Blog' }
            }
          }
        },
        responses: {
          201: { description: 'Blog article created' }
        }
      }
    },
    '/api/blogs/{slug}': {
      get: {
        tags: ['Blogs & CMS'],
        summary: 'Get a single blog article by slug or ID',
        parameters: [
          { name: 'slug', in: 'path', required: true, schema: { type: 'string' } }
        ],
        responses: {
          200: { description: 'Blog article found' },
          404: { description: 'Article not found' }
        }
      },
      put: {
        tags: ['Blogs & CMS'],
        summary: 'Update a blog article by ID or slug',
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'slug', in: 'path', required: true, schema: { type: 'string' } }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Blog' }
            }
          }
        },
        responses: {
          200: { description: 'Blog updated' }
        }
      },
      delete: {
        tags: ['Blogs & CMS'],
        summary: 'Delete a blog article by ID or slug',
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'slug', in: 'path', required: true, schema: { type: 'string' } }
        ],
        responses: {
          200: { description: 'Blog deleted' }
        }
      }
    },
    '/api/cms': {
      get: {
        tags: ['Blogs & CMS'],
        summary: 'Get storefront CMS configuration (ribbons, headlines, policies, FAQs)',
        responses: {
          200: { description: 'CMS configuration object' }
        }
      },
      put: {
        tags: ['Blogs & CMS'],
        summary: 'Update storefront CMS configuration',
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { type: 'object' }
            }
          }
        },
        responses: {
          200: { description: 'CMS configuration saved' }
        }
      }
    },

    // ==================== CATEGORIES & COLLECTIONS ====================
    '/api/categories': {
      get: {
        tags: ['Categories & Collections'],
        summary: 'Get navigation categories & mega-menu hierarchy',
        responses: {
          200: { description: 'Categories array' }
        }
      },
      post: {
        tags: ['Categories & Collections'],
        summary: 'Create a new category',
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name'],
                properties: {
                  id: { type: 'string', example: 'linen-shirts' },
                  name: { type: 'string', example: 'Linen Shirts' },
                  slug: { type: 'string', example: 'linen-shirts' },
                  image: { type: 'string', example: '/images/collections/col_shirts.png' }
                }
              }
            }
          }
        },
        responses: {
          201: { description: 'Category created' }
        }
      }
    },
    '/api/collections': {
      get: {
        tags: ['Categories & Collections'],
        summary: 'List curated Men\'s collections & seasonal drops',
        responses: {
          200: { description: 'Collections array' }
        }
      },
      post: {
        tags: ['Categories & Collections'],
        summary: 'Create a new curated collection',
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name'],
                properties: {
                  name: { type: 'string', example: 'Monsoon Travel Drop' },
                  slug: { type: 'string', example: 'monsoon-travel-drop' },
                  type: { type: 'string', example: 'Seasonal' },
                  rule: { type: 'string', example: 'Water-repellent joggers & hoodies' }
                }
              }
            }
          }
        },
        responses: {
          201: { description: 'Collection created' }
        }
      }
    },
    '/api/collections/{id}': {
      delete: {
        tags: ['Categories & Collections'],
        summary: 'Delete a collection by ID',
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
        ],
        responses: {
          200: { description: 'Collection deleted' }
        }
      }
    },

    // ==================== LOOKS ====================
    '/api/looks': {
      get: {
        tags: ['Looks'],
        summary: 'List all "Shop The Full Look" curated outfit bundles',
        responses: {
          200: { description: 'Array of curated outfit looks' }
        }
      }
    },
    '/api/looks/{id}': {
      get: {
        tags: ['Looks'],
        summary: 'Get a single curated outfit bundle by ID or slug',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' }, example: 'forest-trail-look' }
        ],
        responses: {
          200: { description: 'Look bundle details' },
          404: { description: 'Look not found' }
        }
      }
    },

    // ==================== OPERATIONS & CRM ====================
    '/api/customers': {
      get: {
        tags: ['Operations & CRM'],
        summary: 'List CRM customer profiles & lifetime value metrics',
        responses: { 200: { description: 'Customers list' } }
      },
      post: {
        tags: ['Operations & CRM'],
        summary: 'Create a new customer profile',
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object' } } } },
        responses: { 201: { description: 'Customer created' } }
      }
    },
    '/api/returns': {
      get: {
        tags: ['Operations & CRM'],
        summary: 'List return & refund RMA requests',
        responses: { 200: { description: 'Returns list' } }
      },
      patch: {
        tags: ['Operations & CRM'],
        summary: 'Update return status & refund decision',
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object' } } } },
        responses: { 200: { description: 'Return updated' } }
      }
    },

    // ==================== ANALYTICS & UTILITIES ====================
    '/api/analytics': {
      get: {
        tags: ['Analytics & Utilities'],
        summary: 'Get Executive Dashboard KPIs, revenue, AOV & 7-day sales velocity',
        responses: {
          200: {
            description: 'Analytics KPI payload',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: {
                      type: 'object',
                      properties: {
                        totalRevenue: { type: 'number', example: 385898 },
                        totalOrders: { type: 'integer', example: 421 },
                        averageOrderValue: { type: 'number', example: 917 },
                        conversionRate: { type: 'string', example: '4.12%' },
                        activeUsersLive: { type: 'integer', example: 58 }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/api/pincode/check': {
      post: {
        tags: ['Analytics & Utilities'],
        summary: 'Check 6-digit Indian pincode delivery serviceability & estimated date',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['pincode'],
                properties: {
                  pincode: { type: 'string', example: '560038' }
                }
              }
            }
          }
        },
        responses: {
          200: { description: 'Serviceable pincode with estimated delivery date' },
          400: { description: 'Invalid 6-digit pincode' }
        }
      }
    }
  }
};

export function renderSwaggerHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>LEO Enterprise API — Swagger Documentation</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.17.14/swagger-ui.css" />
  <style>
    body { margin: 0; background: #F8FAFC; font-family: Inter, -apple-system, BlinkMacSystemFont, sans-serif; }
    .leo-swagger-topbar {
      background: #0B1120;
      border-bottom: 2px solid #dec562;
      padding: 12px 28px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #fff;
    }
    .leo-brand {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      color: #fff;
    }
    .leo-brand img {
      width: 42px;
      height: 42px;
      border-radius: 9999px;
      border: none;
      object-fit: cover;
      background: #000;
    }
    .leo-brand-title {
      font-family: 'Cinzel', Georgia, serif;
      font-size: 20px;
      font-weight: 800;
      letter-spacing: 0.22em;
      color: #fff;
      line-height: 1;
    }
    .leo-brand-sub {
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.22em;
      color: #dec562;
      margin-top: 3px;
      display: block;
    }
    .leo-nav-links {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .leo-nav-links a {
      font-size: 12px;
      font-weight: 700;
      padding: 7px 14px;
      border-radius: 8px;
      text-decoration: none;
      transition: all 0.15s ease;
    }
    .btn-gold {
      background: #dec562;
      color: #0f142b;
    }
    .btn-outline {
      border: 1px solid #334155;
      color: #e2e8f0;
      background: #1e293b;
    }
    .swagger-ui .topbar { display: none; }
  </style>
</head>
<body>
  <div class="leo-swagger-topbar">
    <a href="http://localhost:3000/admin" class="leo-brand">
      <img src="/images/logo (1).png" alt="LEO Emblem" onerror="this.style.display='none'" />
      <div>
        <div class="leo-brand-title">LEO</div>
        <span class="leo-brand-sub">OPENAPI 3.0 • SWAGGER DOCUMENTATION</span>
      </div>
    </a>
    <div class="leo-nav-links">
      <a href="/api-docs.json" target="_blank" class="btn-outline">OpenAPI JSON Spec</a>
      <a href="http://localhost:3000/admin" class="btn-gold">← Back to Admin Dashboard</a>
    </div>
  </div>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5.17.14/swagger-ui-bundle.js"></script>
  <script src="https://unpkg.com/swagger-ui-dist@5.17.14/swagger-ui-standalone-preset.js"></script>
  <script>
    window.onload = function() {
      window.ui = SwaggerUIBundle({
        url: '/api-docs.json',
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        layout: 'BaseLayout',
        docExpansion: 'list',
        defaultModelsExpandDepth: 1,
        persistAuthorization: true
      });
    };
  </script>
</body>
</html>`;
}

