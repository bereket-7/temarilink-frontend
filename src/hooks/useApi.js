import { useState, useEffect, useCallback } from 'react';
import apiClient from '../api/client';

export const useApi = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get(url, options);
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    if (url) {
      fetchData();
    }
  }, [fetchData, url]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
};

export const useMutation = (url, options = {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = useCallback(async (data, method = 'post') => {
    try {
      setLoading(true);
      setError(null);
      
      let response;
      if (method === 'post') {
        response = await apiClient.post(url, data, options);
      } else if (method === 'put') {
        response = await apiClient.put(url, data, options);
      } else if (method === 'delete') {
        response = await apiClient.delete(url, options);
      }
      
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  return { mutate, loading, error };
};
