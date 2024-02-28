// api.js

const BASE_URL = 'http://localhost:8080/api/v1';

export async function fetchAvailableInterests() {
  try {
    const response = await fetch(`${BASE_URL}/interests`);
    if (response.ok) {
      const data = await response.json();
      return data.data;
    }
  } catch (error) {
    console.error('Error fetching available interests:', error);
    throw error;
  }
}

export async function fetchAgeRanges() {
    try {
      const response = await fetch(`${BASE_URL}/ageRanges`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching age ranges:', error);
      throw error;
    }
  }
  
  export async function fetchRelationships() {
    try {
      const response = await fetch(`${BASE_URL}/relationships`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching relationships:', error);
      throw error;
    }
  }

  export async function fetchEventTypes() {
    try {
      const response = await fetch(`${BASE_URL}/eventTypes`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching event types:', error);
      throw error;
    }
  }
