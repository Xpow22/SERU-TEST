import axios from 'axios';

const baseURL = 'https://www.emsifa.com/api-wilayah-indonesia/api/';

const api = axios.create({
  baseURL,
});

export const getProvinces = async () => {
  try {
    const response = await api.get('provinces.json');
    return response.data;
  } catch (error) {
    console.error('Error fetching provinces:', error);
    throw error;
  }
};

export const getCitiesByProvince = async (provinceId: number) => {
  try {
    const response = await api.get(`regencies/${provinceId}.json`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching cities for province ${provinceId}:`, error);
    throw error;
  }
};

export const getDistrictsByCity = async (regencyId: number) => {
  try {
    const response = await api.get(`districts/${regencyId}.json`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching districts for city ${regencyId}:`, error);
    throw error;
  }
};

export const getSubdistrictsByDistrict = async (districtId: number) => {
  try {
    const response = await api.get(`villages/${districtId}.json`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching subdistricts for district ${districtId}:`, error);
    throw error;
  }
};
