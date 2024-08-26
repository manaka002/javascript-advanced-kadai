// 変数の初期化
let untyped = '';
let typed = '';
let score = 0;
let timerId; // タイマーのIDを保存する変数

// 必要なHTML要素の取得
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');
const typedCount = document.getElementById('typedCount'); // タイプ数を表示する要素

// カウントを保持する変数
let currentTypedCount = 0;

// 複数のテキストを格納する配列
const textLists = [
  'Hello World', 'This is my App', 'How are you?',
  'Today is sunny', 'I love JavaScript!', 'Good morning',
  'I am Japanese', 'Let it be', 'Samurai',
  'Typing Game', 'Information Technology',
  'I want to be a programmer', 'What day is today?',
  'I want to build a web app', 'Nice to meet you',
  'Chrome Firefox Edge Safari', 'machine learning',
  'Brendan Eich', 'John Resig', 'React Vue Angular',
  'Netscape Communications', 'undefined null NaN',
  'Thank you very much', 'Google Apple Facebook Amazon',
  'ECMAScript', 'console.log', 'for while if switch',
  'var let const', 'Windows Mac Linux iOS Android',
  'programming'
];

// ランダムなテキストを表示
const createText = () => {
  typed = '';
  typedfield.textContent = '';

  let random = Math.floor(Math.random() * textLists.length);
  untyped = textLists[random];
  untypedfield.textContent = untyped;

  // 問題文が変わるたびにカウントのリセットを防ぐために不要
  // currentTypedCount は保持され、リセットされない
};

// キー入力の判定
const keyPress = e => {
  if (e.key !== untyped.substring(0, 1)) {
    wrap.classList.add('mistyped');
    setTimeout(() => {
      wrap.classList.remove('mistyped');
    }, 100);
    return;
  }

  score++;
  typed += untyped.substring(0, 1);
  untyped = untyped.substring(1);
  typedfield.textContent = typed;
  untypedfield.textContent = untyped;

  // タイプ数を更新
  currentTypedCount++;
  typedCount.textContent = currentTypedCount;

  if (untyped === '') {
    createText(); // 新しいテキストを表示
  }
};

// タイピングスキルのランクを判定
const rankCheck = score => {
  let text = '';
  
  if (score < 100) {
    text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
  } else if (score < 200) {
    text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;    
  } else if (score < 300) {
    text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;    
  } else if (score >= 300) {
    text = `あなたのランクはSです。\nおめでとうございます!`;    
  }

  return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};

// ゲームを終了
const gameOver = () => {
  clearInterval(timerId); // タイマーを停止
  untypedfield.textContent = ''; // 問題文を消す
  typedfield.textContent = ''; // 正タイプした文字列も消す
  typedCount.textContent = ''; // タイプ数も消す
  count.textContent = ''; // カウントも消す

  // ゲーム終了後に結果を表示
  const result = confirm(rankCheck(score));

  if (result == true) {
    window.location.reload();
  }
};

// カウントダウンタイマー
const timer = () => {
  let time = parseInt(count.textContent, 10); // 現在の時間を数値として取得

  timerId = setInterval(() => {
    time--;
    count.textContent = time;

    if (time <= 0) {
      gameOver(); // タイマーが0になったらゲーム終了
    }
  }, 1000);
};

// ゲームスタート時の処理
start.addEventListener('click', () => {
  currentTypedCount = 0; // ゲームスタート時にカウントをリセット
  typedCount.textContent = currentTypedCount; // 初期表示を更新

  timer(); // タイマー開始
  createText(); // 初期テキストを表示
  start.style.display = 'none'; // スタートボタンを非表示にする
  document.addEventListener('keypress', keyPress); // キーボードイベントを追加
});

untypedfield.textContent = 'スタートボタンで開始';
