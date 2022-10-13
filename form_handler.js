const form = document.getElementById('form');
var pressedButton;
var checkedCount = 0;


form.addEventListener('click', function (event) {

    if (event.target.type === 'button') {

        pressedButton = event.target;
        for (let i = 0; i < form.length; i++) {
            if (form[i].type === 'button') {
                form[i].style.backgroundColor = '#ffffff';
                form[i].style.color = '#000000';
            }
        }
        //blue
        pressedButton.style.backgroundColor = '#33BCFF';

        console.log("clicked button " + pressedButton.name);
    }
    else if (event.target.type === 'checkbox') {

        if (checkedCount === 0) {
            checkedCount++;
        } else {
            if (!event.target.checked) {
                checkedCount--;
            }
            else {
                event.target.checked = false;
            }
        }
    }
}
)



function checkXcount() {
    var x = document.getElementsByName("X-value");
    var count = 0;
    for (var i = 0; i < x.length; i++) {
        if (x[i].checked) {
            count++;
        }
    }
    if (count === 1) { return count; }

}

function getX() {
    var x = document.getElementsByName("X-value");
    for (var i = 0; i < x.length; i++) {
        if (x[i].checked) {
            return x[i].value;
        }
    }

}



form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (pressedButton === undefined) {
        alert("Выберите R");
        return;
    }
    const r = pressedButton.value;

    let y = document.getElementsByName('Y-value')[0].value;
    y = y.replace(',', '.');
    if (isNaN(y) || y === '' || y < -5 || y > 5) {
        alert("Y должен быть числом в диапазоне (-5;5)");
        return;
    }
    if(y.length>20){
        alert("Слишком много цифр в поле Y!")
        return;
    }
    y = y.replace(/^0+(?!\.|$)/, '');
    if(y.length>10){
        alert("Слишком много цифр после запятой в поле Y!")
        return;
    }

    const x = getX();
    if (checkXcount() !== 1) {
        alert("Выберите X");
        return;
    }

    console.log("x = " + x + " y = " + y + " r = " + r);
    sendAndGetData(x, y, r);



}
)



function sendAndGetData(x, y, r) {
    const request = new XMLHttpRequest();

    request.open('GET', 'checker.php?x=' + x + '&y=' + y + '&r=' + r, true);
    request.send();

    request.onload = function () {
        if (request.status === 200) {
            console.log("response received");
            document.getElementById('table').innerHTML = request.responseText + document.getElementById('table').innerHTML;
        }
    }

}

