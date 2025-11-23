//selectors
const letterDivHolder = document.querySelector('section .article-right-side')
const inputholder = document.querySelector('footer')
const categorySelect = document.getElementById('categorySelect')
const startBtn = document.querySelector('.startBtn')
const gameStartDiv = document.querySelector('.gameStart')
const theWordChosenPE = document.querySelector('.TheWordChosen')
const theCategory = document.querySelector('.category-selected')
const themain = document.querySelector('main')
const divforresult = document.getElementById('resultDiv')
const DivForRsultOfThegame = document.querySelector('.DivForRsultOfThegame')
let hangmonyBodyParts = document.querySelectorAll('.hangmanCaracter')
const menuIcon = document.querySelector('header .menu')
const divForMenu = document.querySelector('header .divForMenu')
const languageSelect = document.getElementById('languageCategory')
const hangmancaracters = document.querySelectorAll('.hangmanCaracter')
const MsgForExistingLetter = document.querySelector('.ForExistingLetter')
const MsgForChangingLang = document.querySelector('.MsgForChangingLanguage')
const countDownHoler = document.querySelector('.StepsAndTime .time')
const stepsholder = document.querySelector('.StepsAndTime .steps')
const doneInsideMsg = document.querySelector('.doneInsideMsg')
const reroleAgain = document.getElementById('repeat')
let goodresult = new Audio('sounds/goodresult.mp3')
let badresult = new Audio('sounds/badresult2.mp3')
let correctsound = new Audio('sounds/correct-answer.mp3')
let wrongsound = new Audio('sounds/wrong-answer.mp3')
let letters ;
let confimationDiv;
let gamestart = false;
let selectedValue;
let thewordchosen;
let theinputsforletters;
let  storeLetter = {}
let  storeindex = {}
let trakOfLang = 'en'
let langLogo = ''
let keydownhundler;
let languageLogo;
let doneBtn;
let MainDivForIcon;
let index = 0 ;
let StepsToShow;
let HeightOfMessageForLetterExisiting;
let end ;
let blockkey = false;
let tries
let countDown;
// meking translit arabic and english
const translitLanguage = {
    ar:{
            gameName: 'الرجل المشنوق',
            wordFrom:   "الكلمة من مجموعة",
            wordStart:  "الكلمة تبدأ بحرف",
            EndOfword:  "وتنتهي بحرف ",
            changeLanguage: 'تغيير اللغة',
            changecategory: 'تغيير المجموعة',
            StartBtn: 'إبدأ',
            fromText:'من قارة',
            startWithText:'الكلمة تبدأ ب',
            endOfTheWord:'وتنتهي ب',
            GameTitle:'الرجل المشنوق',
            exact:"تهانيا لإجاد كلمة :",
            victory:'إنترصت',
            startagain:'إبدأ من جديد',
            confirmationChangeMsg:'هل حقا تريد تغيير الإعدادات',
            doneBtn :'حفض',
            btnYes: "نعم",
            btnNo:"لا",
            defeat:'خسرت',
            lose : 'الكلمة الصحيحة هي:',
            changeKeyboardText:'من فضلك غير لغة لوحة الكتابة',
            changeKeyboardBtn:'حسنا'
        },
    en:{
            gameName: 'hangman',
            wordFrom:   "the word from category",
            wordStart:  "the word start with",
            EndOfword:  "and the end of the word is",
            changeLanguage: 'change language',
            changecategory: 'change category',
            StartBtn:'start',
            fromText:'from',
            startWithText:'the word start with',
            endOfTheWord:'and the end of the word is',
            GameTitle:'the hungman',
            exact:'congrasilution for finding the word :',
            victory:'victory',
            defeat:'defeat',
            startagain:'start again',
            confirmationChangeMsg:'are you sure you want to change setting',
            doneBtn :'save',
            btnYes: "yes",
            btnNo:"no",
            lose: 'currect word is :',
            changeKeyboardText:'change keyboard lanuage',
            changeKeyboardBtn:'done'
        },
    fr: {
            gameName: 'Le Pendu',
            wordFrom: "Le mot vient du groupe",
            wordStart: "Le mot commence par la lettre",
            EndOfword: "et se termine par la lettre",
            changeLanguage: 'Changer la langue',
            changecategory: 'Changer le groupe',
            StartBtn: 'Commencer',
            fromText: 'Du continent',
            startWithText: 'Le mot commence par',
            endOfTheWord: 'et se termine par',
            GameTitle: 'Le Pendu',
            exact: "Félicitations ! Vous avez trouvé le mot :",
            victory: 'Victoire',
            startagain: 'Recommencer',
            confirmationChangeMsg: 'Voulez-vous vraiment changer les paramètres ?',
            doneBtn: 'Enregistrer',
            btnYes: "Oui",
            btnNo: "Non",
            defeat: 'Défaite',
            lose: 'Le mot correct était :',
            changeKeyboardText: 'Veuillez changer la langue du clavier',
            changeKeyboardBtn: 'D\'accord'
        }
        

}
//for english
const lettersArray = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','space']
const lettersFranchArray = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','è','ï',"'",'space']
const GameStartChosenCategory = {
    en: [
            {
                category:'countries',
                contenet:'africa',
                arr:[  "algeria", "angola", "benin", "botswana", "burkina faso", "burundi", "cape verde", "cameroon", 
                "central african republic", "chad", "comoros", "democratic republic of the congo", "republic of the congo", 
                "djibouti", "egypt", "equatorial guinea", "eritrea", "eswatini", "ethiopia", "gabon", "gambia", "ghana", 
                "guinea", "guinea-bissau", "ivory coast", "kenya", "lesotho", "liberia", "libya", "madagascar", "malawi", 
                "mali", "mauritania", "mauritius", "morocco", "mozambique", "namibia", "niger", "nigeria", "rwanda", 
                "são tomé and príncipe", "senegal", "seychelles", "sierra leone", "somalia", "south africa", "south sudan", 
                "sudan", "tanzania", "togo", "tunisia", "uganda", "zambia", "zimbabwe"]
            },
            {
                category:'countries',
                contenet:'erupe',
                arr:[ "albania", "andorra", "armenia", "austria", "azerbaijan", "belarus", "belgium", "bosnia and herzegovina", 
                "bulgaria", "croatia", "cyprus", "czech republic", "denmark", "estonia", "finland", "france", "georgia", 
                "germany", "greece", "hungary", "iceland", "ireland", "italy", "kazakhstan", "kosovo", "latvia", "liechtenstein", 
                "lithuania", "luxembourg", "malta", "moldova", "monaco", "montenegro", "netherlands", "north macedonia", "norway", 
                "poland", "portugal", "romania", "russia", "san marino", "serbia", "slovakia", "slovenia", "spain", "sweden", 
                "switzerland", "ukraine", "united kingdom", "vatican city"]
            },
            {
                category:'countries',
                contenet:'north america',
                arr:[  "antigua and barbuda", "bahamas", "barbados", "belize", "canada", "costa rica", "cuba", "dominica", 
                "dominican republic", "el salvador", "grenada", "guatemala", "haiti", "honduras", "jamaica", "mexico", "nicaragua", 
                "panama", "saint kitts and nevis", "saint lucia", "saint vincent and the grenadines", "trinidad and tobago", 
                "united states"]
            },
            {
                category:'countries',
                contenet:'asia',
                arr:["afghanistan", "armenia", "azerbaijan", "bahrain", "bangladesh", "bhutan", "brunei", "cambodia", "china", 
                "cyprus", "georgia", "india", "indonesia", "iran", "iraq", "israel", "japan", "jordan", "kazakhstan", "kuwait", 
                "kyrgyzstan", "laos", "lebanon", "malaysia", "maldives", "mongolia", "myanmar", "nepal", "north korea", "oman", 
                "pakistan", "palestine", "philippines", "qatar", "russia", "saudi arabia", "singapore", "south korea", "sri lanka", 
                "syria", "taiwan", "tajikistan", "thailand", "timor-leste", "turkey", "turkmenistan", "united arab emirates", 
                "uzbekistan", "vietnam", "yemen"]
            },
            {
                category:'countries',
                contenet:'south america',
                arr:[ "argentina", "bolivia", "brazil", "chile", "colombia", "ecuador", "guyana", "paraguay", "peru", "suriname", 
                "uruguay", "venezuela"]
            },
            {
                category:'countries',
                contenet:'oceania',
                arr:[ "australia", "fiji", "kiribati", "marshall islands", "micronesia", "nauru", "new zealand", "palau", 
                "papua new guinea", "samoa", "solomon islands", "tonga", "tuvalu", "vanuatu"]
            },
            
            {
                category:'fruit',
                arr:[  "apple", "banana", "orange", "mango", "pineapple", "grapes", "strawberry", "blueberry", "watermelon",
                "papaya", "peach", "plum", "pear", "kiwi", "lemon", "lime", "cherry", "coconut", "guava", "pomegranate",
                "fig", "avocado", "date", "raspberry", "blackberry", "passion fruit", "dragon fruit", "lychee", "apricot",
                "cantaloupe", "tangerine"]
            },
            {
                category:'games',
                arr:[  "football", "basketball", "tennis", "cricket", "baseball", "volleyball", "table tennis", "badminton",
                "hockey", "golf", "rugby", "boxing", "wrestling", "swimming", "cycling", "skating", "karate", "chess",
                "checkers", "snooker", "bowling", "surfing", "skiing", "snowboarding", "archery", "darts", "esports",
                "video games", "handball", "dodgeball"]
            },
            {
                category:'morocco cities',
                arr:[  "casablanca", "rabat", "fes", "marrakech", "agadir", "tangier", "oujda", "kenitra", "tetouan", "safi",
                "el jadida", "beni mellal", "nador", "taza", "khouribga", "ouarzazate", "errachidia", "settat", "larache",
                "mohammedia", "meknes", "ifrane", "essaouira", "al hoceima", "guelmim", "dakhla", "laayoune", "tiznit",
                "taroudant", "azilal", "berkane", "taourirt", "khemisset", "khénifra", "sidi kacem", "sidi slimane",
                "zagora", "tan-tan", "fquih ben salah", "midelt", "jerada", "tinghir"]
            },
        ],
    ar: [
        {
            category: 'الدول',
            contenet: 'أفريقيا',
            arr: [
                "جزائر", "أنغولا", "بنين", "بوتسوانا", "بوركينا فاسو", "بوروندي", "رأس الأخضر", "كاميرون",
                "جمهورية أفريقيا الوسطى", "تشاد", "جزر القمر", "جمهورية الكونغو الديمقراطية", "جمهورية الكونغو",
                "جيبوتي", "مصر", "غينيا الاستوائية", "إريتريا", "إسواتيني", "إثيوبيا", "غابون", "غامبيا", "غانا",
                "غينيا", "غينيا بيساو", "ساحل العاج", "كينيا", "ليسوتو", "ليبيريا", "ليبيا", "مدغشقر", "مالاوي",
                "مالي", "موريتانيا", "موريشيوس", "مغرب", "موزمبيق", "ناميبيا", "نيجر", "نيجيريا", "رواندا",
                "ساو تومي وبرينسيب", "سنغال", "سيشل", "سيراليون", "صومال", "جنوب أفريقيا", "جنوب السودان",
                "سودان", "تنزانيا", "توجو", "تونس", "أوغندا", "زامبيا", "زيمبابوي"
            ]
        },
        {
            category: 'الدول',
            contenet: 'أوروبا',
            arr: [
                "ألبانيا", "أندورا", "أرمينيا", "النمسا", "أذربيجان", "بيلاروسيا", "بلجيكا", "البوسنة والهرسك",
                "بلغاريا", "كرواتيا", "قبرص", "جمهورية التشيك", "دنمارك", "إستونيا", "فنلندا", "فرنسا", "جورجيا",
                "ألمانيا", "يونان", "هنغاريا", "آيسلندا", "أيرلندا", "إيطاليا", "كازاخستان", "كوسوفو", "لاتفيا",
                "ليختنشتاين", "ليتوانيا", "لوكسمبورغ", "مالطا", "مولدوفا", "موناكو", "الجبل الأسود", "هولندا",
                "مقدونيا الشمالية", "النرويج", "بولندا", "البرتغال", "رومانيا", "روسيا", "سان مارينو", "صربيا",
                "سلوفاكيا", "سلوفينيا", "إسبانيا", "سويد", "سويسرا", "أوكرانيا", "بريطانيا", "فاتيكان"
            ]
        },
        {
            category: 'الدول',
            contenet: 'أمريكا الشمالية',
            arr: [
                "أنتيغوا وباربودا", "باهاماس", "باربادوس", "بليز", "كندا", "كوستاريكا", "كوبا", "دومينيكا",
                "جمهورية الدومينيكان", "سلفادور", "غرينادا", "غواتيمالا", "هايتي", "هندوراس", "جامايكا", "المكسيك",
                "نيكاراغوا", "بنما", "سانت كيتس ونيفيس", "سانت لوسيا", "سانت فنسنت والغرينادين", "ترينيداد وتوباغو",
                "الولايات المتحدة"
            ]
        },
        {
            category: 'الدول',
            contenet: 'آسيا',
            arr: [
                "أفغانستان", "أرمينيا", "أذربيجان", "بحرين", "بنغلاديش", "بوتان", "بروناي", "كمبوديا", "صين",
                "قبرص", "جورجيا", "هند", "إندونيسيا", "إيران", "عراق", "إسرائيل", "يابان", "أردن", "كازاخستان",
                "كويت", "قرغيزستان", "لاوس", "لبنان", "ماليزيا", "مالديف", "منغوليا", "ميانمار", "نيبال",
                "كوريا الشمالية", "عُمان", "باكستان", "فلسطين", "فلبين", "قطر", "روسيا", "سعودية", "سنغافورة",
                "كوريا الجنوبية", "سريلانكا", "سوريا", "تايوان", "طاجيكستان", "تايلاند", "تيمور الشرقية", "تركيا",
                "تركمانستان", "إمارات", "أوزبكستان", "فيتنام", "يمن"
            ]
        },
        {
            category: 'الدول',
            contenet: 'أمريكا الجنوبية',
            arr: [
                "أرجنتين", "بوليفيا", "البرازيل", "تشيلي", "كولومبيا", "إكوادور", "غيانا", "باراغواي", "بيرو",
                "سورينام", "أوروغواي", "فنزويلا"
            ]
        },
        {
            category: 'الدول',
            contenet: 'أوقيانوسيا',
            arr: [
                "أستراليا", "فيجي", "كيريباتي", "جزر مارشال", "ميكرونيزيا", "ناورو", "نيوزيلندا", "بالاو",
                "بابوا غينيا الجديدة", "ساموا", "جزر سليمان", "تونغا", "توفالو", "فانواتو"
            ]
        },
        {
            category: 'الفواكه',
            arr: [
                "تفاح", "موز", "برتقال", "مانجو", "أناناس", "عنب", "فراولة", "توت أزرق", "بطيخ",
                "بابايا", "خوخ", "برقوق", "كمثرى", "كيوي", "ليمون", "ليمون أخضر", "كرز", "جوز هند",
                "جوافة", "رمان", "تين", "أفوكادو", "تمر", "توت العليق", "توت أسود", "فاكهة العاطفة",
                "فاكهة التنين", "ليتشي", "مشمش", "شمام", "يوسفي"
            ]
        },
        {
            category: 'الألعاب',
            arr: [
                "كرة القدم", "كرة السلة", "تنس", "كريكيت", "بيسبول", "كرة طائرة", "تنس طاولة", "ريشة طائرة",
                "هوكي", "غولف", "رجبي", "ملاكمة", "مصارعة", "سباحة", "دراجات", "تزلج", "كاراتيه", "شطرنج",
                "داما", "سنوركر", "بولينج", "ركوب الأمواج", "تزلج على الثلج", "تزلج على الجليد", "رماية", "سهام",
                "رياضات إلكترونية", "ألعاب فيديو", "كرة يد", "الضرب بالكرة"
            ]
        },
        {
            category: 'مدن المغرب',
            arr: [
                "دار البيضاء", "رباط", "فاس", "مراكش", "أكادير", "طنجة", "وجدة", "قنيطرة", "تطوان", "آسفي",
                "جديدة", "بني ملال", "ناظور", "تازة", "خريبكة", "ورزازات", "رشيدية", "سطات", "عرائش",
                "محمدية", "مكناس", "إفران", "صويرة", "حسيمة", "كلميم", "داخلة", "عيون", "تيزنيت",
                "تارودانت", "أزيلال", "بركان", "تاوريرت", "خميسات", "خنيفرة", "سيدي قاسم", "سيدي سليمان",
                "زاكورة", "طانطان", "فقيه بن صالح", "ميدلت", "جرادة", "تنغير"
            ]
        }
    ],
    fr: [
            {
                category: 'pays',
                contenet: 'afrique',
                arr: [ 
                    "algérie", "angola", "bénin", "botswana", "burkina faso", "burundi", "cap-vert", "cameroun", 
                    "république centrafricaine", "tchad", "comores", "république démocratique du congo", "république du congo", 
                    "djibouti", "égypte", "guinée équatoriale", "érythrée", "eswatini", "éthiopie", "gabon", "gambie", "ghana", 
                    "guinée", "guinée-bissau", "côte d'ivoire", "kenya", "lesotho", "libéria", "libye", "madagascar", "malawi", 
                    "mali", "mauritanie", "maurice", "maroc", "mozambique", "namibie", "niger", "nigéria", "rwanda", 
                    "sao tomé-et-principe", "sénégal", "seychelles", "sierra leone", "somalie", "afrique du sud", "soudan du sud", 
                    "soudan", "tanzanie", "togo", "tunisie", "ouganda", "zambie", "zimbabwe"
                ]
            },
            {
                category: 'pays',
                contenet: 'europe',
                arr: [
                    "albanie", "andorre", "arménie", "autriche", "azerbaïdjan", "biélorussie", "belgique", "bosnie herzégovine", 
                    "bulgarie", "croatie", "chypre", "république tchèque", "danemark", "estonie", "finlande", "france", "géorgie", 
                    "allemagne", "grèce", "hongrie", "islande", "irlande", "italie", "kazakhstan", "kosovo", "lettonie", "liechtenstein", 
                    "lituanie", "luxembourg", "malte", "moldavie", "monaco", "monténégro", "pays-bas", "macédoine du nord", "norvège", 
                    "pologne", "portugal", "roumanie", "russie", "saint-marin", "serbie", "slovaquie", "slovénie", "espagne", "suède", 
                    "suisse", "ukraine", "royaume-uni", "vatican"
                ]
            },
            {
                category: 'pays',
                contenet: 'amérique du nord',
                arr: [
                    "antigua et barbuda", "bahamas", "barbade", "belize", "canada", "costa rica", "cuba", "dominique", 
                    "république dominicaine", "salvador", "grenade", "guatemala", "haïti", "honduras", "jamaïque", "mexique", "nicaragua", 
                    "panama", "saint christophe et niévès", "sainte lucie", "saint vincent et les grenadines", "trinité et tobago", 
                    "états unis"
                ]
            },
            {
                category: 'pays',
                contenet: 'asie',
                arr: [
                    "afghanistan", "arménie", "azerbaïdjan", "bahreïn", "bangladesh", "bhoutan", "brunei", "cambodge", "chine", 
                    "chypre", "géorgie", "inde", "indonésie", "iran", "irak", "israël", "japon", "jordanie", "kazakhstan", "koweït", 
                    "kirghizistan", "laos", "liban", "malaisie", "maldives", "mongolie", "myanmar", "népal", "corée du nord", "oman", 
                    "pakistan", "palestine", "philippines", "qatar", "russie", "arabie saoudite", "singapour", "corée du sud", "sri lanka", 
                    "syrie", "taïwan", "tadjikistan", "thaïlande", "timor oriental", "turquie", "turkménistan", "émirats arabes unis", 
                    "ouzbékistan", "viêt nam", "yémen"
                ]
            },
            {
                category: 'pays',
                contenet: 'amérique du sud',
                arr: [
                    "argentine", "bolivie", "brésil", "chili", "colombie", "équateur", "guyana", "paraguay", "pérou", "suriname", 
                    "uruguay", "venezuela"
                ]
            },
            {
                category: 'pays',
                contenet: 'océanie',
                arr: [
                    "australie", "fidji", "kiribati", "îles marshall", "micronésie", "nauru", "nouvelle zélande", "palaos", 
                    "papouasie nouvelle guinée", "samoa", "îles salomon", "tonga", "tuvalu", "vanuatu"
                ]
            },
            {
                category: 'fruits',
                arr: [
                    "pomme", "banane", "orange", "mangue", "ananas", "raisin", "fraise", "myrtille", "pastèque", 
                    "papaye", "pêche", "prune", "poire", "kiwi", "citron", "citron vert", "cerise", "noix de coco", 
                    "goyave", "grenade", "figue", "avocat", "datte", "framboise", "mûre", "fruit de la passion", 
                    "fruit du dragon", "litchi", "abricot", "melon cantaloup", "mandarine"
                ]
            },
            {
                category: 'jeux',
                arr: [
                    "football", "basket-ball", "tennis", "cricket", "baseball", "volley-ball", "tennis de table", "badminton",
                    "hockey", "golf", "rugby", "boxe", "lutte", "natation", "cyclisme", "patinage", "karaté", "échecs",
                    "dames", "snooker", "bowling", "surf", "ski", "snowboard", "tir à l'arc", "fléchettes", "esports",
                    "jeux vidéo", "handball", "dodgeball"
                ]
            },
            {
                category: 'villes du maroc',
                arr: [
                    "casablanca", "rabat", "fès", "marrakech", "agadir", "tanger", "oujda", "kénitra", "tétouan", "safi",
                    "el jadida", "béni mellal", "nador", "taza", "khouribga", "ouarzazate", "errachidia", "settat", "larache",
                    "mohammédia", "meknès", "ifrane", "essaouira", "al hoceïma", "guelmim", "dakhla", "laâyoune", "tiznit",
                    "taroudant", "azilal", "berkane", "taourirt", "khémisset", "khénifra", "sidi kacem", "sidi slimane",
                    "zagora", "tan tan", "fquih ben salah", "midelt", "jerrada", "tinghir"
                ]
            }
        ]
        
} 
// for arabic
const arabletters = ['أ','ب','ت','ث','ج','ح','خ','د','ذ','ر','ز','س','ش','ص','ض','ط','ظ','ع','غ','ف','ق','ك','ل','م','ن','ه','و','ي','ا','ئ','إ','مسافة']
//
const categorychosen = {
    en:{arr :["countries", "fruit", "games", "morocco cities"]},
    fr:{arr :["pays", "fruits", "jeux", "villes du maroc"]},
    ar:{arr : ["الدول", "الفواكه", "الألعاب", "مدن المغرب"]}
}
const languages = [
                    {logo:'en', lang:'english'},
                    {logo:'fr',lang:'francais'},
                    {logo:'ar',lang:'العربية'},
                ]
