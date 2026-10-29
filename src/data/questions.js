export const questions = [
  {
    id: 1,
    text: "友達に送ったメッセージの返信がなかなか来ない。どうする？",
    options: [
      { text: "過去のやり取りを何度も読み返す。", type: "overthinking" },
      {
        text: "嫌な思いをさせたか相手の気持ちが気になる。",
        type: "people_pleasing",
      },
      {
        text: "気になるけれど、いったん別のことをする。",
        type: "procrastination",
      },
      { text: "送る前に文章を何度も確認したくなる。", type: "perfectionism" },
      { text: "返信を待つ間、好きなことに夢中になる。", type: "hyperfocus" },
    ],
  },
  {
    id: 2,
    text: "やっと自由な休日。あなたはどう過ごす？",
    options: [
      { text: "その日の気分で予定を変える。", type: "emotional" },
      { text: "誰かと過ごすか一人で過ごすか迷う。", type: "distance_control" },
      { text: "予定を決めず、自分のペースで過ごす。", type: "easygoing" },
      { text: "好きな趣味に何時間も夢中になる。", type: "hyperfocus" },
      { text: "気になることを調べ続けてしまう。", type: "overthinking" },
    ],
  },
  {
    id: 3,
    text: "自分のちょっとした失敗に気づいたときは？",
    options: [
      { text: "その場面を何度も思い出して考える。", type: "overthinking" },
      { text: "相手にどう思われたか気になって謝る。", type: "people_pleasing" },
      { text: "対応はあとで考えようと思う。", type: "procrastination" },
      { text: "悔しさが表情や態度に出てしまう。", type: "emotional" },
      { text: "次は失敗しないよう細かく確認する。", type: "perfectionism" },
    ],
  },
  {
    id: 4,
    text: "締め切りのある作業を任された。どうする？",
    options: [
      { text: "まだ時間があると思って後回しにする。", type: "procrastination" },
      { text: "自分のペースで少しずつ進める。", type: "easygoing" },
      {
        text: "細部まで気になり、なかなか完成できない。",
        type: "perfectionism",
      },
      { text: "夢中になって休憩を忘れてしまう。", type: "hyperfocus" },
      {
        text: "周りと相談しながら、無理のない進め方を調整する。",
        type: "distance_control",
      },
    ],
  },
  {
    id: 5,
    text: "誰かから「ちょっと相談したい」と言われたら？",
    options: [
      {
        text: "自分の予定を後回しにして力になろうとする。",
        type: "people_pleasing",
      },
      { text: "気持ちが表情や言葉に出やすい。", type: "emotional" },
      { text: "返事や対応をあとで考えようと思う。", type: "procrastination" },
      { text: "どこまで踏み込むか慎重に考える。", type: "distance_control" },
      { text: "無理せず、自分にできる範囲で話を聞く。", type: "easygoing" },
    ],
  },
  {
    id: 6,
    text: "グループで何かを決めるとき、あなたは？",
    options: [
      { text: "みんなが納得できるように調整する。", type: "people_pleasing" },
      { text: "自分の気持ちが表情や言葉に出る。", type: "emotional" },
      { text: "細かいところまで決めておきたい。", type: "perfectionism" },
      { text: "急がず自然に決まるのを待つ。", type: "easygoing" },
      { text: "みんなの反応を気にして考え込む。", type: "overthinking" },
    ],
  },
  {
    id: 7,
    text: "最近、気になっていることがある。どうなる？",
    options: [
      { text: "同じことを頭の中で何度も考える。", type: "overthinking" },
      { text: "自分より周りの人のことが気になる。", type: "people_pleasing" },
      {
        text: "一人でいたい日と人に会いたい日の差が大きい。",
        type: "distance_control",
      },
      { text: "興味のあること以外が目に入らなくなる。", type: "hyperfocus" },
      { text: "気分によって気になる度合いが変わる。", type: "emotional" },
    ],
  },
  {
    id: 8,
    text: "新しいことに挑戦するとき、あなたは？",
    options: [
      { text: "失敗しないように事前に準備する。", type: "perfectionism" },
      { text: "その日の気分や勢いでやる気が変わる。", type: "emotional" },
      { text: "自分に合った方法とペースで進める。", type: "easygoing" },
      { text: "人との距離感を考えて迷う。", type: "distance_control" },
      {
        text: "始めるタイミングを決められず、つい後回しになる。",
        type: "procrastination",
      },
    ],
  },
  {
    id: 9,
    text: "夜、布団に入ってから考えがちなことは？",
    options: [
      { text: "今日の会話を振り返り、反省する。", type: "overthinking" },
      {
        text: "誰かに嫌な思いをさせていないか気になる。",
        type: "people_pleasing",
      },
      {
        text: "明日やることを「明日でいいか」と考える。",
        type: "procrastination",
      },
      { text: "好きなことを調べ続けてしまう。", type: "hyperfocus" },
      {
        text: "明日の準備に漏れがないか確認したくなる。",
        type: "perfectionism",
      },
    ],
  },
  {
    id: 10,
    text: "あなたの行動パターンに一番近いものは？",
    options: [
      { text: "納得するまで細かい部分を見直す。", type: "perfectionism" },
      { text: "好きなことには時間を忘れて集中する。", type: "hyperfocus" },
      { text: "周囲が急いでいても自分のペースを保つ。", type: "easygoing" },
      {
        text: "近づきたいけれど、時には一人になりたい。",
        type: "distance_control",
      },
      { text: "気持ちを隠すつもりでも表情に出てしまう。", type: "emotional" },
    ],
  },
];
