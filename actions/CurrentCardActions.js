export const SET_TRANSLATED_WORD = "SET_TRANSLATED_WORD";
export const SET_API_RESPONSE = "SET_API_RESPONSE";
export const SET_CHOSEN_CARD = "SET_CHOSEN_CARD";
export const SET_IMAGE = "SET_IMAGE";
export const SET_EXAMPLE_SENTENCE = "SET_EXAMPLE_SENTENCE";


export function setTranslatedWord(value) {
    return {
        type: SET_TRANSLATED_WORD,
        value
    }
}

export function setApiResponse(value) {
    return {
        type: SET_API_RESPONSE,
        value
    }
}

export function setChosenCard(value) {
    return {
        type: SET_CHOSEN_CARD,
        value
    }
}

export function setImage(value) {
    return {
        type: SET_IMAGE,
        value
    }
}

export function setExampleSentence(value) {
    return {
        type: SET_EXAMPLE_SENTENCE,
        value
    }
}