//adding letter
function appendingLetterFunc(letrs){
    letterDivHolder.innerHTML = ''
    letrs.forEach((itm)=>{
        letterDivHolder.innerHTML += `<p class='letter-style letter' id='letter-${itm}'>${itm}</p>`
    })
    letters = document.querySelectorAll('.article-right-side .letter')
    resetStuff()
}
// function to fill the select 
function fillSelect(categoryArrya){
    categorySelect.textContent = ''
    categoryArrya.forEach((itm)=>{
        categorySelect.innerHTML += `<option value='${itm}'>${itm}</option>`
    })
}
//fill the language category 
function filllanguageSelectFunc(){
    languages.forEach((itm)=>{
        languageSelect.innerHTML += `<option data-lang='${itm.logo}' value='${itm.lang}'>${itm.lang}</option>`
    })
}
filllanguageSelectFunc()
    //game start function *****************************************
    startBtn.addEventListener('click',()=>{ 
    blockkey = false
    index = 0
    navigatorLangFunc()
    hangmancaracters.forEach((itm)=>{
        itm.classList.add('hidden')
    })
    gamestart = true
    inputholder.innerHTML = ''
    selectedValue = categorySelect.value.trim()
    languageLogo = languageSelect.options[languageSelect.selectedIndex].getAttribute('data-lang')
    langLogo = languageLogo
    AddingKeyDownWhenTheGameStartFunc(languageLogo)
    toCalculateHeightOFMesgefunc(languageLogo)
    if(languageLogo === 'en'){
        appendingLetterFunc(lettersArray)
    }else if(languageLogo === 'fr'){
        appendingLetterFunc(lettersFranchArray)
    }
    else{
        appendingLetterFunc(arabletters)
    }
    gamestartfunc(selectedValue,languageLogo)
    calculatethetimeFunc()
    calculateStepsFunc()
    translateFunc(languageLogo)
})
// appendingLetterFunc(lettersArray)
function gamestartfunc(selectedValue,lang){
    gameStartDiv.classList.add('hidden')
    theCategory.innerHTML = `<p class = 'wordFrom' data-key="wordFrom"> word from</p> : <span class='category'>${selectedValue}</span>`
    gettingTherightArr(selectedValue,lang)
}
//selecting the array by filtring the main array
let lastword = '';
function gettingTherightArr(word,lang){
    // let contenentchosen;
    filterdArray = GameStartChosenCategory[lang].filter((itm)=>{
        return itm.category === word
    })
    let randomNbr = Math.floor(Math.random()*filterdArray.length)
    do{
        thewordchosen = filterdArray[randomNbr].arr[Math.floor(Math.random()*filterdArray[randomNbr].arr.length)]
    }while(thewordchosen === lastword)
    lastword = thewordchosen;
    thecontenent = filterdArray[randomNbr].contenet || null
    if(!thecontenent){
        genirateInputes(thewordchosen)
        messageup(thewordchosen,'')
        return
    }else{
        let text = `<p class ='EndOfword' data-key ='fromText'>from</p>[<span class='contenentText'>${thecontenent}</span>]`
        genirateInputes(thewordchosen)
        messageup(thewordchosen,text)
    }
}
// function to display message when i start the game
function messageup(wordasArr,text){
    let firstletter = wordasArr[0]
    let lastletter = wordasArr[wordasArr.length - 1]
    adddisbaledLetter(firstletter)
    adddisbaledLetter(lastletter)
    theWordChosenPE.innerHTML = `
        <div>${text}</div>
        <div>
            <p class ='startWithText' data-key='startWithText'>contenent the word start width</p>
            [<span class='firstletter'>${firstletter}</span>]</div>
        <div>
            <p class ='EndOfword' data-key = 'EndOfword'> and the end of the word is </p>
            [<span class='secondletter'>${lastletter}</span>]
        </div>
    `
}
// adding event clicks on letters

