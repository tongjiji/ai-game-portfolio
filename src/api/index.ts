const BASE_URL = '/api';

export const api = {
  profile: {
    get: async () => {
      return fetch(`${BASE_URL}/profile`).then(res => res.json());
    },
    update: async (data: any) => {
      return fetch(`${BASE_URL}/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(res => res.json());
    },
  },
  works: {
    get: async (id?: string) => {
      return fetch(`${BASE_URL}/works${id ? '/' + id : ''}`).then(res => res.json());
    },
    create: async (data: any) => {
      return fetch(`${BASE_URL}/works`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(res => res.json());
    },
    update: async (id: string, data: any) => {
      return fetch(`${BASE_URL}/works/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(res => res.json());
    },
    delete: async (id: string) => {
      return fetch(`${BASE_URL}/works/${id}`, {
        method: 'DELETE',
      }).then(res => res.json());
    },
  },
  skills: {
    get: async () => {
      return fetch(`${BASE_URL}/skills`).then(res => res.json());
    },
    create: async (data: any) => {
      return fetch(`${BASE_URL}/skills`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(res => res.json());
    },
    update: async (name: string, data: any) => {
      return fetch(`${BASE_URL}/skills/${name}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(res => res.json());
    },
    delete: async (name: string) => {
      return fetch(`${BASE_URL}/skills/${name}`, {
        method: 'DELETE',
      }).then(res => res.json());
    },
  },
  experiences: {
    get: async () => {
      return fetch(`${BASE_URL}/experiences`).then(res => res.json());
    },
    create: async (data: any) => {
      return fetch(`${BASE_URL}/experiences`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(res => res.json());
    },
    update: async (company: string, data: any) => {
      return fetch(`${BASE_URL}/experiences/${company}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(res => res.json());
    },
    delete: async (company: string) => {
      return fetch(`${BASE_URL}/experiences/${company}`, {
        method: 'DELETE',
      }).then(res => res.json());
    },
  },
  education: {
    get: async () => {
      return fetch(`${BASE_URL}/education`).then(res => res.json());
    },
    create: async (data: any) => {
      return fetch(`${BASE_URL}/education`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(res => res.json());
    },
    update: async (school: string, data: any) => {
      return fetch(`${BASE_URL}/education/${school}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(res => res.json());
    },
    delete: async (school: string) => {
      return fetch(`${BASE_URL}/education/${school}`, {
        method: 'DELETE',
      }).then(res => res.json());
    },
  },
  projects: {
    get: async () => {
      return fetch(`${BASE_URL}/projects`).then(res => res.json());
    },
    create: async (data: any) => {
      return fetch(`${BASE_URL}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(res => res.json());
    },
    update: async (title: string, data: any) => {
      return fetch(`${BASE_URL}/projects/${title}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(res => res.json());
    },
    delete: async (title: string) => {
      return fetch(`${BASE_URL}/projects/${title}`, {
        method: 'DELETE',
      }).then(res => res.json());
    },
  },
  demos: {
    get: async () => {
      return fetch(`${BASE_URL}/demos`).then(res => res.json());
    },
    create: async (data: any) => {
      return fetch(`${BASE_URL}/demos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(res => res.json());
    },
    update: async (name: string, data: any) => {
      return fetch(`${BASE_URL}/demos/${name}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(res => res.json());
    },
    delete: async (name: string) => {
      return fetch(`${BASE_URL}/demos/${name}`, {
        method: 'DELETE',
      }).then(res => res.json());
    },
  },
  contact: {
    get: async () => {
      return fetch(`${BASE_URL}/contact`).then(res => res.json());
    },
    update: async (data: any) => {
      return fetch(`${BASE_URL}/contact`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(res => res.json());
    },
  },
  upload: {
    single: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      return fetch(`${BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
      }).then(res => res.json());
    },
    delete: async (filename: string) => {
      return fetch(`${BASE_URL}/uploads/${filename}`, {
        method: 'DELETE',
      }).then(res => res.json());
    },
  },
};
