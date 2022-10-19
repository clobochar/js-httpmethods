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

const studentUrl = "http://localhost:3000/students";
const ul = document.querySelector(".students__list");
const form = document.getElementById("dataForm");

/**
 * Get all data from the Server
 * @param url string
 */
const getData = async (url) => {
  let response = await fetch(url);
  let data = await response.json();
  return data;
};

/**
 * Print the list of element got from server
 * @param element - HTMLElement
 * @param items - Array
 */
const printList = async (element, items) => {
  element.innerHTML = "";
  let data = [];
  data = await items;

  for (let i = 0; i < data.length; i++) {
    element.innerHTML += `
		<li>
		<div class="student">
			<p><span class="bold">ID: </span>${data[i].id}</p>
			<p><span class="bold">Name: </span>${data[i].name}</p>
			<p><span class="bold">Surname: </span>${data[i].surname}</p>
			<p><span class="bold">Register: </span>${data[i].register}</p>
			<button class="btn-delete" onclick="deleteElement('${data[i].id}')">Delete</button>
		</div>
	</li>
		`;
  }
};

/**
 * Get data from the Form and send them to the server
 */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Creates a new object that conintains all the data from the form
  const prePayload = new FormData(form);
  prePayload.append("id", uuidv4());
  const payload = new URLSearchParams(prePayload);

  fetch(studentUrl, {
    method: "POST",
    body: payload,
  }).then((res) => {
    // if the post has not succesfull throw and error
    if (!res.ok) {
      throw new Error("Failed to post");
    }
    // if the post is succesfull the page will be updates
    printList(ul, getData(studentUrl));
    return res.json();
  });
});

function deleteElement(id) {
  const deleteUrl = `${studentUrl}/${id}`;
  fetch(deleteUrl, {
    method: "DELETE",
  }).then((res) => {
    // if the post has not succesfull throw and error
    if (!res.ok) {
      throw new Error("Failed to delete");
    }
    // if the delete is succesfull remove line
  });
}

/**
 * On page load all the data are retrieved
 */
window.onload = printList(ul, getData(studentUrl));
