// const dice = document.querySelector('.cb01');
// const rollButton = document.getElementById('rollButton');

// const cbrtt = [
//     'rotateX(-10deg) rotateY(-10deg) rotateZ(0deg)', // 1の面
//     'rotateX(-10deg) rotateY(80deg) rotateZ(0deg)', // 2の面
//     'rotateX(80deg) rotateY(0deg) rotateZ(10deg)', // 3の面
//     'rotateX(-100deg) rotateY(0deg) rotateZ(-10deg)', // 4の面
//     'rotateX(-10deg) rotateY(-100deg) rotateZ(0deg)', // 5の面
//     'rotateX(-10deg) rotateY(170deg) rotateZ(0deg)' // 6の面
// ];

// rollButton.addEventListener('click', () => {
//     dice.style.transition = 'transform 1.5s ease-in-out';
//     dice.style.transform = 'rotateX(' + (800 + 200 * Math.random()) + 'deg) rotateY(' + (50 + 100 * Math.random()) + 'deg) rotateZ(' + (50 + 100 * Math.random()) + 'deg)';

//     setTimeout(() => {
//         dice.style.transition = 'none';
//         dice.style.transform = cbrtt[Math.floor(Math.random() * 6)];
//     }, 1500);
// });
// document.addEventListener('DOMContentLoaded', function () {
//     const rollButton = document.getElementById('rollButton');
//     const dice1 = document.getElementById('dice1');
//     const dice2 = document.getElementById('dice2');
//     const dice3 = document.getElementById('dice3');
//     const totalDisplay = document.getElementById('total');

//     const betTypeSelect = document.getElementById('betType');
//     const betButton = document.getElementById('betButton');
//     const resultDisplay = document.getElementById('result'); // 結果表示用の要素

//     betButton.addEventListener('click', function () {
//         const betType = betTypeSelect.value;
//         let prediction = '';

//         if (betType === 'big') {
//             prediction = '大';
//         } else if (betType === 'small') {
//             prediction = '小';
//         } else {
//             prediction = 'ゾロ目';
//         }



//     rollButton.addEventListener('click', function () {
//         const result1 = rollDice();
//         const result2 = rollDice();
//         const result3 = rollDice();

       

//         const total = result1 + result2 + result3;
//         totalDisplay.textContent = '合計: ' + result1 + ' + ' + result2 + ' + ' + result3 + ' = ' + total;

 
        
//         let result = '';

//         if (result1 === result2 && result2 === result3) {
//             result = 'ゾロ目';
//             totalDisplay.textContent += ' (ゾロ目)';
//         } else if (total >= 11) {
//             result = '大';
//             totalDisplay.textContent += ' (大)';
//         } else {
//             result = '小';
//             totalDisplay.textContent += ' (小)';
//         }

//         if (prediction === result) {
//             resultDisplay.textContent = '予想的中！';
//         } else {
//             resultDisplay.textContent = '予想はずれ...';
//         }

//         // rollButtonのイベントリスナーを削除（連続でサイコロが振られるのを防ぐ）
//         rollButton.replaceWith(rollButton.cloneNode(true));
//     }, { once: true });
// });

//     function rollDice() {
//         return Math.floor(Math.random() * 6) + 1;
//     }
// });


// // IDが"myDiv"の要素を取得
// const myDiv = document.getElementById('myDiv');

// // 取得した要素のテキストを変更
// myDiv.innerHTML = '<p>テキストが変更されました！</p>';

// // 取得した要素のスタイルを変更
// myDiv.style.backgroundColor = 'lightblue';


