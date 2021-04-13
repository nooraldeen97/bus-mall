'use strict';

let divImageElement = document.getElementById('container');

let leftImageElement = document.getElementById('left');
let middleImageElement = document.getElementById('middle');
let rightImageElement = document.getElementById('right');

Product.productsArray = [];

let maxTrials = 25;
let usersTrials = 0;
let count = 0;
let namesArray = [];
let votesArray = [];
let shownArray = [];
let secondShownArray=[];

function Product(name, filePath) {
    this.name = name;
    this.filePath = filePath;
    this.shown = 0;
    this.votes = 0;

    Product.productsArray.push(this)

}

new Product('bag', `img/bag.jpg`);
new Product('banana', `img/banana.jpg`);
new Product('bathroom', `img/bathroom.jpg`);
new Product('boots', `img/boots.jpg`);
new Product('breakfast', `img/breakfast.jpg`);
new Product('bubblegum', `img/bubblegum.jpg`);
new Product('chair', `img/chair.jpg`);
new Product('cthulhu', `img/cthulhu.jpg`);
new Product('dog-duck', `img/dog-duck.jpg`);
new Product('dragon', `img/dragon.jpg`);
new Product('pen', `img/pen.jpg`);
new Product('pet-sweep', `img/pet-sweep.jpg`);
new Product('scissors', `img/scissors.jpg`);
new Product('shark', `img/shark.jpg`);
new Product('sweep', `img/sweep.png`);
new Product('tauntaun', `img/tauntaun.jpg`);
new Product('unicorn', `img/unicorn.jpg`);
new Product('usb', `img/usb.gif`);
new Product('water-can', `img/water-can.jpg`);
new Product('wine-glass', `img/wine-glass.jpg`);


console.log(Product.productsArray);


//declared the idex for three img.

let leftImageIndex;
let middleImageIndex;
let rightImageIndex;


//generate a random index for the three img , and multiply by product array.length : it gives random number from(0 - 20).

// function randonGenerateIndex() {
//     return Math.floor(Math.random() * Product.productsArray.length);
// }

function randonGenerateIndex(){
    
    let random = Math.floor(Math.random() * Product.productsArray.length);
    while (secondShownArray.includes(random)){
        random = Math.floor(Math.random() * Product.productsArray.length);
        
        
    };
    return random;
}


// generate a new random 3 img when the user click on any one ..





function renderThreeImages() {



    // make them equal th the randomGenerateIndex function .

    leftImageIndex = randonGenerateIndex();
    middleImageIndex = randonGenerateIndex();
    rightImageIndex = randonGenerateIndex();


    //make sure that three random index dont equal each other at all .

    while ((leftImageIndex === middleImageIndex) || (leftImageIndex === rightImageIndex) || (middleImageIndex === rightImageIndex)) {
        leftImageIndex = randonGenerateIndex();
        middleImageIndex = randonGenerateIndex();
        rightImageIndex = randonGenerateIndex();

    }
   




    // send the random index which created by the randomGenerateIndex function and stored in the (left, middle and right) to the src to show them in html page . 





    leftImageElement.src = Product.productsArray[leftImageIndex].filePath;
    middleImageElement.src = Product.productsArray[middleImageIndex].filePath;
    rightImageElement.src = Product.productsArray[rightImageIndex].filePath;



    secondShownArray=[];
    secondShownArray.push(leftImageIndex,middleImageIndex,rightImageIndex);
     
    console.log(secondShownArray);
 
}





renderThreeImages();

divImageElement.addEventListener('click', shownInScreen);
function shownInScreen(event) {

    count++;
    if (count <= maxTrials) {
        if (event.target.id == 'left') {
            Product.productsArray[leftImageIndex].shown++;
            Product.productsArray[middleImageIndex].shown++;
            Product.productsArray[rightImageIndex].shown++;


        } else if (event.target.id == 'middle') {
            Product.productsArray[middleImageIndex].shown++;
            Product.productsArray[leftImageIndex].shown++;
            Product.productsArray[rightImageIndex].shown++;



        } else if (event.target.id == 'right') {

            Product.productsArray[rightImageIndex].shown++;
            Product.productsArray[middleImageIndex].shown++;
            Product.productsArray[leftImageIndex].shown++;

        }

    }
}






//handle usres clicking 

divImageElement.addEventListener('click', handleUsersClick);

function handleUsersClick(event) {

    usersTrials++;
    if (usersTrials <= maxTrials) {

        if (event.target.id == 'left') {
            Product.productsArray[leftImageIndex].votes++
        } else if (event.target.id == 'middle') {
            Product.productsArray[middleImageIndex].votes++

        } else if (event.target.id == 'right') {
            Product.productsArray[rightImageIndex].votes++

        }

        renderThreeImages();


    } else {

        for (let j = 0; j < Product.productsArray.length; j++) {

    namesArray.push(Product.productsArray[j].name)
    votesArray.push(Product.productsArray[j].votes);
    shownArray.push(Product.productsArray[j].shown);
        }
        barChart();
    
        
        let ButtonElement = document.getElementById('resultsButton');
        ButtonElement.hidden = false;
        ButtonElement.addEventListener('click', clickToView);
        
        function clickToView(e) {
            
            let list = document.getElementById('resultsList');
            
            for (let i = 0; i < Product.productsArray.length; i++) {
                
                let liElement = document.createElement('li');
                list.appendChild(liElement);
                
                liElement.textContent = `${Product.productsArray[i].name} had ${Product.productsArray[i].votes} votes ,and was seen ${Product.productsArray[i].shown} times .`
                
                
                
            }
            
            
            ButtonElement.removeEventListener('click', clickToView);
            
            
        }
        
        divImageElement.removeEventListener('click', handleUsersClick);
    }
    
}


// console.log( namesArray );
// console.log(votesArray);
// console.log(shownArray);
// barChart();



// chart.js
function barChart() {
    let chartElement = document.getElementById('chart').getContext('2d');

    let myChart = new Chart(chartElement, {
        // what type is the chart
        type: 'bar',

        //  the data for showing
        data: {
            //  for the names
            labels: namesArray,

            datasets: [
                {
                    label: 'products votes',
                    data: votesArray,
                    backgroundColor: [
                        '#51c4d3',
                    ],

                    borderWidth: 1
                },

                {
                    label: 'products shown',
                    data: shownArray,
                    backgroundColor: [
                        '#126e82',
                    ],

                    borderWidth: 1
                }

            ]
        },
        options: {}
    });

}
