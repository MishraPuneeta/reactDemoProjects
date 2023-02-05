import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, TextArea, Button, Icon } from "semantic-ui-react";

export default function Translate() {
  const [inputText, setInputText] = useState("");
  const [detectLanguageKey, setDetecLanguageKey] = useState("");
  const [languagesList, setLanguagesList] = useState([]);
  const [selectedLanguageKey, setLanguageKey] = useState("");
  const [resultText, setResultText] = useState("");

  useEffect(() => {
    axios.get("https://libretranslate.de/languages").then((response) => {
      setLanguagesList(response.data);
    });
  }, []);
  const getLanguageSource = () => {
    axios
      .post(`https://libretranslate.de/detect`, {
        q: inputText,
      })
      .then((response) => {
        setDetecLanguageKey(response.data[0].language);
      });
  };

  const languageKey = (selectedLanguageKey) => {
    setLanguageKey(selectedLanguageKey.target.value);
  };
  const translateText = () => {
    getLanguageSource();
    let data = {
      q: inputText,
      source: detectLanguageKey,
      target: selectedLanguageKey,
    };
    axios.post("https://libretranslate.de/translate", data).then((response) => {
      setResultText(response.data.translatedText);
    });
  };

  return (
    <div>
      <div className="app-header">
        <h2 className="header">Texty Translator</h2>
      </div>
      <div className="app-body">
        <div>
          <Form>
            <Form.Field
              control={TextArea}
              placeholder="Type Text to translate.."
              onChange={(e) => setInputText(e.target.value)}
            />
            <select className="language-slect" onChange={languageKey}>
              <option>Please Select Language..</option>
              {languagesList.map((language) => {
                return <option value={language.code}>{language.name}</option>;
              })}
            </select>
            <Form.Field
              control={TextArea}
              placeholder="Your Result Translation.."
              value={resultText}
            />
            <Button color="orange" size="large" onClick={translateText}>
              <Icon name="translate" />
              Translate
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
