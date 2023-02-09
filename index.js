"use strict";
// internal data
// -----------------------------------------------------------------------------
const item1 = {
    title: "iphone",
    price: 3000,
    currency: "usd",
    date: "12/02/2022",
};
const item2 = {
    title: "thinkpad",
    price: 4000,
    currency: "usd",
    date: "14/04/2022",
};
const user1 = {
    firstName: "tahbert",
    lastName: "nguyen",
    age: 30,
    birthDate: "19/01/1994",
    shoppingItemsList: [item1, item2],
};
const user2 = {
    firstName: "thuan",
    lastName: "pham",
    age: 32,
    birthDate: "20/02/1992",
    shoppingItemsList: [item1, item2],
};
const chat1 = {
    title: "today buyers",
    nodesList: [user1, user2],
};
// converter
// -----------------------------------------------------------------------------
const converter = (chat) => {
    var _a;
    // hanling timestamp
    const getTimeStamp = (stringData) => {
        const timeData = Date.parse(stringData);
        const toSeconds = timeData / 1000;
        const toNanos = timeData * 1000000;
        const timeStamp = {
            seconds: toSeconds,
            nanos: toNanos,
        };
        return timeStamp;
    };
    // converting ChatItems
    let extUsersArr = [];
    const chatLen = chat.nodesList.length;
    for (let i = 0; i < chatLen; i++) {
        const items = chat.nodesList[i].shoppingItemsList;
        const itemLen = (_a = chat.nodesList[i].shoppingItemsList) === null || _a === void 0 ? void 0 : _a.length;
        let itemsArr = [];
        // converting ShoppingItems
        if (items && itemLen) {
            for (let i = 0; i < itemLen; i++) {
                let extItem = {
                    Title: items[i].title,
                    Price: items[i].price,
                    Currency: items[i].currency,
                    Date: getTimeStamp(items[i].date),
                };
                itemsArr.push(extItem);
            }
        }
        let extUser = {
            FirstName: chat.nodesList[i].firstName,
            LastName: chat.nodesList[i].lastName,
            Age: chat.nodesList[i].age,
            BirthDate: getTimeStamp(chat.nodesList[i].birthDate),
            ShoppingItems: itemsArr,
        };
        extUsersArr.push(extUser);
    }
    // returning: please see loging in the terminal to see the result
    const extChat = {
        Title: chat.title,
        ChatItems: extUsersArr,
    };
    console.log(extChat);
    return extChat;
};
converter(chat1);
