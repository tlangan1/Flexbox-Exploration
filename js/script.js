"use strict";

addEventListener("load", onLoad);

// -----------------------------------------------
// helper functions for the executed code above

function onLoad() {
  // attach a 'change' event listener to the "flex wrap" select element.
  document
    .querySelector("select[name='flex-wrap']")
    .addEventListener(
      "change",
      createChangePropertyEventListener("--flex-wrap")
    );

  // attach a 'change' event listener to the "flex direction" select element.
  document
    .querySelector("select[name='flex-direction']")
    .addEventListener(
      "change",
      createChangePropertyEventListener("--flex-direction")
    );

  document
    .querySelector(".add-flex-item")
    .addEventListener("click", addFlexItem);

  document
    .querySelector(".remove-flex-items")
    .addEventListener("click", removeFlexItems);

  // getProperty usage: cssGlobalProperties.getProperty("--some-property")
  // setProperty usage: cssGlobalProperties.setProperty("--some-property", "2")
  var cssGlobalProperties = CSSProperties(document.querySelector(":root"));

  // --------------------------------------------------
  // The helper functions for the executable code above

  function createChangePropertyEventListener(propertyName) {
    return changeProperty;

    function changeProperty(event) {
      cssGlobalProperties.setProperty(propertyName, event.srcElement.value);
    }
  }

  function addFlexItem(event) {
    var fixed_widthFlexItem = document.createElement("div");
    fixed_widthFlexItem.className += "added-flex-item";
    fixed_widthFlexItem.innerText =
      "pneumonoultramicroscopicsilicovolcanoconiosis is a word!";
    document.querySelector(".flex-wrap").appendChild(fixed_widthFlexItem);
  }

  function removeFlexItems(event) {
    // var x = document.querySelectorAll(".added-flex-item");
    document.querySelectorAll(".added-flex-item").forEach(removeItem);

    // --------------------------------------------------
    // The helper functions for the executable code above

    function removeItem(item) {
      item.remove();
    }
  }

  // --------------------------------------------------
  // The helper functions for the executable code above

  function CSSProperties(element) {
    function getProperty(propertyName) {
      var rs = getComputedStyle(element);
      return rs.getPropertyValue(propertyName);
    }
    function setProperty(propertyName, propertyValue) {
      element.style.setProperty(propertyName, propertyValue);
    }

    return { getProperty: getProperty, setProperty: setProperty };
  }
}