letterDivHolder.addEventListener('click',(lettr)=>{
        const LetterContainsClass = lettr.target.classList.contains('letter')
        let currLtr = lettr.target.textContent
            if(LetterContainsClass){
                if(currLtr === 'space'|| currLtr === 'مسافة'){
                    currLtr = ' '
                }
                if(thewordchosen.split('').includes(currLtr)){
                makesoundsfunc(true)
                ToStoreAndDisplayletter(currLtr)
                TocheckTheFinalWord(lettr)
                }else{
                makesoundsfunc(false)
                handleHangManCaracterFunc(lettr)
                }
            }else{
                return null
            }
})

function genirateInputes(wordchosen){
    const wordchosenletters = wordchosen.split('')
    wordchosenletters.forEach((itm,index)=>{
        inputholder.innerHTML += `<input maxlength ='1' type ='text'  class = 'inputText'>`
        theinputsforletters = document.querySelectorAll('footer input')
    })

    theinputsforletters[0].value = wordchosenletters[0]
    toaddBorderToInput(theinputsforletters[0])
    theinputsforletters[wordchosen.length-1].value = wordchosenletters[wordchosenletters.length-1]
    toaddBorderToInput(theinputsforletters[wordchosen.length-1])
}  

function ToStoreAndDisplayletter(letter){

    if(letter === 'space'|| letter === "مساقة"){
        currLtr = ' '
    }
    if(!storeLetter[letter]){
        storeLetter[letter]=[]
        for(let i=0 ; i< thewordchosen.length ; i++){
            if(thewordchosen[i]===letter){
                storeLetter[letter].push(i)
            }
        }
        storeindex[letter] = 0
    }
    if(storeLetter[letter][storeindex[letter]] === 0 && storeLetter[letter].length > 0){
        storeindex[letter]++
        //adding border bottom
        toaddBorderToInput(theinputsforletters[storeLetter[letter][storeindex[letter]]])
        //
        theinputsforletters[storeLetter[letter][storeindex[letter]]].value = letter
        storeindex[letter]++
        adddisbaledLetter(letter)
        return
       }
    else{
        //adding border to bottom
        toaddBorderToInput(theinputsforletters[storeLetter[letter][storeindex[letter]]])
        //
        theinputsforletters[storeLetter[letter][storeindex[letter]]].value = letter
        storeindex[letter]++
        adddisbaledLetter(letter)

    }
}

