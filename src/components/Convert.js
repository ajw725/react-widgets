import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiKey = 'REDACTED';

const Convert = ({ language, text }) => {
  const [output, setOutput] = useState('');
  const [debouncedText, setDebouncedText] = useState(text);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedText(text);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [text]);

  useEffect(() => {
    const doTranslation = async () => {
      const { data } = await axios.post(
        'https://translation.googleapis.com/language/translate/v2',
        {},
        {
          params: {
            q: debouncedText,
            target: language.value,
            format: 'text',
            source: 'en',
            key: apiKey
          }
        }
      );

      setOutput(data.data.translations[0].translatedText);
    };

    doTranslation();
  }, [language, debouncedText]);

  return (
    <div>
      <h1 className="ui header">{output}</h1>
    </div>
  );
};

export default Convert;