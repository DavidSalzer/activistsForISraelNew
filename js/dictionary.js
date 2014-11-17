//match logo and name to feature.
var featureDictionary = [];
featureDictionary['article'] = { featureLogo: './img/article.png', featureName: 'מאמרים' };
featureDictionary['talkback'] = { featureLogo: './img/whatsup.png', featureName: 'הפורום' };
featureDictionary['channel'] = { featureLogo: './img/youtube.png', featureName: 'יוטיוב' };
featureDictionary['facebookBennet'] = { featureLogo: './img/NaftaliBennett.png', featureName: 'פייסבוק' };
featureDictionary['facebookPoalim'] = { featureLogo: './img/actionforisrael.png', featureName: 'פייסבוק פועלים' };
featureDictionary['poll'] = { featureLogo: './img/poll.png', featureName: 'סקרים' };
featureDictionary['meme'] = { featureLogo: './img/meme.png', featureName: 'ממים' };
featureDictionary['event'] = { featureLogo: './img/calendar.png', featureName: 'אירועים' };

console.log(featureDictionary);

var shareDetailes = [];
shareDetailes['main-menu'] = {message:'רוצים להצטרף לאחליקציה של בנט?'};
shareDetailes['talkback'] = {message:'רוצים לכתוב בפורום של האחליקציה? היכנסו לכאן!'};
shareDetailes['comments'] = {message:'בואו תראו מה כתוב באחליקציה של בנט', hasContent: true};
shareDetailes['poll'] = {message:'בואו תשתתפו גם אתם בסקר באחליקציה של בנט'};
shareDetailes['poll-view'] = {message:'בואו תשתתפו גם אתם בסקר באחליקציה של בנט', hasTitle: true};
shareDetailes['meme'] = {message:'בואו לראות וליצור ממים באחליקציה של בנט'};
shareDetailes['single-meme'] = {message:'בואו תראו מם באחליקציה של בנט'};
shareDetailes['event'] = {message:'בואו תראו מה קורה באחליקציה של בנט'};
shareDetailes['single-event'] = {message:'אירוע חשוב - בואו הצטרפו!', hasTitle: true};
shareDetailes['channel'] = {message:'צפו בסרטונים באחליקציה של בנט'};
shareDetailes['facebookBennet'] = {message:'צפו בדף פייסבוק של בנט דרך האחליקציה'};
//shareDetailes['user-profile'] = {message:''};

var errorMessages = {};
errorMessages.generalError = 'אירעה שגיאה, בדוק חיבור לאינטרנט או נסה שנית';
errorMessages.unConfirmed = 'לא אישרת הצטרפות לאפליקציה במייל';
errorMessages.shortPassword = 'הסיסמה צריכה להיות באורך שישה תווים לפחות';
//errorMessages.shortPassword = 'הסיסמה צריכה להיות באורך שישה תווים לפחות';