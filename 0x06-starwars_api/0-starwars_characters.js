#!/usr/bin/node

const request = require('request');

const id = process.argv[2] + '/';
const url = 'https://swapi-api.hbtn.io/api/films/';

request(url + id, async function (err, res, body) {
  if (err) {
    return console.error(err);
  }

  const listUrl = JSON.parse(body).characters;

  // Iterate over each character URL
  for (const li of listUrl) {
    try {
      // Using a Promise with async/await to handle the request and logging the name
      const character = await new Promise((resolve, reject) => {
        request(li, function (err, res, body) {
          if (err) {
            reject(err); // Reject the promise if an error occurs
          } else {
            resolve(JSON.parse(body).name); // Resolve with the character name
          }
        });
      });
      console.log(character); // Output the character's name
    } catch (err) {
      console.error(err); // Handle any errors from the request
    }
  }
});
