"use strict";

addEventListener("load", onLoad);

// -----------------------------------------------
// helper functions for the executed code above

function onLoad() {
  //----------------------------------
  // set flex container properties
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
  // changing and displaying flex item properties to flex items
  //----------------------------------
  document
    .querySelectorAll(".flex-container > *")
    .forEach(addClickEventListenerToFlexItem);

  //----------------------------------
  // adding and removing flex items
  //----------------------------------
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

  //--------------------------------------------
  // Interface to custom CSS properties on the ":root" element
  //--------------------------------------------

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
  // Helper functions for custom CSS properties manipulation

  function CSSProperties(element) {
    function getProperty(propertyName) {
      return getComputedStyle(element).getPropertyValue(propertyName);
    }
    function setProperty(propertyName, propertyValue) {
      element.style.setProperty(propertyName, propertyValue);
    }

    return { getProperty: getProperty, setProperty: setProperty };
  }

  // --------------------------------------------------
  // Helper functions for adding and removing flex item properties to flex items

  function addClickEventListenerToFlexItem(flexItem, index) {
    // Note that this needs to be a toggle event listener.
    // Each time you click on a flex item it toggles whether or not the flex item properties are applied.
    flexItem.addEventListener("click", createToggleFlexItemAttributes(++index));

    //--------------------------------------------
    // when hovering over a flex item display its flex item properties and associated values
    //--------------------------------------------
    document
      .querySelector(".flex-item-basis:nth-child(" + index + ")")
      .addEventListener("mouseover", updateContents);
    // --------------------------------------------------
    // The helper functions for the executable code above

    function createToggleFlexItemAttributes(flexItemIndex) {
      var defaultAttributesSet = true;

      return toggleFlexItemAttributes;

      // --------------------------------------------------
      // The helper functions for the executable code above

      function toggleFlexItemAttributes() {
        if (defaultAttributesSet) {
          // change flex CSS custom properties for this flex item to the selected values
          cssGlobalProperties.setProperty(
            "--flex-basis-" + flexItemIndex,
            document.querySelector("#flex-basis").value
          );
          cssGlobalProperties.setProperty(
            "--flex-grow-" + flexItemIndex,
            document.querySelector("#flex-grow").value
          );
          cssGlobalProperties.setProperty(
            "--flex-shrink-" + flexItemIndex,
            document.querySelector("#flex-shrink").value
          );
          // TODO: using the hover pseudo class indicate the values that the flex items currently have
        } else {
          // change flex CSS custom properties for this flex item to the defaults
          cssGlobalProperties.setProperty(
            "--flex-basis-" + flexItemIndex,
            "auto"
          );
          cssGlobalProperties.setProperty("--flex-grow-" + flexItemIndex, 0);
          cssGlobalProperties.setProperty("--flex-shrink-" + flexItemIndex, 1);
        }
        defaultAttributesSet = !defaultAttributesSet;
      }
    }

    function updateContents() {
      // TODO: show the grow and shrink attributes and values with <br /> elements in between
      document.querySelector(
        ".flex-item-basis:nth-child(" + index + ") div"
      ).innerHTML =
        "flex-basis: " +
        cssGlobalProperties.getProperty("--flex-basis-" + index);
    }
  }
}
