import "./styles.css";
import * as DataBusiness from "./data-business";
import * as Utils from "./utils";

var currentPage = 1;
var totalPages;

var getPageOfCharacters = (page) => {
  DataBusiness.getCharacters(page).then((data) => {
    totalPages = data.info.pages;
    displayPage(currentPage, totalPages);

    var characters = data.results;
    var characterList = [];
    for (let character of characters) {
      var characterListElement = Utils.createCharacterRow(character);
      characterListElement.onclick = function () {
        displayCharacterDetails(character.id);
      };
      characterList.push(characterListElement);
    }

    for (let characterInList of characterList) {
      document.getElementById("root").append(characterInList);
    }
  });
};

var displayCharacterDetails = (characterId) => {
  DataBusiness.getCharacterData(characterId).then((character) => {
    Utils.showCharacter(character);
  });
};

var displayPage = (page, pages) => {
  document.getElementById("root").innerText = "";
  var navTag = document.getElementById("page");
  navTag.innerText = "Página " + page + " de " + pages;
};

var checkNavigationStatus = () => {
  getPageOfCharacters(currentPage);

  document.getElementById("previousPage").disabled =
    currentPage === 1 ? true : false;
  document.getElementById("nextPage").disabled =
    currentPage === totalPages ? true : false;
};

var handlePreviousClick = () => {
  currentPage--;
  checkNavigationStatus();
};

var handleNextClick = () => {
  currentPage++;
  checkNavigationStatus();
};

checkNavigationStatus();

document
  .getElementById("previousPage")
  .addEventListener("click", handlePreviousClick);
document.getElementById("nextPage").addEventListener("click", handleNextClick);
