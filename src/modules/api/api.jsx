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

  export async function fetchGiftsRateSuggestions(ageRangeId, interests) {
    try {
      const response = await fetch("http://localhost:8080/api/v1/giftsRates/suggestions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          age_range: ageRangeId,
          interests: interests,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Error al obtener las sugerencias de tarifas de regalo");
      }
  
      const data = await response.json();
      return data.data; // Retorna los datos de las sugerencias de tarifas de regalo
    } catch (error) {
      console.error("Error fetching gifts rate suggestions:", error);
      return null;
    }
  }
  
  
export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
