import Genders from './Genders'

export default ApiUtils = {
    processApiResponse: function(body, inLanguage) {
        const innerBody = body[0].hits[0];

        let translations = innerBody.roms[0].arabs.flatMap(arab => arab.translations.map(translation => ({
            front: translation.source.replace(/<[^>]*>?/g, ''),
            back: translation.target.replace(/<[^>]*>?/g, '')
           })));
        
        const wordclass = innerBody.roms[0].wordclass;

        let gender = null;

        if (wordclass === "noun") {
            translations = translations.map(translation => ({
                front: translation.front,
                back: ApiUtils.removeGenderEnding(translation.back),
                gender: ApiUtils.extractNounGender(translation.back)
            }))
        }

        const potentialSentences = translations
                                    .filter(translation => translation.back.split(/([\s]+)/g).length > 1)
                                    .map(translation => translation.back)

        translations.sort((a, b) => a.back.length - b.back.length)

           return {
            translations,
            wordclass,
            potentialSentences   
        }
    },
    extractNounGender(value) {
        if (value.endsWith(" f")) {
            return Genders.FEMININE;
        }
        if (value.endsWith(" m")) {
            return Genders.MASCULINE
        }
        if (value.endsWith(" nt")) {
            return Genders.NEUTRAL
        }
        return Genders.UNDEFINED
    },
    removeGenderEnding(value) {
        if (value.endsWith(" f") || value.endsWith(" m")) {
            return value.substring(0, value.length - 2)
        }
        if (value.endsWith(" nt")) {
            return value.substring(0, value.length - 3)
        }
        return value;
    }
}