let LetterinsideTheword = {};
let visitedLetter={}
function adddisbaledLetter(letter){
    if(!LetterinsideTheword[letter]){
        let nberofletterisideword = 0
        for(i=0 ; i < thewordchosen.length ; i++){
            if(thewordchosen[i] === letter){
                nberofletterisideword++
            }
        }
        LetterinsideTheword[letter] = nberofletterisideword
        visitedLetter[letter]=0
    }
    visitedLetter[letter]++
    if(visitedLetter[letter] === LetterinsideTheword[letter]){
       let letr = [...letters].find((itm,index)=>{
            if(letter === ' ' ){
                if(langLogo === 'en'|| langLogo === 'fr'){
                    return [...letters][index].textContent === 'space'
                }else if(langLogo === 'ar'){
                    return [...letters][index].textContent === 'مسافة'
                }
            }
                return itm.textContent === letter
        }) 
        letr.classList.add('letterDisabled')
    }
}

function makesoundsfunc(condition){
    if(condition){
        correctsound.play()
    }else{
        wrongsound.play()
        tries--
        stepsholder.textContent = tries
    }
}

function TocheckTheFinalWord(letter){
    let thewordfinal = ''
    theinputsforletters.forEach((itm)=>{
        thewordfinal += itm.value
    })
    if(thewordfinal.trim().toLowerCase() === thewordchosen.trim().toLowerCase()){
        blockkey = true
        todiablelettersFunc()
        toBlockLettersFunc(letter)
        setTimeout(()=>{
            resetLettersAndHideHangManCaracters()
            messageForlateFunc('victory','congrasilution for finding the word :','exact')
            goodresult.play()
        },500)
    }
}

