import Axios from "axios";

const rickAndMorthyCharactersApiUrl =
  "https://rickandmortyapi.com/api/character/";

function getCharacters(page) {
  return Axios.get(
    page == 1
      ? rickAndMorthyCharactersApiUrl
      : rickAndMorthyCharactersApiUrl + "?page=" + page
  ).then((response) => {
    return response.data;
  });
}

function getCharacterData(characterId) {
  var characterUrl = rickAndMorthyCharactersApiUrl + characterId;

  return Axios.get(characterUrl).then((response) => {
    return response.data;
  });
}

export { getCharacters, getCharacterData };
