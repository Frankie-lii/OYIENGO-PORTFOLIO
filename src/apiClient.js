// Mock API client - Replace with your actual API implementation
const createMockClient = () => {
  return {
    entities: {
      Project: {
        list: async (sort) => [],
        create: async (data) => {},
        delete: async (id) => {}
      },
      Testimonial: {
        list: async (sort) => [],
        create: async (data) => {},
        delete: async (id) => {}
      },
      Certification: {
        list: async (sort) => [],
        create: async (data) => {},
        delete: async (id) => {}
      }
    },
    auth: {
      me: async () => ({ id: 'user', role: 'user' }),
      logout: () => window.location.href = '/',
      redirectToLogin: () => window.location.href = '/login'
    },
    integrations: {
      Core: {
        UploadFile: async ({ file }) => ({ file_url: URL.createObjectURL(file) })
      }
    }
  };
};

export const apiClient = createMockClient();