function messageForlateFunc(miza,text,result){
    let message = `<div class = 'resultOfTheGameDiv'>
                        <p class = 'VectoryOrDeafait ${miza}' data-key=${miza}>${miza}</p>
                        <div class = 'exact-holder'><p class= 'exact' data-key = ${result}>${text}</p><span class='wordfinal'>${thewordchosen}</span> </div>
                        <div id = 'selector'>
                        <div class='selectorForCategory div1'>
                                <p class='text1' data-key="changecategory">select category</p>
                        </div>
                        <div class='selectorForlanguage div2'>
                                <p class='text2' data-key="changeLanguage">select language</p>
                        </div>
                        </div>
                        <button class='StartGameAgainBtn' data-key='startagain'>start again</button>
                    </div>`
    divforresult.innerHTML = message
    translateFunc(languageLogo)
    let selectorHolder = document.getElementById('selector')
    let categorySlectorDiv = document.querySelector('.selectorForCategory')
    let languageSlectorDiv = document.querySelector('.selectorForlanguage')
    //
    categorySlectorDiv.appendChild(categorySelect)
    languageSlectorDiv.appendChild(languageSelect)
    //
    selectorHolder.append(languageSlectorDiv,categorySlectorDiv)
    gamestart = false
}

//function to to reset things
function resetStuff(){
    letters.forEach((itm)=>[
        itm.classList.remove('letterDisabled')
    ])
    divforresult.classList.add('hidden')
    LetterinsideTheword = {}
    visitedLetter = {}
    storeLetter = {}
    storeindex = {}
}

