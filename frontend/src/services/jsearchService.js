import axios from "axios";

const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
const RAPIDAPI_HOST = "jsearch.p.rapidapi.com";

const jsearchApi = axios.create({
  baseURL: "https://jsearch.p.rapidapi.com",
  timeout: 10000,
  headers: {
    "x-rapidapi-host": RAPIDAPI_HOST,
    "x-rapidapi-key": RAPIDAPI_KEY,
  },
});

/**
 * Search for jobs using the JSearch API.
 * @param {string} query - Job title / role to search for
 * @param {object} options - Additional search options
 * @param {string} [options.location] - Location to search in
 * @param {number} [options.page] - Page number (1-100)
 * @param {string} [options.datePosted] - "all" | "today" | "3days" | "week" | "month"
 * @param {string} [options.employmentType] - Comma-delimited: FULLTIME,PARTTIME,CONTRACTOR,INTERN
 * @param {boolean} [options.remoteOnly] - Filter to remote jobs only
 * @returns {Promise<{ jobs: Array, totalCount: number }>}
 */
export async function searchJobs(query, options = {}) {
  const {
    location = "",
    page = 1,
    datePosted = "all",
    employmentType = "",
    remoteOnly = false,
    jobRequirements = "",
  } = options;

  // Build the full query string — combine role + location
  const fullQuery = location
    ? `${query} in ${location}`
    : query;

  const params = {
    query: fullQuery,
    page: String(page),
    num_pages: "1",
    date_posted: datePosted,
  };

  if (employmentType) {
    params.employment_types = employmentType;
  }

  if (remoteOnly) {
    params.remote_jobs_only = "true";
  }

  if (jobRequirements) {
    params.job_requirements = jobRequirements;
  }

  const response = await jsearchApi.get("/search", { params });

  return {
    jobs: response.data?.data || [],
    totalCount: response.data?.data?.length || 0,
    status: response.data?.status,
  };
}

export default jsearchApi;
