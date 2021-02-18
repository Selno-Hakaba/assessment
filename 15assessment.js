var inputName = document.getElementById('name');
var assessmentButton = document.getElementById('assessment');
var resultArea = document.getElementById('result-area');
var tweetArea = document.getElementById('tweet-button');

const assessment =[
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています'
]

/**入力した内容が返り値になる関数
 * @param {string} userName
 * @return {string}
 */
function resultText(userName) {
    // 名前の文字を整数値に変換し、その合計値を出す
    let sumOfName = 0;
    for (let i = 0; i < userName.length; i++) {
        sumOfName = sumOfName + userName.charCodeAt(i);
    }
    let index = sumOfName % assessment.length;
    let result = assessment[index];
    result = result.replace(/\{userName\}/g, userName); // str.replace(/正規表現/g, 置換後の文字列);

    return result
}

/** 指定した要素の子要素をすべて削除する関数
 * @param {html element} element
 */
function removeAllChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

assessmentButton.onclick = () => {

    removeAllChildren(resultArea);
    removeAllChildren(tweetArea);
    const userName = inputName.value;
    if (userName.length === 0) {
        return;
    }

    const header = document.createElement('h3');
    header.innerText = "診断結果";
    resultArea.appendChild(header);

    const paragraph = document.createElement('p');
    paragraph.innerText = resultText(userName);
    resultArea.appendChild(paragraph);

    const anchor = document.createElement('a');
    const hrefvalue = 
        "https://twitter.com/intent/tweet?button_hashtag=" + encodeURIComponent("あなたのいいところ")+"&ref_src=twsrc%5Etfw";
    
    anchor.className = "twitter-hashtag-button";
    anchor.setAttribute('data-text', resultText(userName));
    anchor.setAttribute('data-show-count', "false");
    anchor.setAttribute('href', hrefvalue);
    anchor.innerText =  "ツイート #あなたのいいところ";
    tweetArea.appendChild(anchor);
    
    const script = document.createElement("script");
    script.setAttribute("async", "");
    script.setAttribute('src', "https://platform.twitter.com/widgets.js");
    tweetArea.appendChild(script);
}

console.assert(
    resultText('太郎') === "太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。",
    "usernameを、入力された名前に書き替えるところが間違っています"
);
console.assert(
    resultText('太郎') === resultText("太郎"),
    "同じ名前でも違う結果になっています"
);