// function to add border to inputs
function toaddBorderToInput(intBorderBottom){
    intBorderBottom.classList.add('clr-border')
}
//adding the key even to the 
function addEnterKey(){
    document.addEventListener('keydown',(event)=>{
        if(event.key === 'Enter' && gamestart === false){
            startBtn.click()
            return
        }else{
            return
        }
    })

    DivForRsultOfThegame.addEventListener('click',(itm)=>{
        if(itm.target.classList.contains('StartGameAgainBtn')){
            resetStuff()
            startBtn.click()
            return
        }
    })

}
addEnterKey()
// function to use when i start the game
function AddingKeyDownWhenTheGameStartFunc(lang){
    document.removeEventListener('keydown',addEnterKey)
    if(callkeyboardFunc){
        document.removeEventListener('keydown',callkeyboardFunc)
    }
    document.addEventListener('keydown',callkeyboardFunc)
}
let callkeyboardFunc = (event)=>{
    keydownhundler(event,languageLogo)
}
//hundleing the keyboadrd function
keydownhundler = function (event,lang){
        if(blockkey === true){
            event.preventDefault()
            return
        }
        let KeyFinal = ''
        let Arraychosing
        // navigatorLangFunc(event.key,lang)
        switch (lang) {
            case 'en':
                    Arraychosing = lettersArray
                break;
            case 'fr':
                    Arraychosing = lettersFranchArray
                break;
            case 'ar':
                    Arraychosing = arabletters
                break;
        }
        if(event.key === ''){
            KeyFinal = lang === 'en'||lang === 'fr'? 'space':'مسافة'
        }else{
            KeyFinal = event.key
        }
            if(Arraychosing.includes(KeyFinal)){
                    let inputfocused = [...letters].find((itm)=>{
                    return itm.textContent === KeyFinal
            })
            if(inputfocused.classList.contains('letterDisabled') && gamestart === false){
                return null}
            if(inputfocused.classList.contains('letterDisabled') && gamestart === true){
                    MsgForExistingLetter.style.height  = HeightOfMessageForLetterExisiting + 'px'
                    MsgForExistingLetter.style.padding = '15px 20px'
                        setTimeout(()=>{
                            MsgForExistingLetter.style.height = '0px'
                            MsgForExistingLetter.style.padding = '0px'
                        },500)

                    return
            }
         inputfocused.click()
        }
}
// working on menu icon
menuIcon.addEventListener('click',()=>{
    divForMenu.classList.toggle('hidden')
    appendItmsInsideMenu()
    doneBtn.classList.remove('hidden')
    textTranslateFunc(languageLogo)
})
// function to append items inside the menu div
function appendItmsInsideMenu(){
    let theItemsMessage = `<div class = 'MainDivForIcon'>
                                <div class = 'firstDiv'>
                                    <p data-key ='changecategory'>change category</p>
                                </div>
                                <div class = 'SecondDiv'>
                                    <p data-key = 'changeLanguage'>change languge</p>
                                </div>
                                <div class = 'confirmationDiv hidden'></div>
                                <button class='doneBtn' data-key = 'doneBtn'>save</button>
                            </div>`
    divForMenu.innerHTML  = theItemsMessage
    MainDivForIcon = document.querySelector('.MainDivForIcon')
    let categoryinsideMenu = document.querySelector('.MainDivForIcon .firstDiv')
    //appending 
    categoryinsideMenu.appendChild(categorySelect)
    //
    let languageinsideMenu = document.querySelector('.MainDivForIcon .SecondDiv')
    //appending
    languageinsideMenu.appendChild(languageSelect)
    //selecting done Btn
    confimationDiv = document.querySelector('.confirmationDiv')
    doneBtn = document.querySelector('.MainDivForIcon .doneBtn')

}
divForMenu.addEventListener('click',(itm)=>{
    let OldLangLogo = languageSelect.options[languageSelect.selectedIndex].getAttribute('data-lang')
    if(itm.target.classList.contains('doneBtn')){

        if(categorySelect.value !== selectedValue || languageLogo !== OldLangLogo){
            let message = `<div class = 'main-confirmation'>
            <p data-key = 'confirmationChangeMsg'>are you sure you want to change setting</p>
            <div class = 'confirmationBtns'>
                <button class ='btnYes' data-key='btnYes'>yes</button>
                <button class ='btnNo' data-key='btnNo'>no</button>
            </div>
            </div>`
            confimationDiv.classList.remove('hidden')
            doneBtn.classList.add('hidden')
            confimationDiv.innerHTML = message
            languageLogo = languageSelect.options[languageSelect.selectedIndex].getAttribute('data-lang')
            textTranslateFunc(languageLogo)
            return
        }else{
            divForMenu.classList.toggle('hidden')
            return null
        }
    }
    if(itm.target.classList.contains('btnYes')){
        confimationFunc(true)
    }
    if(itm.target.classList.contains('btnNo')){
        doneBtn.classList.remove('hidden')
        divForMenu.classList.toggle('hidden')
        confimationFunc(false)
    }
})
function confimationFunc(condition){
    if(condition){
            divForMenu.classList.add('hidden')
            startBtn.click()        
    }else{
        confimationDiv.classList.add('hidden')
        return
    }
}
// function to selcteveryelement datakey
function translateFunc(lang){
    translateTextsFunc(lang)
    document.documentElement.lang = lang
    document.documentElement.dir =(dir = lang === 'ar'? 'rtl':'ltr')
}
// translate only text
function translateTextsFunc(lang){
    key = document.querySelectorAll('[data-key]')
    key.forEach((el)=>{
        let key = el.getAttribute('data-key')
        el.textContent = translitLanguage[lang][key]
    })
}
//translate only the text
function textTranslateFunc(lang){
    document.documentElement.lang = lang
    if(languageSelect.parentElement.parentElement.parentElement.id=== 'gamestart' || languageSelect.parentElement.parentElement.parentElement.parentElement.id=== 'resultDiv'){
        translateTextsFunc(lang)
        if(languageSelect.parentElement.parentElement.parentElement.id=== 'gamestart'){
            gameStartDiv.dir = (dir = lang === 'ar'?'rtl':'ltr')
            return
        }
        if(languageSelect.parentElement.parentElement.parentElement.parentElement.id=== 'resultDiv'){
            divforresult.dir = (dir = lang === 'ar'?'rtl':'ltr')
            return
        }
        // return
    }
    if(languageSelect.parentElement.parentElement.parentElement.id=== 'menuDiv'){
        key = document.querySelectorAll('.divForMenu [data-key]')
        key.forEach((el)=>{
            let key = el.getAttribute('data-key')
            el.textContent = translitLanguage[lang][key]
        })
        MainDivForIcon.dir = (dir = lang === 'ar' ? 'rtl':'ltr')
        return
    }
}
// translateFunc('ar')
window.addEventListener('load',()=>{
    let language = categorychosen[trakOfLang]['arr']
    doneInsideMsg.addEventListener('click',()=>{
        MsgForChangingLang.classList.add('hidden')
        blockkey = false
    })
    fillSelect(language)
})
// working on the select lanuage
languageSelect.addEventListener('change',()=>{
    let languageLogo = languageSelect.options[languageSelect.selectedIndex].getAttribute('data-lang')
    let logo = categorychosen[languageLogo]['arr'] 
    textTranslateFunc(languageLogo)
    fillSelect(logo)
})

