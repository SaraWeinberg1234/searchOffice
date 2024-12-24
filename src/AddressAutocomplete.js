import React, { useState } from 'react';
import axios from 'axios';
import styles from './FillingForm.module.css';
const AddressAutocomplete = ({ onLocationSelect }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const fetchSuggestions = async (query) => {
        if (query.length < 3) {//מתבצעת קריאה רק מאורך של 3 אותיות ומעלה
            setSuggestions([]);
            return;
        }
        try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {//מתבצעת קריאה לשרת כשבכל פעם הוא מביא 5 נתונים מקסימום
                params: {
                    format: 'json',
                    q: query,
                    limit: 5,
                },
            });
            setSuggestions(response.data);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };

    const handleSelect = (suggestion) => {
        setQuery(suggestion.display_name);
        setSuggestions([]);
        onLocationSelect(suggestion);
    };

    return (
        <div style={{ marginBottom: "20px" }}>
            <input
                className={styles.inputField}
                type="text"//אינפוט להקלדת הכתובת
                placeholder="הקלד כתובת"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);//הכנסת הערך של החיפוש ושליחה לפונקציה
                    fetchSuggestions(e.target.value);
                }}
               
            />
            {suggestions.length > 0 && (
                <ul style={{ border: "1px solid #ccc", padding: "0", listStyleType: "none", maxHeight: "200px", overflowY: "auto" }}>
                    {suggestions.map((suggestion, index) => (//הצגת התוצאות וקיראה לפונקציה בעת בחירת כתובת
                        <li
                            key={index}
                            onClick={() => handleSelect(suggestion)}
                            style={{ padding: "10px", cursor: "pointer", borderBottom: "1px solid #ddd" }}
                        >
                            {suggestion.display_name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AddressAutocomplete;