document.addEventListener('DOMContentLoaded', function () {

    const cbrtt = [
        'rotateX(-10deg) rotateY(-10deg) rotateZ(0deg)',
        'rotateX(-10deg) rotateY(-100deg) rotateZ(0deg)',
        'rotateX(-100deg) rotateY(0deg) rotateZ(-10deg)',
        'rotateX(80deg) rotateY(0deg) rotateZ(10deg)',
        'rotateX(-10deg) rotateY(80deg) rotateZ(0deg)',
        'rotateX(-10deg) rotateY(170deg) rotateZ(0deg)'
    ];

    // セレクトボックスの値の保存
    let betType = '';
    let prediction = '';

    const rollButton = document.querySelector('#rollButton');
    const sound = document.querySelector('#sound'); // 音声要素を取得
    const cbid = document.querySelector('.cb01');
    const cb = document.querySelector('.cb07');
    const c = document.querySelector('.cb013');
    const betTypeSelect = document.querySelector('#betTypeSelect');
    const betButton = document.querySelector('.betButton');
    const totalDisplay = document.querySelector('#total');
    const resultDisplay = document.querySelector('#result');
    const trueImage = document.querySelector('#trueImage');
    const falseImage = document.querySelector('#falseImage');

    // サイコロの回転と結果表示
    rollButton.addEventListener('click', function (e) {
        e.preventDefault();

        if (betType === '') {
            alert("予想を選択してください");
            return;
        }

        // 音声を再生
        sound.currentTime = 0;
        sound.play();

        const result1 = rollDice(); // cbid の数を決定
        const result2 = rollDice(); // cb の数を決定
        const result3 = rollDice(); // c の数を決定

        console.log(result1, result2, result3);

        rollDiceAnimation(cbid, result1);
        rollDiceAnimation(cb, result2);
        rollDiceAnimation(c, result3);

        setTimeout(() => {
            // 結果の計算と表示
            const total = result1 + result2 + result3;
            totalDisplay.textContent = `合計: ${result1} + ${result2} + ${result3} = ${total}`;

            let result = '';
            if (result1 === result2 && result2 === result3) {
                result = 'ゾロ目';
                totalDisplay.textContent += ' [ゾロ目]';
            } else if (total >= 11) {
                result = '大';
                totalDisplay.textContent += ' [大]';
            } else {
                result = '小';
                totalDisplay.textContent += ' [小]';
            }

            if (prediction === result) {
                resultDisplay.textContent = '予想的中！';
                resultDisplay.style.color = 'white';
                resultDisplay.style.backgroundColor = 'red';
             
               
                if (trueImage) {
                    trueImage.src = 'S__35405832.jpg';
                    trueImage.style.display = 'block';
                }
                if (falseImage) {
                    falseImage.style.display = 'none';
                }
              
            } else {
                resultDisplay.textContent = '予想はずれ...';
                resultDisplay.style.color = 'white';
                resultDisplay.style.backgroundColor = 'blue';
              
                if (trueImage) {
                    trueImage.style.display = 'none';
                }
                if (falseImage) {
                    falseImage.src = 'S__35348489 2.jpg';
                    falseImage.style.display = 'block';
                }
            }
        }, 1500);
    });

    // 賭けの処理
    betButton.addEventListener('click', function () {

        betType = betTypeSelect.value;

        if (betType === '') {
            alert("予想を選択してください");
            return;
        } else if (betType === 'big') {
            prediction = '大';
        } else if (betType === 'small') {
            prediction = '小';
        } else {
            prediction = 'ゾロ目';
        }

        alert(`「${prediction}」が選択されました`);
    });

    // サイコロの回転アニメーション
    const rollDiceAnimation = (element, number) => {
        element.style.transform = `rotateX(${800 + 200 * Math.random()}deg) rotateY(${50 + 100 * Math.random()}deg) rotateZ(${50 + 100 * Math.random()}deg)`;
        setTimeout(() => {
            element.style.transform = cbrtt[Math.floor(number - 1)];
        }, 1500);
    };

    function rollDice() {
        return Math.floor(Math.random() * 6) + 1;
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const onemoretimeButton = document.getElementById('onemoretime');
    onemoretimeButton.addEventListener('click', function () {
        // リロード前にスタイルを変更
        onemoretimeButton.style.backgroundColor = 'red';
        onemoretimeButton.style.color = 'white';
        window.scrollTo(0, 0); // ページの先頭にスクロール
        window.location.reload();
    });
});