//function to calculute the hangmen caracter and display each part
function handleHangManCaracterFunc(letter){
    // calculateStepsFunc()
    end = Math.min( index + StepsToShow , hangmancaracters.length)
    for(let  i = index ; i < end ; i++ ){
        hangmancaracters[i].classList.remove('hidden')
    }
    index = end
    if( index === hangmancaracters.length){
        blockkey = true
        toBlockLettersFunc(letter)
        setTimeout(lastresult,500)
    }
}
function calculateStepsFunc(){
    if(thewordchosen.length > 9){
        StepsToShow = Math.ceil(hangmancaracters.length / 11)
    }
    else if (thewordchosen.length > 5 && thewordchosen.length <= 9){
        StepsToShow = Math.ceil(hangmancaracters.length / 5)
    }else if (thewordchosen.length >= 2 && thewordchosen.length <= 5){
        StepsToShow = Math.ceil(hangmancaracters.length / 2)
    }else{
        console.log('none of this conditions is true')
    }
    tries = Math.ceil( hangmancaracters.length / StepsToShow)
    stepsholder.textContent = tries
}
function lastresult(){
    todiablelettersFunc()
    resetLettersAndHideHangManCaracters()
    messageForlateFunc('defeat','currect word is','lose')
    badresult.play()
}
function todiablelettersFunc(){
    letters.forEach((itm)=>{
        itm.classList.add('letterDisabled')
    })
}
function resetLettersAndHideHangManCaracters(){
    hangmancaracters.forEach((itm)=>{
        itm.classList.add('hidden')
    })
    divforresult.classList.remove('hidden')
}
function toCalculateHeightOFMesgefunc(languageLogo){
    if(languageLogo === 'ar'){
        MsgForExistingLetter.textContent = 'هدا الحرف مكتوب مسبقا'
    }
    if(languageLogo === 'en'){
        MsgForExistingLetter.textContent = 'this letter exist already'
    }
    HeightOfMessageForLetterExisiting = MsgForExistingLetter.scrollHeight
}

