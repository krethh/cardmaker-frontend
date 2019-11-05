export default ApiUtils = {
    processApiResponse: function(body, inLanguage) {
        const innerBody = body[0].hits[0];

        const translations = innerBody.roms[0].arabs[0].translations.map(translation => ({
            front: translation.source.replace(/<[^>]*>?/g, ''),
            back: translation.target.replace(/<[^>]*>?/g, '')
           }));

           return {
            translations,
            wordclass: innerBody.roms[0].wordclass
            
        }
    }
}