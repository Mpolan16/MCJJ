import LanguageTranslatorV3 from 'ibm-watson/language-translator/v3';
import { IamAuthenticator } from 'ibm-watson/auth';

function translator() {
    const languageTranslator = new LanguageTranslatorV3({
        version: '2019-10-10',
        authenticator: new IamAuthenticator({
            apikey: 'w21SiM-5F1V7RXLQxPIuA0DwUHCEm-s2eOEMM9EeZiSB',
        }),
        url: 'https://api.us-east.language-translator.watson.cloud.ibm.com',
    });

    const translateParams = {
        text: 'Hello, how are you today?',
        modelId: 'en-es',
    };

    languageTranslator.translate(translateParams)
        .then(translationResult => {
            console.log(JSON.stringify(translationResult, null, 2));
        })
        .catch(err => {
            console.log('error:', err);
        });
}


export default translator