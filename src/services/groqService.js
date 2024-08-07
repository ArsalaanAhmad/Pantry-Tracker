import axios from 'axios';

export const getRecipeSuggestions = async (items) => {
  try {
    const response = await fetch('../../pages/api/groqService.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data from AI');
    }

    const data = await response.json();
    return data.choices[0].message.content.split('\n').filter(Boolean); // Assuming response contains message content
  } catch (error) {
    console.error('Error getting suggestions:', error);
    return [];
  }
};