// function to see what lanuage in the navigator

function navigatorLangFunc(){
    document.addEventListener('keydown',(letter)=>{
        toBlockLettersFunc(letter)
        if(letter.key.length > 1) return 
        if(languageLogo === 'en'||languageLogo === 'fr'){
            if(!/[ء-ي]/.test(letter.key)){
                return
            }else{
                MsgForChangingLang.classList.remove('hidden')
                blockkey = true
                translateFunc(languageLogo)
            }
            return
        }
        if(languageLogo === 'ar'){
            if(!/[a-zA-Z]/.test(letter.key)){
                return
            }else{
                MsgForChangingLang.classList.remove('hidden')
                blockkey = true
                translateFunc(languageLogo)
            }
            return
        }
    })
}

function toBlockLettersFunc(letter){
    if(blockkey === true){
        letter.preventDefault()
        return
    }
}

function calculatethetimeFunc(){
    countDownHoler.dir = 'ltr'

        if(countDown){
            clearInterval(countDown)
        }

    let currentdate = Date.now() + (2*60* 1000)
    let remining = (currentdate  - Date.now()) 

    countDownHoler.textContent = `${Math.max(0 , Math.floor(remining / (1000 * 60))).toString().padStart(2,'0')} : ${Math.max(0 , Math.ceil((remining % (1000 * 60))/(1000))).toString().padStart(2,'0')}`

    // count down
    countDown = setInterval(()=>{
            remining = Math.ceil(( currentdate - Date.now()))
            if(remining <= '0'){
                DisplayHangManCaractersFunc()
                setTimeout(lastresult,500)
                clearInterval(countDown)
            }
            countDownHoler.textContent = `${Math.max(0 , Math.floor(remining / (1000 * 60))).toString().padStart(2,'0')} : ${Math.max(0 , Math.ceil((remining % (1000 * 60))/(1000))).toString().padStart(2,'0')}`
    },1000)
}
//function to display hangman caracters
function DisplayHangManCaractersFunc(){
    hangmancaracters.forEach((itm)=>{
        itm.classList.remove('hidden')
    })
}

// reole again button

reroleAgain.addEventListener("click",reroleAgainFunc)
function reroleAgainFunc(){
    // console.log(' you just presset the reole button')
    startBtn.click()
}