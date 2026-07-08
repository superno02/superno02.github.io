// Resume content data — the ONLY file to edit when updating content.
// Privacy rule: no phone / address / LINE ID / age. Email + LinkedIn only.
const RESUME_DATA = {
  about: {
    name: "Ant",
    title: "iOS App 開發工程師",
    level: 11, // total years of experience
    location: "新北市",
    intro:
      "10 年以上 iOS 開發經驗，擅長 Swift 與 MVVM 架構，" +
      "曾為兩間公司制定開發規範、建立共用模組加速團隊協作。" +
      "重度遊戲愛好者——所以這份履歷長這樣。",
  },
  skills: [
    { name: "Swift", level: 9, desc: "主力語言，多專案並行開發" },
    { name: "Objective-C", level: 8, desc: "維護與 Swift 混編經驗豐富" },
    { name: "MVVM 架構", level: 8, desc: "曾為兩間公司制定開發規範" },
    { name: "CocoaPods 模組化", level: 8, desc: "遠端共用模組，加速多人協作" },
    { name: "Git / GitLab", level: 8, desc: "版本控制與團隊協作" },
    { name: "Java / C / C++", level: 5, desc: "次要語言" },
    { name: "Cocos Creator / JS", level: 5, desc: "遊戲開發經驗" },
    { name: "Photoshop / Illustrator", level: 6, desc: "影像處理，可自製 UI 素材" },
  ],
  experience: [
    { company: "SeekTop", role: "iOS 工程師", period: "2022/8 – 2024/5",
      desc: "多專案同時開發與維護（體育、聊天、直播、錢包）。建立遠端共用 CocoaPods 模組、制定 MVVM 開發規範。" },
    { company: "小米網路科技", role: "iOS 工程師", period: "2021/5 – 2022/7",
      desc: "短時間快速開發新專案並制定框架（2 人團隊）。功能涵蓋遊戲、聊天與直播。" },
    { company: "新商豪華", role: "iOS 工程師", period: "2020/8 – 2021/4",
      desc: "產品開發。" },
    { company: "點點點行銷", role: "iOS 工程師", period: "2020/3 – 2020/7",
      desc: "既有產品維護與新產品開發（App Store 上架）。" },
    { company: "傲勝遊戲", role: "遊戲工程師", period: "2019/9 – 2019/10",
      desc: "Cocos Creator + JavaScript 遊戲開發。" },
    { company: "德義資訊", role: "軟體工程師", period: "2018/4 – 2019/5",
      desc: "客戶端駐點工程師。" },
    { company: "好玩家", role: "軟體工程師", period: "2015/2 – 2018/4",
      desc: "iOS 與 Android 開發，兼任 SA / SD / TPM / PM，帶領 4 人以下團隊。" },
    { company: "五百戶科技", role: "iOS 助理工程師", period: "2014/4 – 2015/2",
      desc: "iOS 開發起點。" },
  ],
  contact: {
    email: "superno02@hotmail.com",
    emailFlavor: "召喚信鴿",
    linkedin: "https://www.linkedin.com/in/%E5%AE%8F%E7%9B%8A-%E9%A1%8F-0a3931133/",
    linkedinFlavor: "冒險者公會檔案",
  },
};
