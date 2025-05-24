const apiEndpoint = import.meta.env.VITE_API_BASE_URL; 

const slugify = (title) =>
  title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

export default {apiEndpoint, slugify};