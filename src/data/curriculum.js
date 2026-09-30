export const AVAILABLE_LANGUAGES = [
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    tagline: '¡Hola! Aprende español rápido y divertido',
    learnerCount: '34.2M learners'
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    tagline: 'नमस्ते! Learn Hindi words, phrases & script',
    learnerCount: '12.8M learners'
  }
];

export const UNITS_DATA = [
  // ==========================================
  // SPANISH UNITS (language: 'es')
  // ==========================================
  {
    id: 'unit-es-1',
    language: 'es',
    unitNumber: 1,
    title: 'Unit 1: Spanish Essentials',
    subtitle: 'Say hello, introduce yourself, and order basic items',
    themeColor: '#58cc02',
    headerBg: 'linear-gradient(135deg, #58cc02 0%, #2b9d00 100%)',
    guidebook: {
      title: 'Unit 1 Key Guidebook',
      grammarTip: 'In Spanish, question marks are used at both the beginning (inverted ¿) and end (?). Masculine nouns usually end in -o (el libro) and feminine in -a (la mesa).',
      keyPhrases: [
        { target: '¡Hola! ¿Cómo estás?', english: 'Hello! How are you?', audioTip: 'OH-lah, KOH-moh ess-TAHS' },
        { target: 'Mucho gusto.', english: 'Nice to meet you.', audioTip: 'MOO-choh GOOS-toh' },
        { target: 'Por favor y gracias.', english: 'Please and thank you.', audioTip: 'pohr fah-VOR ee GRAH-syahs' },
        { target: 'Un café, por favor.', english: 'A coffee, please.', audioTip: 'oon kah-FEH, pohr fah-VOR' }
      ]
    },
    lessons: [
      {
        id: 'u1-l1',
        unitId: 'unit-es-1',
        title: 'Basic Greetings',
        description: 'Learn how to greet someone and say your name',
        icon: 'chat-left-dots',
        xpReward: 15,
        gemsReward: 5,
        exercises: [
          {
            id: 'u1-l1-e1',
            type: 'multiple-choice',
            prompt: 'Select the correct translation for "Hello"',
            targetText: 'Hello',
            options: ['Hola', 'Adiós', 'Gracias', 'Por favor'],
            correctOptionIndex: 0,
            audioPhrase: 'Hola',
            explanation: '"Hola" is the universal informal and friendly greeting in Spanish.'
          },
          {
            id: 'u1-l1-e2',
            type: 'word-bank',
            prompt: 'Translate this sentence into Spanish',
            englishText: 'Good morning, how are you?',
            audioPhrase: 'Buenos días, ¿cómo estás?',
            correctSentence: ['Buenos', 'días,', '¿cómo', 'estás?'],
            wordBankPool: ['Buenos', 'estás?', 'noches', '¿cómo', 'días,', 'adiós', 'gracias', 'yo'],
            explanation: '"Buenos días" is literally "good days", used until noon.'
          },
          {
            id: 'u1-l1-e3',
            type: 'listening',
            prompt: 'Tap what you hear',
            audioPhrase: 'Mucho gusto en conocerte',
            phonetic: 'MOO-choh GOOS-toh en koh-noh-SEHR-teh',
            correctSentence: ['Mucho', 'gusto', 'en', 'conocerte'],
            wordBankPool: ['Mucho', 'tarde', 'en', 'gusto', 'conocerte', 'hola', 'bien', 'tú'],
            explanation: '"Mucho gusto" means "great pleasure", used when meeting someone.'
          },
          {
            id: 'u1-l1-e4',
            type: 'pair-matching',
            prompt: 'Match the greeting pairs',
            pairs: [
              { id: 'p1', target: 'Hola', english: 'Hello' },
              { id: 'p2', target: 'Adiós', english: 'Goodbye' },
              { id: 'p3', target: 'Gracias', english: 'Thank you' },
              { id: 'p4', target: 'Por favor', english: 'Please' }
            ]
          },
          {
            id: 'u1-l1-e5',
            type: 'fill-blank',
            prompt: 'Complete the sentence with the missing word',
            targetText: 'Mi nombre ___ Carlos.',
            fillInParts: {
              before: 'Mi nombre',
              blankAnswer: 'es',
              after: 'Carlos.'
            },
            options: ['es', 'son', 'está', 'soy'],
            correctOptionIndex: 0,
            audioPhrase: 'Mi nombre es Carlos.',
            explanation: 'Use "es" (from the verb ser) for identity: "My name is Carlos".'
          }
        ]
      },
      {
        id: 'u1-l2',
        unitId: 'unit-es-1',
        title: 'Ordering at a Cafe',
        description: 'Order water, coffee, and ask politely',
        icon: 'cup-hot',
        xpReward: 15,
        gemsReward: 5,
        exercises: [
          {
            id: 'u1-l2-e1',
            type: 'multiple-choice',
            prompt: 'What does "El café con leche" mean?',
            targetText: 'El café con leche',
            audioPhrase: 'El café con leche',
            options: ['Coffee with milk', 'Tea with sugar', 'Black coffee', 'Cold juice'],
            correctOptionIndex: 0,
            explanation: '"Café" is coffee and "leche" is milk. "Con" means "with".'
          },
          {
            id: 'u1-l2-e2',
            type: 'word-bank',
            prompt: 'Translate this sentence into Spanish',
            englishText: 'A water and a bread, please.',
            audioPhrase: 'Un agua y un pan, por favor.',
            correctSentence: ['Un', 'agua', 'y', 'un', 'pan,', 'por', 'favor.'],
            wordBankPool: ['Un', 'por', 'agua', 'y', 'leche', 'favor.', 'pan,', 'un', 'sin'],
            explanation: '"Un agua" (water) and "un pan" (bread).'
          },
          {
            id: 'u1-l2-e3',
            type: 'listening',
            prompt: 'Tap what you hear',
            audioPhrase: 'Una mesa para dos, por favor',
            phonetic: 'OO-nah MEH-sah PAH-rah dohs, pohr fah-VOR',
            correctSentence: ['Una', 'mesa', 'para', 'dos,', 'por', 'favor'],
            wordBankPool: ['Una', 'tres,', 'mesa', 'para', 'dos,', 'silla', 'por', 'favor'],
            explanation: 'When arriving at a restaurant: "A table for two, please".'
          },
          {
            id: 'u1-l2-e4',
            type: 'pair-matching',
            prompt: 'Match the cafe words',
            pairs: [
              { id: 'p1', target: 'El agua', english: 'The water' },
              { id: 'p2', target: 'El café', english: 'The coffee' },
              { id: 'p3', target: 'La leche', english: 'The milk' },
              { id: 'p4', target: 'El azúcar', english: 'The sugar' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'unit-es-2',
    language: 'es',
    unitNumber: 2,
    title: 'Unit 2: Food & Restaurant',
    subtitle: 'Order dishes, describe tastes, and ask for the bill',
    themeColor: '#ff9600',
    headerBg: 'linear-gradient(135deg, #ff9600 0%, #e06c00 100%)',
    guidebook: {
      title: 'Unit 2 Key Guidebook',
      grammarTip: 'Use "Quisiera" or "Quiero" to state what you want. To request the bill at the end of the meal, simply say "La cuenta, por favor".',
      keyPhrases: [
        { target: 'La cuenta, por favor.', english: 'The bill, please.', audioTip: 'lah KWEHN-tah, pohr fah-VOR' },
        { target: 'Quiero una ensalada fresca.', english: 'I want a fresh salad.', audioTip: 'KYEH-roh OO-nah en-sah-LAH-dah FRESS-kah' },
        { target: 'Está muy delicioso.', english: 'It is very delicious.', audioTip: 'ess-TAH moo-ee deh-lee-SYOH-soh' }
      ]
    },
    lessons: [
      {
        id: 'u2-l1',
        unitId: 'unit-es-2',
        title: 'Ordering Dinner',
        description: 'Ask for food, meat, fish, and vegetarian options',
        icon: 'egg-fried',
        xpReward: 20,
        gemsReward: 6,
        exercises: [
          {
            id: 'u2-l1-e1',
            type: 'multiple-choice',
            prompt: 'Select the translation for "The bill, please"',
            targetText: 'La cuenta, por favor',
            audioPhrase: 'La cuenta, por favor',
            options: ['The bill, please', 'The menu, please', 'The food, please', 'The glass, please'],
            correctOptionIndex: 0,
            explanation: '"La cuenta" is the restaurant check/bill.'
          },
          {
            id: 'u2-l1-e2',
            type: 'word-bank',
            prompt: 'Translate into Spanish: "I want chicken and rice"',
            englishText: 'I want chicken and rice',
            audioPhrase: 'Quiero pollo y arroz',
            correctSentence: ['Quiero', 'pollo', 'y', 'arroz'],
            wordBankPool: ['Quiero', 'pescado', 'pollo', 'y', 'pan', 'arroz', 'bebo'],
            explanation: '"Pollo" is chicken, "arroz" is rice.'
          }
        ]
      }
    ]
  },

  // ==========================================
  // HINDI UNITS (language: 'hi')
  // ==========================================
  {
    id: 'unit-hi-1',
    language: 'hi',
    unitNumber: 1,
    title: 'Unit 1: Hindi Basics & Greetings',
    subtitle: 'Learn Namaste, introduces yourself, and say thank you',
    themeColor: '#ff9600', // Saffron / warm gold
    headerBg: 'linear-gradient(135deg, #ff9933 0%, #d97706 100%)',
    guidebook: {
      title: 'Unit 1 Hindi Guidebook (नमस्ते Guide)',
      grammarTip: 'Hindi sentences follow Subject - Object - Verb (SOV) order. For example: "Main Carlos hoon" = "I Carlos am". "Namaste" (नमस्ते) is used for both Hello and Goodbye with hands pressed together 🙏.',
      keyPhrases: [
        { target: 'नमस्ते (Namaste)', english: 'Hello / Greetings', audioTip: 'Nah-mahs-TAY' },
        { target: 'आप कैसे हैं? (Aap kaise hain?)', english: 'How are you? (Polite)', audioTip: 'Ahp KY-seh hain?' },
        { target: 'मेरा नाम... है (Mera naam... hai)', english: 'My name is...', audioTip: 'MEH-rah NAHM... high' },
        { target: 'धन्यवाद (Dhanyavaad)', english: 'Thank you', audioTip: 'DHUHN-yuh-vahd' },
        { target: 'हाँ और नहीं (Haan aur Nahin)', english: 'Yes and No', audioTip: 'Hahn awr Nah-HEEN' }
      ]
    },
    lessons: [
      {
        id: 'u-hi-1-l1',
        unitId: 'unit-hi-1',
        title: 'Namaste & Greetings',
        description: 'Master the iconic greeting and polite expressions',
        icon: 'chat-left-dots',
        xpReward: 15,
        gemsReward: 5,
        exercises: [
          {
            id: 'hi-1-e1',
            type: 'multiple-choice',
            prompt: 'Select the correct translation for "Hello" in Hindi',
            targetText: 'Hello',
            options: ['नमस्ते (Namaste)', 'धन्यवाद (Dhanyavaad)', 'अलविदा (Alvida)', 'नहीं (Nahin)'],
            correctOptionIndex: 0,
            audioPhrase: 'नमस्ते',
            explanation: '"नमस्ते" (Namaste) is the quintessential respectful greeting in Hindi, spoken with palms joined.'
          },
          {
            id: 'hi-1-e2',
            type: 'word-bank',
            prompt: 'Translate this sentence into Hindi: "How are you?"',
            englishText: 'How are you?',
            audioPhrase: 'आप कैसे हैं?',
            correctSentence: ['आप', 'कैसे', 'हैं?'],
            wordBankPool: ['आप', 'कहाँ', 'हैं?', 'कैसे', 'मैं', 'हूँ', 'नमस्ते', 'नाम'],
            phonetic: 'Aap kaise hain?',
            explanation: '"आप" (Aap) is the respectful "you", "कैसे" (kaise) is "how", and "हैं" (hain) is "are".'
          },
          {
            id: 'hi-1-e3',
            type: 'listening',
            prompt: 'Tap what you hear',
            audioPhrase: 'धन्यवाद आपका',
            phonetic: 'Dhanyavaad aapka',
            correctSentence: ['धन्यवाद', 'आपका'],
            wordBankPool: ['धन्यवाद', 'नमस्ते', 'आपका', 'पानी', 'हाँ', 'अलविदा'],
            explanation: '"धन्यवाद" (Dhanyavaad) means "Thank you", and "आपका" (aapka) means "yours/to you".'
          },
          {
            id: 'hi-1-e4',
            type: 'pair-matching',
            prompt: 'Match the Hindi words with English',
            pairs: [
              { id: 'hi-p1', target: 'नमस्ते (Namaste)', english: 'Hello' },
              { id: 'hi-p2', target: 'धन्यवाद (Dhanyavaad)', english: 'Thank you' },
              { id: 'hi-p3', target: 'हाँ (Haan)', english: 'Yes' },
              { id: 'hi-p4', target: 'नहीं (Nahin)', english: 'No' }
            ]
          },
          {
            id: 'hi-1-e5',
            type: 'fill-blank',
            prompt: 'Complete the sentence: "My name is Raj"',
            targetText: 'मेरा नाम राज ___।',
            fillInParts: {
              before: 'मेरा नाम राज',
              blankAnswer: 'है',
              after: '।'
            },
            options: ['है (hai)', 'हूँ (hoon)', 'था (tha)', 'हो (ho)'],
            correctOptionIndex: 0,
            audioPhrase: 'मेरा नाम राज है।',
            phonetic: 'Mera naam Raj hai.',
            explanation: 'Use "है" (hai) for third-person singular "is": "Mera naam Raj hai".'
          }
        ]
      },
      {
        id: 'u-hi-1-l2',
        unitId: 'unit-hi-1',
        title: 'Polite Conversation',
        description: 'Say please, welcome, and introduce friends',
        icon: 'people',
        xpReward: 15,
        gemsReward: 5,
        exercises: [
          {
            id: 'hi-2-e1',
            type: 'multiple-choice',
            prompt: 'How do you say "Thank you very much" in Hindi?',
            options: ['बहुत धन्यवाद (Bahut dhanyavaad)', 'कृपया (Kripya)', 'माफ़ कीजिए (Maaf kijiye)', 'नमस्ते (Namaste)'],
            correctOptionIndex: 0,
            audioPhrase: 'बहुत धन्यवाद',
            explanation: '"बहुत" (Bahut) means "very / a lot".'
          },
          {
            id: 'hi-2-e2',
            type: 'word-bank',
            prompt: 'Translate into Hindi: "Please excuse me"',
            englishText: 'Please excuse me',
            audioPhrase: 'कृपया माफ़ कीजिए',
            correctSentence: ['कृपया', 'माफ़', 'कीजिए'],
            wordBankPool: ['कृपया', 'धन्यवाद', 'माफ़', 'कीजिए', 'चाय', 'है', 'हाँ'],
            phonetic: 'Kripya maaf kijiye',
            explanation: '"कृपया" (Kripya) = Please, "माफ़ कीजिए" (Maaf kijiye) = Excuse me / Sorry.'
          },
          {
            id: 'hi-2-e3',
            type: 'listening',
            prompt: 'Tap what you hear',
            audioPhrase: 'मैं ठीक हूँ',
            phonetic: 'Main theek hoon',
            correctSentence: ['मैं', 'ठीक', 'हूँ'],
            wordBankPool: ['मैं', 'आप', 'ठीक', 'हूँ', 'हैं', 'धन्यवाद'],
            explanation: '"मैं ठीक हूँ" (Main theek hoon) = "I am fine / good".'
          },
          {
            id: 'hi-2-e4',
            type: 'pair-matching',
            prompt: 'Match daily expressions',
            pairs: [
              { id: 'hp1', target: 'कृपया (Kripya)', english: 'Please' },
              { id: 'hp2', target: 'माफ़ कीजिए (Maaf kijiye)', english: 'Excuse me' },
              { id: 'hp3', target: 'अलविदा (Alvida)', english: 'Goodbye' },
              { id: 'hp4', target: 'शुभ रात्रि (Shubh raatri)', english: 'Good night' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'unit-hi-2',
    language: 'hi',
    unitNumber: 2,
    title: 'Unit 2: Chai, Food & Restaurant',
    subtitle: 'Order masala chai, roti, water, and tasty meals',
    themeColor: '#58cc02', // Emerald green
    headerBg: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    guidebook: {
      title: 'Unit 2 Hindi Food Guidebook',
      grammarTip: 'In India, tea is almost always called "Chai" (चाय) and water is "Paani" (पानी). To order politely, add "चाहिए" (chahiye = is needed / want) or "दीजिए" (deejie = please give).',
      keyPhrases: [
        { target: 'एक कप चाय, कृपया (Ek cup chai, kripya)', english: 'A cup of tea, please', audioTip: 'Ayk cup chai, krip-yah' },
        { target: 'पानी दीजिए (Paani deejie)', english: 'Please give water', audioTip: 'PAH-nee DEE-jee-yeh' },
        { target: 'खाना बहुत स्वादिष्ट है (Khaana bahut swaadisht hai)', english: 'The food is very delicious', audioTip: 'KHAH-nah bah-hut swah-DISHT hai' }
      ]
    },
    lessons: [
      {
        id: 'u-hi-2-l1',
        unitId: 'unit-hi-2',
        title: 'Ordering Chai & Water',
        description: 'Order hot drinks and refreshers at stalls and cafes',
        icon: 'cup-hot',
        xpReward: 20,
        gemsReward: 6,
        exercises: [
          {
            id: 'hi-f1-e1',
            type: 'multiple-choice',
            prompt: 'What does "गरम चाय" (Garam chai) mean?',
            targetText: 'गरम चाय',
            audioPhrase: 'गरम चाय',
            options: ['Hot tea', 'Cold water', 'Sweet juice', 'Fresh milk'],
            correctOptionIndex: 0,
            explanation: '"गरम" (Garam) means "hot" and "चाय" (Chai) is tea!'
          },
          {
            id: 'hi-f1-e2',
            type: 'word-bank',
            prompt: 'Translate into Hindi: "Water and tea, please"',
            englishText: 'Water and tea, please',
            audioPhrase: 'पानी और चाय, कृपया',
            correctSentence: ['पानी', 'और', 'चाय,', 'कृपया'],
            wordBankPool: ['पानी', 'दूध', 'और', 'चाय,', 'कृपया', 'रोटी', 'नहीं'],
            phonetic: 'Paani aur chai, kripya',
            explanation: '"पानी" (Paani) is water and "और" (aur) is "and".'
          },
          {
            id: 'hi-f1-e3',
            type: 'listening',
            prompt: 'Tap what you hear',
            audioPhrase: 'एक कप चाय दीजिए',
            phonetic: 'Ek cup chai deejie',
            correctSentence: ['एक', 'कप', 'चाय', 'दीजिए'],
            wordBankPool: ['एक', 'दो', 'कप', 'चाय', 'दीजिए', 'पानी', 'खाना'],
            explanation: '"एक कप चाय दीजिए" = Please give one cup of tea.'
          },
          {
            id: 'hi-f1-e4',
            type: 'pair-matching',
            prompt: 'Match Hindi food items',
            pairs: [
              { id: 'hfp1', target: 'पानी (Paani)', english: 'Water' },
              { id: 'hfp2', target: 'चाय (Chai)', english: 'Tea' },
              { id: 'hfp3', target: 'रोटी (Roti)', english: 'Flatbread' },
              { id: 'hfp4', target: 'दूध (Doodh)', english: 'Milk' }
            ]
          }
        ]
      },
      {
        id: 'u-hi-2-l2',
        unitId: 'unit-hi-2',
        title: 'Delicious Meals',
        description: 'Talk about curries, sweets, and the restaurant bill',
        icon: 'egg-fried',
        xpReward: 20,
        gemsReward: 6,
        exercises: [
          {
            id: 'hi-f2-e1',
            type: 'multiple-choice',
            prompt: 'How do you say "The food is delicious" in Hindi?',
            options: ['खाना स्वादिष्ट है (Khaana swaadisht hai)', 'चाय गरम है', 'पानी ठंडा है', 'नमस्ते मित्र'],
            correctOptionIndex: 0,
            audioPhrase: 'खाना स्वादिष्ट है',
            explanation: '"खाना" (Khaana) is food, and "स्वादिष्ट" (swaadisht) is tasty/delicious.'
          },
          {
            id: 'hi-f2-e2',
            type: 'word-bank',
            prompt: 'Translate into Hindi: "The bill, please"',
            englishText: 'The bill, please',
            audioPhrase: 'बिल दीजिए, कृपया',
            correctSentence: ['बिल', 'दीजिए,', 'कृपया'],
            wordBankPool: ['बिल', 'दीजिए,', 'कृपया', 'खाना', 'स्वादिष्ट', 'चाय'],
            phonetic: 'Bill deejie, kripya',
            explanation: 'Just like in English, "बिल" (bill) is widely understood across India!'
          }
        ]
      }
    ]
  },
  {
    id: 'unit-hi-3',
    language: 'hi',
    unitNumber: 3,
    title: 'Unit 3: Places, Travel & Directions',
    subtitle: 'Find railway stations, hotels, and ask for directions',
    themeColor: '#1cb0f6', // Duolingo blue
    headerBg: 'linear-gradient(135deg, #1cb0f6 0%, #0284c7 100%)',
    guidebook: {
      title: 'Unit 3 Hindi Travel Guidebook',
      grammarTip: '"कहाँ है?" (Kahan hai?) means "Where is...?". Put the location first: "Station kahan hai?" = "Where is the station?".',
      keyPhrases: [
        { target: 'स्टेशन कहाँ है? (Station kahan hai?)', english: 'Where is the station?', audioTip: 'Station kah-HAHN high?' },
        { target: 'होटल यहाँ है (Hotel yahan hai)', english: 'The hotel is here', audioTip: 'Hotel yah-HAHN high' },
        { target: 'कितना हुआ? (Kitna hua?)', english: 'How much is it? (Fare/Price)', audioTip: 'KIT-nah HOO-ah?' }
      ]
    },
    lessons: [
      {
        id: 'u-hi-3-l1',
        unitId: 'unit-hi-3',
        title: 'Finding Your Way',
        description: 'Ask for stations, auto-rickshaws, and hotels',
        icon: 'compass',
        xpReward: 25,
        gemsReward: 8,
        exercises: [
          {
            id: 'hi-t1-e1',
            type: 'multiple-choice',
            prompt: 'What does "रेलवे स्टेशन कहाँ है?" mean?',
            targetText: 'रेलवे स्टेशन कहाँ है?',
            audioPhrase: 'रेलवे स्टेशन कहाँ है?',
            options: ['Where is the railway station?', 'Where is the airport?', 'Where is the bus stand?', 'Where is the taxi?'],
            correctOptionIndex: 0,
            explanation: '"कहाँ है" (kahan hai) means "where is".'
          },
          {
            id: 'hi-t1-e2',
            type: 'word-bank',
            prompt: 'Translate into Hindi: "How much is it?"',
            englishText: 'How much is it?',
            audioPhrase: 'कितना हुआ?',
            correctSentence: ['कितना', 'हुआ?'],
            wordBankPool: ['कितना', 'कहाँ', 'हुआ?', 'स्टेशन', 'है', 'टिकट'],
            phonetic: 'Kitna hua?',
            explanation: '"कितना हुआ?" is the universal phrase when asking for an auto, taxi, or shop price!'
          },
          {
            id: 'hi-t1-e3',
            type: 'pair-matching',
            prompt: 'Match travel words',
            pairs: [
              { id: 'htp1', target: 'कहाँ (Kahan)', english: 'Where' },
              { id: 'htp2', target: 'यहाँ (Yahan)', english: 'Here' },
              { id: 'htp3', target: 'टिकट (Ticket)', english: 'Ticket' },
              { id: 'htp4', target: 'गाड़ी (Gaadi)', english: 'Train / Car' }
            ]
          }
        ]
      }
    ]
  }
];

export const SHOP_ITEMS = [
  {
    id: 'streak-freeze',
    name: 'Streak Freeze',
    description: 'Equip a shield to protect your daily streak if you miss practicing tomorrow.',
    cost: 50,
    icon: 'snow',
    badge: 'Popular',
    type: 'streak'
  },
  {
    id: 'heart-refill',
    name: 'Full Heart Refill',
    description: 'Instantly restore all 5 hearts to continue learning without waiting.',
    cost: 100,
    icon: 'heart',
    badge: 'Instant',
    type: 'hearts'
  },
  {
    id: 'double-xp',
    name: 'Double or Nothing',
    description: 'Maintain your 7-day streak to double your 50 gems wager into 100 gems!',
    cost: 50,
    icon: 'lightning-charge',
    badge: 'Challenge',
    type: 'wager'
  },
  {
    id: 'suit-duo',
    name: 'Fancy Tuxedo Duo',
    description: 'Dress Duo in a tailored black bowtie tuxedo for celebratory moments.',
    cost: 120,
    icon: 'award',
    badge: 'Outfit',
    type: 'outfit'
  },
  {
    id: 'gold-duo',
    name: 'Golden Champion Duo',
    description: 'Shine in the leaderboard with a glowing golden champion cape and crown.',
    cost: 200,
    icon: 'trophy',
    badge: 'Exclusive',
    type: 'outfit'
  }
];

export const INITIAL_QUESTS = [
  {
    id: 'q1',
    title: 'Daily Dedication',
    description: 'Complete 2 lessons today',
    progress: 0,
    target: 2,
    rewardGems: 15,
    rewardXp: 20,
    completed: false,
    claimed: false,
    icon: 'bullseye'
  },
  {
    id: 'q2',
    title: 'Sharpshooter',
    description: 'Score 90% or higher accuracy in a lesson',
    progress: 0,
    target: 1,
    rewardGems: 10,
    rewardXp: 15,
    completed: false,
    claimed: false,
    icon: 'lightning-charge'
  },
  {
    id: 'q3',
    title: 'XP Booster',
    description: 'Earn 30 total XP today',
    progress: 0,
    target: 30,
    rewardGems: 20,
    rewardXp: 25,
    completed: false,
    claimed: false,
    icon: 'graph-up-arrow'
  }
];

export const LEADERBOARD_USERS = [
  { id: 'u1', name: 'Aarav Sharma', avatar: '👳‍♂️', xp: 520, rank: 1, streak: 18 },
  { id: 'u2', name: 'Sofia Rodriguez', avatar: '👩‍🎨', xp: 480, rank: 2, streak: 14 },
  { id: 'u3', name: 'Priya Patel', avatar: '👩‍💼', xp: 440, rank: 3, streak: 12 },
  { id: 'u4', name: 'Mateo Chen', avatar: '👨‍🚀', xp: 420, rank: 4, streak: 9 },
  { id: 'u5', name: 'You (Champion)', avatar: '🦉', xp: 45, rank: 5, streak: 3, isCurrentUser: true },
  { id: 'u6', name: 'Lucas Rossi', avatar: '👨‍🎤', xp: 310, rank: 6, streak: 6 },
  { id: 'u7', name: 'Rohan Gupta', avatar: '🧑‍💻', xp: 280, rank: 7, streak: 8 },
  { id: 'u8', name: 'Aria Takahashi', avatar: '👩‍🍳', xp: 180, rank: 8, streak: 5 },
  { id: 'u9', name: 'David Kim', avatar: '🧑‍🌾', xp: 140, rank: 9, streak: 1 },
  { id: 'u10', name: 'Ananya Verma', avatar: '👩‍🔬', xp: 110, rank: 10, streak: 3 }
];
