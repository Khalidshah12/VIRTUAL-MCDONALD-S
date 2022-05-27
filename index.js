let allItems = document.querySelectorAll("input[type=checkbox]")
let imagarr = [
    "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Big-Mac-1:1-4-product-tile-desktop",
    "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Quarter-Pounder-with-Cheese-1:1-4-product-tile-desktop",
    "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Double-Quarter-Pounder-with-Cheese-1:1-4-product-tile-desktop",
    "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-qpc-deluxe-burger:1-4-product-tile-desktop",
    "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Hamburger:1-4-product-tile-desktop",

    "https://s7d1.scene7.com/is/image/mcdonalds/h-mcdonalds-2-Cheeseburger-Extra-Value-Meals:1-4-product-tile-desktop",
    "https://s7d1.scene7.com/is/image/mcdonalds/h-mcdonalds-Big-Mac-Extra-Value-Meals:1-4-product-tile-desktop",
    "https://s7d1.scene7.com/is/image/mcdonalds/h-mcdonalds-Quarter-Pounder-with-Cheese-Extra-Value-Meals:1-4-product-tile-desktop",
    "https://s7d1.scene7.com/is/image/mcdonalds/h-mcdonalds-Double-Quarter-Pounder-with-Cheese-Extra-Value-Meals-combo:1-4-product-tile-desktop",
    "https://s7d1.scene7.com/is/image/mcdonalds/h-mcdonalds-Chicken-McNuggets-10-piece-Extra-Value-Meals:1-4-product-tile-desktop",

    "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-crispy-chicken-sandwich:1-4-product-tile-desktop",
    "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-spicy-crispy-chicken-sandwich:1-4-product-tile-desktop",
    "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-spicy-crispy-chicken-sandwich:1-4-product-tile-desktop",
    "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-crispy-chicken-sandwich:1-4-product-tile-desktop",
    "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-spicy-crispy-chicken-sandwich:1-4-product-tile-desktop",
]

let menu = []
for (var i = 0; i < allItems.length; i++) {
    let item = {
        name: allItems[i].value,
        avatar: imagarr[i]
    }
    menu.push(item)
}
localStorage.setItem("menu", JSON.stringify(menu))
// console.log(menu)


const orderButton = document.querySelector('#orderFood');
orderButton.addEventListener("click", orderFunc)

function orderFunc() {
    let ordereditems = document.querySelectorAll("input[type=checkbox]:checked")
    let menu = JSON.parse(localStorage.getItem("menu"))
    let food = []

    let time = Math.floor((Math.random() * 4) + 1);
    // console.log(time)
    let count = time

    let mypromise = new Promise(function (resolve, reject) {
        let id = setInterval(function () {
            count--
            const wait = document.querySelector('#wait');
            wait.innerText = (`Your order will be placed in ${count} seconds`)
            if (count == 0) {
                clearInterval(id)
            }
        }, 1000)

        setTimeout(function () {
            menu.map(function (elem) {
                for (var i = 0; i < ordereditems.length; i++) {
                    if (elem.name == ordereditems[i].value) {
                        food.push(elem)
                    }
                }
            })
            if (food.length == 0) {
                reject()
            }
            else {
                resolve()
            }
        }, time * 1000)
    }).then(function (res) {
        // console.log(food)

        let menu = JSON.parse(localStorage.getItem("menu"))

        const container = document.querySelector('#container');
        container.innerHTML = null;

        const appendDiv = document.createElement('div');
        appendDiv.setAttribute('id', 'appendDiv');
        document.querySelector("body").append(appendDiv)

        const orderId = document.createElement('div');
        orderId.setAttribute("id", "orderId")
        orderId.innerText = "Order Id - #" + Math.floor((Math.random() * 50) + 1);

        appendDiv.append(orderId)
        const thanks = document.createElement('h2');
        thanks.setAttribute("class", "thanks")
        thanks.innerText = "Thank you for ordering"
        appendDiv.append(thanks)

        const p = document.createElement('p');
        p.setAttribute("class", "soon")
        p.innerText = "You order will be deliver soon..."
        appendDiv.append(p)

        const yourOrder = document.createElement('h1');
        yourOrder.setAttribute("id", "yourOrder")
        yourOrder.innerText = "Your Orders"
        appendDiv.append(yourOrder)


        const imageDivcontainer = document.createElement('div');
        imageDivcontainer.setAttribute("id", "imageDivcontainer")

        menu.map(function (elem) {
            for (var i = 0; i < ordereditems.length; i++) {
                if (elem.name == ordereditems[i].value) {

                    const imgdiv = document.createElement('imgdiv');
                    imgdiv.setAttribute("id", "imgdiv")

                    const orderimgs = document.createElement('img');
                    orderimgs.setAttribute("class", "orderImg")
                    orderimgs.src = elem.avatar

                    const foodName = document.createElement('h4');
                    foodName.innerText = elem.name

                    imgdiv.append(orderimgs, foodName)
                    imageDivcontainer.append(imgdiv)
                    appendDiv.append(imageDivcontainer)

                }
            }
        })

    }).catch(function (err) {
        alert("Please Select Food")
        const wait = document.querySelector('#wait');
        wait.innerText = null
        console.log("no food ordered")
    })
}



