export const companyProfile = {
  company_profile: {
    company_name: 'ブライアントラスト',
    company_name_en: 'Brian Trust Co., Ltd.',
    head_office: {
      postal_code: '100-0011',
      address: '東京都千代田区内幸町2-1-6',
      building: 'WeWork日比谷パークフロント 19F',
    },
    contact: {
      tel: '070-1356-0922',
      email: 'briantrust.contact@gmail.com',
      website: 'https://briantrust.co.jp',
    },
    management: {
      ceo: '山田 太郎 (代表取締役)',
      coo: '鈴木 一郎 (取締役)',
    },
    establishment_date: '2026年5月14日',
    capital: '10,000,000円',
    number_of_employees: 300,
    business_summary: [
      '次世代ITソリューションの開発およびコンサルティング',
      'WEBアプリケーション・モバイルアプリの企画・開発・運営',
      'アグリテック（農業IT）システムの開発およびデータ分析',
      '人材紹介およびアウトソーシング事業',
    ],
    main_banks: [
      '埼玉りそな銀行 大宮西口支店',
      '三菱UFJ銀行 大宮駅前支店',
    ],
    fiscal_year_end: '3月',
  },
}

/** @type {{ imagePath: string; title: string; description: string; link: string }[]} */
export const aboutItems = [
  {
    imagePath: '/img/ceo-face.png',
    title: '代表メッセージ',
    description:
      '私たちは、プログラム開発・建設・輸送という3つの専門領域を軸に事業を展開するプロフェッショナル集団です。',
    link: '#',
  },
  {
    imagePath: '/img/office.webp',
    title: '会社概要',
    description:
      '所在地・沿革・体制などの概要をここに記載します。必要に応じて別ページへリンクしてください。',
    link: '#corporate-profile',
  },
]
