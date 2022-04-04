"use strict";

addEventListener("load", onLoad);

// -----------------------------------------------
// helper functions for the executed code above

function onLoad() {
  //----------------------------------
  // flex container properties
  //----------------------------------
  // attach a 'change' event listener to the "flex wrap" select element.
  if (document.querySelector("#flex-wrap")) {
    document
      .querySelector("#flex-wrap")
      .addEventListener(
        "change",
        createChangePropertyEventListener("--flex-wrap")
      );
  }

  // attach a 'change' event listener to the "flex direction" select element.
  if (document.querySelector("#flex-direction")) {
    document
      .querySelector("#flex-direction")
      .addEventListener(
        "change",
        createChangePropertyEventListener("--flex-direction")
      );
  }

  //----------------------------------
  // flex item properties
  //----------------------------------
  // attach a 'change' event listener to the "flex-grow" textbox element.
  if (document.querySelector("#flex-grow")) {
    document
      .querySelector("#flex-grow")
      .addEventListener(
        "change",
        createChangePropertyEventListener("--flex-grow")
      );
  }

  // attach a 'change' event listener to the "flex-shrink" textbox element.
  if (document.querySelector("#flex-shrink")) {
    document
      .querySelector("#flex-shrink")
      .addEventListener(
        "change",
        createChangePropertyEventListener("--flex-shrink")
      );
  }

  // attach a 'change' event listener to the "flex-basis" textbox element.
  if (document.querySelector("#flex-basis")) {
    document
      .querySelector("#flex-basis")
      .addEventListener(
        "change",
        createChangePropertyEventListener("--flex-basis")
      );
  }

  // attach a 'click' event listener to the "add-flex-item" button.
  if (document.querySelector(".add-flex-item")) {
    document
      .querySelector(".add-flex-item")
      .addEventListener("click", addFlexItem);
  }

  // attach a 'click' event listener to the "remove-flex-items" button.
  if (document.querySelector(".remove-flex-items")) {
    document
      .querySelector(".remove-flex-items")
      .addEventListener("click", removeFlexItems);
  }

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
      return getComputedStyle(element).getPropertyValue(propertyName);
    }
    function setProperty(propertyName, propertyValue) {
      element.style.setProperty(propertyName, propertyValue);
    }

    return { getProperty: getProperty, setProperty: setProperty };
  }
}
