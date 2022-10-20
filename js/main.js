"use strict";

// API
/**
 * Create an unique hash code
 * @returns string
 */
function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

const API_URL = "http://localhost:3000/students";

const edit = document.querySelector("#edit");
const form = document.querySelector("#dataForm");
const formEdit = document.querySelector("#formEdit");
const studentList = document.querySelector(".students__list");

/**
 * Build the list fecthing the data from the server url.
 */
function showList() {
  fetch(API_URL).then((response) => {
    response.json().then((data) => {
      const listHtml = data
        .map(
          (student) =>
            `<div class="student">
              <p><span class="bold">ID:</span>${student.id}</p>
              <p><span class="bold">Name:</span>${student.name}</p>
              <p><span class="bold">Surname:</span>${student.surname}</p>
              <p><span class="bold">Register:</span>${student.register}</p>
            </div>`
        )
        .join("");

      studentList.innerHTML = listHtml;
    });
  });
}

showList();
