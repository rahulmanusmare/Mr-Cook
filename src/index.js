const SKILL_NAME = 'Mr Cook';
const HELP_MESSAGE = 'You can say tell me a something to eat, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';
const GET_FOOD_ITEM = 'You Should Try Having ';
const UNDEFINED_FOOD_ITEM = 'Sorry, No Food Item for Now Check Out Later !';

var Alexa = require('alexa-sdk');

var Food_Item_List = [
        {
                Id : 1101001,
                Name : 'Uttapam',
                Frequency : 0
        },
        {
                Id : 1101002,
                Name : 'Sambar Vada',
                Frequency : 0
        },
	    {
	            Id : 1101003,
	            Name: 'Dosa',
	            Frequency:0
        },
        {
                Id:1101004,
	            Name: 'pongal',
	            Frequency : 0
        },
        {
                Id:1101005,
	            Name : 'Kongunadu Chicken',
	            Frequency : 0
        },
        {
                Id:1101006,
	            Name:'egg curry',
	            Frequency:0
        },
        {
                Id:1103001,
	            Name:'Luncknawi Aaloo Masala Chat',
	            Frequency:0
        },
        {
                Id:1103002,
                Name:'Raj kachori',
                Frequency:0
        },
        {
                Id:1103003,
                Name:'Dahi papdi chat',
                Frequency:0,
        },
        {
                Id:1103004,
                Name:'dahi wada',
                Frequency : 0,
        },
        {
                Name : 'Pani Puri',
                Frequency: 0,
                Id:1103005,
        },
        {
                Name :'Mumbai bhel',
                Frequency: 0,
                Id:1103006,
        },
        {
                Name: 'Dahi samosa',
                Frequency: 0,
	            Id:1103007,
        },
        {
	            Name:'Grilled vegetrain sandwich',
	            Frequency:0,
	            Id:1104001,
        },
        {
                Name:'vegetable cheese burger',
                Frequency: 0,
	            Id:1104001,
        },
        {
                Name:'vegetable cutlets',
                Frequency: 0,
	            Id:1104002,
        },
        {
                Name:'plain cheese pizza',
                Frequency:0,
                Id:1104003,
        },
        {
                Name:'panner roll',
                Frequency:0,
 	            Id:1104004,
        },
        {
	            Name:'Veg manchurian',
                Frequency:0,
		        Id:1105001,
        },
        {
                Name:'Veg crispy',
                Frequency:0,
	            Id:1105002,
        },
        {
                Name:'Chilli panner',
                Frequency:0,
	            Id:1105003,
        },
        {
                Name:'panner 65',
                Frequency:0,
	            Id:1105004,
        },
        {
                Name:'Fried rice',
                Frequency:0,
	            Id:1105005,
        },
        {
                Name:'plain noodles',
                Frequency:0,
	            Id:1105006,
        },
        {
                Name:'Hakka noodles',
                Frequency:0,
	            Id:1105007,
        },
        {
	            Name:'sweet corn',
                Frequency:0,
	            Id:1106001,
        },
        {
                Name:'lemon coriander',
                Frequency:0,
	            Id:1106002,
        },
        {
                Name:'veg noodle soup',
                Frequency:0,
                Id:1106003,
        },
        {
                Name:'lung fung',
                Frequency:0,
	            Id:1106004,
        },
        {
                Name:'Chilli chicken',
                Frequency:0,
	            Id:1106004,
        },
        {
                Name:'chicken loolipop',
                Frequency:0,
	            Id:1106005,
        },
        {
	            Name:'egg Fried rice',
                Frequency:0,
	            Id:1106006,
        },
        {
	            Name:'Itallian pasta',
	            Frequency:0,
	            Id:1107001,
        },
        {
	            Name:'sushi',
	            Frequency:0,
	            Id:1108001,
        },
        {
                Name:'Mushroom chill hosin sause',
                Frequency:0,
                Id:1108002,
        },
];

var Category_Contents = [
    {
        Id : 101,
        Name : 'SOUTH INDIA',
        Frequency : 6
    },
    {
        Id : 102,
        Name : 'NORTH INDIA',
        Frequency : 0
    },
    {
        Id : 103,
        Name : 'CHAAT',
        Frequency : 7
    },
    {
        Id : 104,
        Name : 'SNACK',
        Frequency : 4
    },
    {
        Id : 105,
        Name : 'CHINA',
        Frequency : 7
    },
    {
        Id : 106,
        Name : 'SOUP',
        Frequency : 6
    },
    {
        Id : 107,
        Name : 'ITALY',
        Frequency : 1
    },
    {
        Id : 108,
        Name : 'JAPAN',
        Frequency : 2
    },
]

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context, callback);

    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function() { //Executes when a new session is launched
        this.emit('LaunchIntent');
    },

    'LaunchIntent': function() {
        this.emit(':ask', "Would you like to eat something specific?");
    },

    'SuggestNewFoodItem' : function () {
        this.emit ('LaunchIntent');
    },

    'AnswerIntent' : function () {
        var answer = this.event.request.intent.slots.Answer.value;
        answer = answer.toUpperCase ();
        if (answer == 'YES') {
            this.emit ('SuggestSpesificFoodItem');
        } else {
            this.emit ('SuggestRandomFoodItem');
        }
    },

    'SpecificFoodIntent' : function () {
        var Flag = false;
        var Random_Food_Item_Index;
        var Random_Food_Item;
        var Category = this.event.request.intent.slots.category.value;
        Category = Category.toUpperCase ();
        for (var i=0;i<Category_Contents.length;i++) {
            if (Category == Category_Contents [i].Name) {
                if (Category_Contents [i].Frequency > 0) {
                    Flag = true;
                    Random_Food_Item_Index = Math.floor(Math.random() * Category_Contents [i].Frequency);
                    Random_Food_Item_Index = (1 + Random_Food_Item_Index) + (Category_Contents [i].Id * 1000) + 1000000;
                    break;
                }
            }
        }
        for (var j=0;j<Food_Item_List.length;j++) {
            if (Food_Item_List [j].Id == Random_Food_Item_Index) {
                Random_Food_Item = Food_Item_List [j].Name;
            }
        }

        if (Flag == false) {
            this.response.cardRenderer(SKILL_NAME, UNDEFINED_FOOD_ITEM);
            this.response.speak(UNDEFINED_FOOD_ITEM);
            this.emit(':responseReady');
        } else {
            const Speech_Content = GET_FOOD_ITEM + Random_Food_Item;
            this.response.cardRenderer(SKILL_NAME, Speech_Content);
            this.response.speak(Speech_Content);
            this.emit(':responseReady');
        }
    },

    'SuggestRandomFoodItem' : function () {
        var Random_Food_Item_Index = Math.floor(Math.random() * Food_Item_List.length);
        var Random_Food_Item = Food_Item_List [Random_Food_Item_Index].Name;

        this.emit(':tell', GET_FOOD_ITEM + Random_Food_Item);
    },

    'SuggestSpesificFoodItem' : function () {
        this.emit(':ask', 'What Would you Like to eat ?');
    },

    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};
