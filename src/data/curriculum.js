/**
 * ALL learning content lives here. To add a lesson, copy an object and edit it.
 * Exercises are generated automatically from `vocab` + `fill`.
 *
 * vocab: { w: word, sound: Bangla-script pronunciation help, bn: Bangla meaning,
 *          en: simple English definition, ex: example, exBn: example in Bangla }
 * fill:  { q: sentence with ___, a: answer, bn: Bangla hint, d: wrong options (A1/A2 word bank) }
 * bnOptions: true  -> multiple choice uses Bangla meanings (beginner friendly)
 *            false -> multiple choice uses English definitions (immersion)
 */
export const LEVELS = [
  {
    id: 'a1', code: 'A1', name: 'Beginner', nameBn: 'একদম শুরু', bnOptions: true,
    tagline: 'Your very first words and sentences.',
    lessons: [
      {
        id: 'a1-greetings', title: 'Hello and introductions', titleBn: 'অভিবাদন ও পরিচয়',
        intro: 'Greetings are the first step in any conversation. Learn these six words and you can start talking to anyone.',
        introBn: 'যেকোনো কথোপকথনের প্রথম ধাপ হলো অভিবাদন। এই ছয়টি শব্দ শিখলেই আপনি যে কারো সাথে কথা শুরু করতে পারবেন।',
        vocab: [
          { w: 'hello', sound: 'হ্যালো', bn: 'হ্যালো; নমস্কার', en: 'a word you say when you meet someone', ex: 'Hello, how are you?', exBn: 'হ্যালো, আপনি কেমন আছেন?' },
          { w: 'goodbye', sound: 'গুডবাই', bn: 'বিদায়', en: 'a word you say when you leave', ex: 'Goodbye! See you tomorrow.', exBn: 'বিদায়! কাল দেখা হবে।' },
          { w: 'please', sound: 'প্লিজ', bn: 'দয়া করে', en: 'a polite word when you ask for something', ex: 'Water, please.', exBn: 'দয়া করে একটু পানি দিন।' },
          { w: 'thank you', sound: 'থ্যাঙ্ক ইউ', bn: 'ধন্যবাদ', en: 'words you say when someone helps you', ex: 'Thank you for your help.', exBn: 'আপনার সাহায্যের জন্য ধন্যবাদ।' },
          { w: 'sorry', sound: 'সরি', bn: 'দুঃখিত', en: 'a word you say when you make a mistake', ex: 'Sorry, I am late.', exBn: 'দুঃখিত, আমার দেরি হয়েছে।' },
          { w: 'name', sound: 'নেইম', bn: 'নাম', en: 'what people call you', ex: 'My name is Rina.', exBn: 'আমার নাম রিনা।' },
        ],
        fill: [
          { q: 'My ___ is Rina.', a: 'name', bn: 'আমার ___ রিনা।', d: ['hello', 'please'] },
          { q: '___ you for your help.', a: 'Thank', bn: 'আপনার সাহায্যের জন্য ___ ধন্যবাদ।', d: ['Please', 'Sorry'] },
          { q: 'Can I have some water, ___?', a: 'please', bn: 'একটু পানি পেতে পারি, ___?', d: ['sorry', 'goodbye'] },
        ],
      },
      {
        id: 'a1-numbers-colors', title: 'Numbers and colors', titleBn: 'সংখ্যা ও রঙ',
        intro: 'Numbers and colors appear in every day of your life: prices, ages, clothes, traffic lights.',
        introBn: 'দাম, বয়স, জামাকাপড়, ট্রাফিক লাইট — সংখ্যা আর রঙ আমাদের প্রতিদিনের জীবনে আছে।',
        vocab: [
          { w: 'one', sound: 'ওয়ান', bn: 'এক', en: 'the number 1', ex: 'I have one book.', exBn: 'আমার একটি বই আছে।' },
          { w: 'two', sound: 'টু', bn: 'দুই', en: 'the number 2', ex: 'She has two cats.', exBn: 'তার দুটি বিড়াল আছে।' },
          { w: 'three', sound: 'থ্রি', bn: 'তিন', en: 'the number 3', ex: 'I eat three apples.', exBn: 'আমি তিনটি আপেল খাই।' },
          { w: 'red', sound: 'রেড', bn: 'লাল', en: 'the color of blood', ex: 'The apple is red.', exBn: 'আপেলটি লাল।' },
          { w: 'blue', sound: 'ব্লু', bn: 'নীল', en: 'the color of the sky', ex: 'The sky is blue.', exBn: 'আকাশ নীল।' },
          { w: 'green', sound: 'গ্রিন', bn: 'সবুজ', en: 'the color of grass', ex: 'The grass is green.', exBn: 'ঘাস সবুজ।' },
        ],
        fill: [
          { q: 'The sky is ___.', a: 'blue', bn: 'আকাশ ___।', d: ['red', 'green'] },
          { q: 'One plus two is ___.', a: 'three', bn: 'এক যোগ দুই = ___।', d: ['one', 'red'] },
          { q: 'Grass is ___.', a: 'green', bn: 'ঘাস ___।', d: ['blue', 'two'] },
        ],
      },
      {
        id: 'a1-family', title: 'My family', titleBn: 'আমার পরিবার',
        intro: 'Talking about family is one of the most common topics when you meet new people.',
        introBn: 'নতুন মানুষের সাথে পরিচয় হলে পরিবার নিয়ে কথা বলা সবচেয়ে সাধারণ বিষয়গুলোর একটি।',
        vocab: [
          { w: 'mother', sound: 'মাদার', bn: 'মা', en: 'your female parent', ex: 'My mother is kind.', exBn: 'আমার মা দয়ালু।' },
          { w: 'father', sound: 'ফাদার', bn: 'বাবা', en: 'your male parent', ex: 'My father works hard.', exBn: 'আমার বাবা কঠোর পরিশ্রম করেন।' },
          { w: 'brother', sound: 'ব্রাদার', bn: 'ভাই', en: 'a boy with the same parents as you', ex: 'My brother is tall.', exBn: 'আমার ভাই লম্বা।' },
          { w: 'sister', sound: 'সিস্টার', bn: 'বোন', en: 'a girl with the same parents as you', ex: 'My sister likes music.', exBn: 'আমার বোন গান পছন্দ করে।' },
          { w: 'friend', sound: 'ফ্রেন্ড', bn: 'বন্ধু', en: 'a person you like and trust', ex: 'He is my best friend.', exBn: 'সে আমার সেরা বন্ধু।' },
          { w: 'family', sound: 'ফ্যামিলি', bn: 'পরিবার', en: 'parents, children and relatives', ex: 'I love my family.', exBn: 'আমি আমার পরিবারকে ভালোবাসি।' },
        ],
        fill: [
          { q: 'My mother’s daughter is my ___.', a: 'sister', bn: 'আমার মায়ের মেয়ে আমার ___।', d: ['brother', 'father'] },
          { q: 'I live with my ___.', a: 'family', bn: 'আমি আমার ___ সাথে থাকি।', d: ['name', 'green'] },
          { q: 'He is my best ___.', a: 'friend', bn: 'সে আমার সেরা ___।', d: ['mother', 'sister'] },
        ],
      },
    ],
  },
  {
    id: 'a2', code: 'A2', name: 'Elementary', nameBn: 'প্রাথমিক', bnOptions: true,
    tagline: 'Talk about your day and simple needs.',
    lessons: [
      {
        id: 'a2-routine', title: 'Daily routine', titleBn: 'দৈনন্দিন রুটিন',
        intro: 'Describe what you do every day. Words like “usually” tell people how often something happens.',
        introBn: 'আপনি প্রতিদিন কী করেন তা বলতে শিখুন। “usually” এর মতো শব্দ বোঝায় কাজটি কতবার হয়।',
        vocab: [
          { w: 'wake up', sound: 'ওয়েক আপ', bn: 'ঘুম থেকে ওঠা', en: 'to stop sleeping', ex: 'I wake up at six.', exBn: 'আমি ছয়টায় ঘুম থেকে উঠি।' },
          { w: 'breakfast', sound: 'ব্রেকফাস্ট', bn: 'সকালের নাস্তা', en: 'the first meal of the day', ex: 'I eat breakfast at seven.', exBn: 'আমি সাতটায় নাস্তা করি।' },
          { w: 'study', sound: 'স্টাডি', bn: 'পড়াশোনা করা', en: 'to learn from books or lessons', ex: 'I study English every night.', exBn: 'আমি প্রতি রাতে ইংরেজি পড়ি।' },
          { w: 'usually', sound: 'ইউজুয়ালি', bn: 'সাধারণত', en: 'most of the time', ex: 'I usually walk to work.', exBn: 'আমি সাধারণত হেঁটে কাজে যাই।' },
          { w: 'sleep', sound: 'স্লিপ', bn: 'ঘুমানো', en: 'to rest with your eyes closed', ex: 'I sleep at ten.', exBn: 'আমি দশটায় ঘুমাই।' },
        ],
        fill: [
          { q: 'I ___ up at six every morning.', a: 'wake', bn: 'আমি প্রতিদিন সকাল ছয়টায় ঘুম থেকে ___।', d: ['sleep', 'study'] },
          { q: 'I ___ eat breakfast at seven.', a: 'usually', bn: 'আমি ___ সাতটায় নাস্তা করি।', d: ['sleep', 'wake'] },
          { q: 'I go to ___ at ten.', a: 'sleep', bn: 'আমি দশটায় ___ যাই।', d: ['breakfast', 'usually'] },
        ],
      },
      {
        id: 'a2-shopping', title: 'Shopping and food', titleBn: 'কেনাকাটা ও খাবার',
        intro: 'Learn the words you need in a shop or a restaurant.',
        introBn: 'দোকানে বা রেস্টুরেন্টে যেসব শব্দ লাগে, সেগুলো শিখুন।',
        vocab: [
          { w: 'buy', sound: 'বাই', bn: 'কেনা', en: 'to get something by paying money', ex: 'I want to buy a new phone.', exBn: 'আমি একটি নতুন ফোন কিনতে চাই।' },
          { w: 'cost', sound: 'কস্ট', bn: 'দাম হওয়া', en: 'to have a price', ex: 'How much does it cost?', exBn: 'এর দাম কত?' },
          { w: 'cheap', sound: 'চিপ', bn: 'সস্তা', en: 'not costing much money', ex: 'This shirt is cheap.', exBn: 'এই শার্টটি সস্তা।' },
          { w: 'expensive', sound: 'ইক্সপেনসিভ', bn: 'দামি', en: 'costing a lot of money', ex: 'That watch is too expensive.', exBn: 'ওই ঘড়িটি অনেক দামি।' },
          { w: 'order', sound: 'অর্ডার', bn: 'অর্ডার করা', en: 'to ask for food or goods', ex: 'I would like to order pizza.', exBn: 'আমি পিৎজা অর্ডার করতে চাই।' },
        ],
        fill: [
          { q: 'How much does it ___?', a: 'cost', bn: 'এর দাম কত ___?', d: ['buy', 'order'] },
          { q: 'This bag is too ___. I do not have enough money.', a: 'expensive', bn: 'ব্যাগটি খুব ___। আমার যথেষ্ট টাকা নেই।', d: ['cheap', 'usually'] },
          { q: 'I want to ___ a new phone.', a: 'buy', bn: 'আমি একটি নতুন ফোন ___ চাই।', d: ['cost', 'cheap'] },
        ],
      },
    ],
  },
  {
    id: 'b1', code: 'B1', name: 'Intermediate', nameBn: 'মধ্যম', bnOptions: false,
    tagline: 'Handle travel, work and real conversations.',
    lessons: [
      {
        id: 'b1-travel', title: 'Travel', titleBn: 'ভ্রমণ',
        intro: 'These words help you plan trips and solve problems at airports and hotels. Definitions are now in English.',
        introBn: 'ভ্রমণের পরিকল্পনা এবং এয়ারপোর্ট বা হোটেলের সমস্যা সমাধানে এই শব্দগুলো কাজে লাগে। এখন থেকে সংজ্ঞা ইংরেজিতে থাকবে।',
        vocab: [
          { w: 'journey', sound: 'জার্নি', bn: 'যাত্রা', en: 'a long trip from one place to another', ex: 'The journey took five hours.', exBn: 'যাত্রাটি পাঁচ ঘণ্টা লেগেছে।' },
          { w: 'luggage', sound: 'লাগেজ', bn: 'মালপত্র', en: 'bags and suitcases you take on a trip', ex: 'Please keep your luggage with you.', exBn: 'অনুগ্রহ করে মালপত্র সাথে রাখুন।' },
          { w: 'reservation', sound: 'রেজারভেশন', bn: 'রিজার্ভেশন', en: 'an arrangement to keep a seat or room for you', ex: 'I made a reservation at the hotel.', exBn: 'আমি হোটেলে রিজার্ভেশন করেছি।' },
          { w: 'delay', sound: 'ডিলে', bn: 'দেরি', en: 'when something happens later than planned', ex: 'There is a delay of two hours.', exBn: 'দুই ঘণ্টার দেরি হচ্ছে।' },
          { w: 'departure', sound: 'ডিপার্চার', bn: 'প্রস্থান', en: 'the time when a plane, bus or train leaves', ex: 'Departure is at 9:30.', exBn: 'প্রস্থানের সময় ৯:৩০।' },
        ],
        fill: [
          { q: 'Our flight has a two-hour ___.', a: 'delay', bn: 'আমাদের ফ্লাইটে দুই ঘণ্টার ___।' },
          { q: 'I made a hotel ___ online.', a: 'reservation', bn: 'আমি অনলাইনে হোটেল ___ করেছি।' },
          { q: 'Please do not leave your ___ alone.', a: 'luggage', bn: 'আপনার ___ একা ফেলে যাবেন না।' },
        ],
      },
      {
        id: 'b1-work', title: 'Work and teamwork', titleBn: 'কাজ ও টিমওয়ার্ক',
        intro: 'Use these words in meetings, emails and everyday office conversations.',
        introBn: 'মিটিং, ইমেইল এবং অফিসের দৈনন্দিন কথাবার্তায় এই শব্দগুলো ব্যবহার করুন।',
        vocab: [
          { w: 'deadline', sound: 'ডেডলাইন', bn: 'শেষ সময়সীমা', en: 'the latest time you must finish something', ex: 'The deadline is Friday.', exBn: 'শেষ সময়সীমা শুক্রবার।' },
          { w: 'colleague', sound: 'কলিগ', bn: 'সহকর্মী', en: 'a person you work with', ex: 'My colleague helped me.', exBn: 'আমার সহকর্মী আমাকে সাহায্য করেছেন।' },
          { w: 'meeting', sound: 'মিটিং', bn: 'সভা', en: 'a planned time when people discuss something', ex: 'We have a meeting at noon.', exBn: 'দুপুরে আমাদের সভা আছে।' },
          { w: 'improve', sound: 'ইমপ্রুভ', bn: 'উন্নতি করা', en: 'to make something better', ex: 'Practice will improve your English.', exBn: 'অনুশীলন আপনার ইংরেজি উন্নত করবে।' },
          { w: 'responsible', sound: 'রেসপনসিবল', bn: 'দায়িত্বশীল', en: 'having a duty to take care of something', ex: 'She is responsible for the budget.', exBn: 'বাজেটের দায়িত্ব তার।' },
        ],
        fill: [
          { q: 'I must finish this report before the ___.', a: 'deadline', bn: 'আমাকে ___ এর আগে রিপোর্ট শেষ করতে হবে।' },
          { q: 'My ___ helped me with the project.', a: 'colleague', bn: 'আমার ___ প্রজেক্টে সাহায্য করেছেন।' },
          { q: 'Daily practice will ___ your English.', a: 'improve', bn: 'প্রতিদিনের অনুশীলন আপনার ইংরেজি ___ করবে।' },
        ],
      },
    ],
  },
  {
    id: 'b2', code: 'B2', name: 'Upper-Intermediate', nameBn: 'উচ্চ-মধ্যম', bnOptions: false,
    tagline: 'Explain ideas and share opinions with confidence.',
    lessons: [
      {
        id: 'b2-opinions', title: 'Opinions and arguments', titleBn: 'মতামত ও যুক্তি',
        intro: 'Learn to support your ideas with reasons and respond to different views.',
        introBn: 'যুক্তি দিয়ে নিজের মত প্রকাশ করতে এবং ভিন্ন মতের উত্তর দিতে শিখুন।',
        vocab: [
          { w: 'argue', sound: 'আর্গিউ', bn: 'যুক্তি দেখানো', en: 'to give reasons to show that something is true or right', ex: 'He argued that taxes should be lower.', exBn: 'তিনি যুক্তি দিলেন যে কর কম হওয়া উচিত।' },
          { w: 'evidence', sound: 'এভিডেন্স', bn: 'প্রমাণ', en: 'facts that show something is true', ex: 'There is strong evidence for this.', exBn: 'এর পক্ষে জোরালো প্রমাণ আছে।' },
          { w: 'convince', sound: 'কনভিন্স', bn: 'বিশ্বাস করানো', en: 'to make someone believe something', ex: 'She convinced me to join.', exBn: 'সে আমাকে যোগ দিতে রাজি করাল।' },
          { w: 'perspective', sound: 'পারস্পেকটিভ', bn: 'দৃষ্টিভঙ্গি', en: 'a particular way of thinking about something', ex: 'Try to see it from my perspective.', exBn: 'আমার দৃষ্টিকোণ থেকে দেখার চেষ্টা করুন।' },
          { w: 'controversial', sound: 'কন্ট্রোভার্শিয়াল', bn: 'বিতর্কিত', en: 'causing strong disagreement', ex: 'It is a controversial decision.', exBn: 'এটি একটি বিতর্কিত সিদ্ধান্ত।' },
        ],
        fill: [
          { q: 'She tried to ___ me to join the team.', a: 'convince', bn: 'সে আমাকে দলে যোগ দিতে ___ চেষ্টা করল।' },
          { q: 'There is no ___ that the plan works.', a: 'evidence', bn: 'পরিকল্পনাটি কাজ করে তার কোনো ___ নেই।' },
          { q: 'It is a ___ topic; people disagree strongly.', a: 'controversial', bn: 'এটি একটি ___ বিষয়; মানুষ তীব্রভাবে দ্বিমত করে।' },
        ],
      },
    ],
  },
  {
    id: 'c1', code: 'C1', name: 'Advanced', nameBn: 'উন্নত', bnOptions: false,
    tagline: 'Express subtle meaning, fluently and naturally.',
    lessons: [
      {
        id: 'c1-nuance', title: 'Shades of meaning', titleBn: 'অর্থের সূক্ষ্মতা',
        intro: 'Advanced speakers choose precise words. These five words add nuance to your speaking and writing.',
        introBn: 'উন্নত বক্তারা নির্ভুল শব্দ বেছে নেন। এই পাঁচটি শব্দ আপনার কথা ও লেখায় সূক্ষ্মতা আনবে।',
        vocab: [
          { w: 'reluctant', sound: 'রিলাকট্যান্ট', bn: 'অনিচ্ছুক', en: 'unwilling and hesitant', ex: 'He was reluctant to speak.', exBn: 'সে কথা বলতে অনিচ্ছুক ছিল।' },
          { w: 'inevitable', sound: 'ইনেভিটেবল', bn: 'অনিবার্য', en: 'certain to happen and impossible to avoid', ex: 'Change is inevitable.', exBn: 'পরিবর্তন অনিবার্য।' },
          { w: 'ambiguous', sound: 'অ্যাম্বিগুয়াস', bn: 'দ্ব্যর্থক', en: 'having more than one possible meaning', ex: 'The answer was ambiguous.', exBn: 'উত্তরটি দ্ব্যর্থক ছিল।' },
          { w: 'meticulous', sound: 'মেটিকিউলাস', bn: 'অতি সতর্ক', en: 'very careful about small details', ex: 'She is a meticulous editor.', exBn: 'তিনি একজন অতি সতর্ক সম্পাদক।' },
          { w: 'undermine', sound: 'আন্ডারমাইন', bn: 'দুর্বল করা', en: 'to weaken something slowly', ex: 'Rumors undermine trust.', exBn: 'গুজব বিশ্বাস দুর্বল করে।' },
        ],
        fill: [
          { q: 'He was ___ to admit his mistake.', a: 'reluctant', bn: 'সে ভুল স্বীকার করতে ___ ছিল।' },
          { q: 'The wording is ___; it can be read in two ways.', a: 'ambiguous', bn: 'শব্দচয়ন ___; দুইভাবে পড়া যায়।' },
          { q: 'Constant criticism can ___ your confidence.', a: 'undermine', bn: 'ক্রমাগত সমালোচনা আত্মবিশ্বাস ___ পারে।' },
        ],
      },
    ],
  },
  {
    id: 'c2', code: 'C2', name: 'Mastery', nameBn: 'দক্ষতা', bnOptions: false,
    tagline: 'Precision, style and near-native expression.',
    lessons: [
      {
        id: 'c2-style', title: 'Precision and style', titleBn: 'নির্ভুলতা ও শৈলী',
        intro: 'At this level, the right word changes everything. Study how each one is used in a full sentence.',
        introBn: 'এই স্তরে সঠিক শব্দই সব পার্থক্য গড়ে দেয়। প্রতিটি শব্দ পুরো বাক্যে কীভাবে ব্যবহার হয় তা মন দিয়ে দেখুন।',
        vocab: [
          { w: 'ephemeral', sound: 'ইফেমেরাল', bn: 'ক্ষণস্থায়ী', en: 'lasting for a very short time', ex: 'Fame can be ephemeral.', exBn: 'খ্যাতি ক্ষণস্থায়ী হতে পারে।' },
          { w: 'ubiquitous', sound: 'ইউবিকুইটাস', bn: 'সর্বব্যাপী', en: 'found everywhere', ex: 'Smartphones are ubiquitous.', exBn: 'স্মার্টফোন সর্বত্র দেখা যায়।' },
          { w: 'eloquent', sound: 'এলোকোয়েন্ট', bn: 'বাকপটু', en: 'able to speak clearly and persuasively', ex: 'She gave an eloquent speech.', exBn: 'তিনি একটি বাকপটু বক্তৃতা দিলেন।' },
          { w: 'pragmatic', sound: 'প্র্যাগম্যাটিক', bn: 'বাস্তববাদী', en: 'focused on practical results, not ideas', ex: 'We need a pragmatic solution.', exBn: 'আমাদের একটি বাস্তবসম্মত সমাধান দরকার।' },
          { w: 'scrutinize', sound: 'স্ক্রুটিনাইজ', bn: 'খুঁটিয়ে দেখা', en: 'to examine very carefully', ex: 'Auditors scrutinize every detail.', exBn: 'নিরীক্ষকরা প্রতিটি খুঁটিনাটি পরীক্ষা করেন।' },
        ],
        fill: [
          { q: 'Smartphones have become ___; you see them everywhere.', a: 'ubiquitous', bn: 'স্মার্টফোন এখন ___; সবখানে দেখা যায়।' },
          { q: 'She gave an ___ speech that moved the audience.', a: 'eloquent', bn: 'তিনি একটি ___ বক্তৃতা দিলেন যা শ্রোতাদের নাড়া দিল।' },
          { q: 'Auditors will ___ every detail of the accounts.', a: 'scrutinize', bn: 'নিরীক্ষকরা হিসাবের প্রতিটি খুঁটিনাটি ___।' },
        ],
      },
    ],
  },
]
