// main.js
console.log("Ae Test Page Loaded");
let counter = 0;
document.querySelector('button').addEventListener('click', function() {
    console.log('Button was clicked!');
    alert('Button Clicked!');
    let element = document.getElementById('content');
    element.style.backgroundColor = element.style.backgroundColor === 'lightblue' ? 'lightgreen' : 'lightblue';
    counter++;
    element.innerHTML = `Content changed! (${counter})`;
    console.log(`Button clicked ${counter} times`);
});