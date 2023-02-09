// internal data types
// -----------------------------------------------------------------------------
type ShopingItemType = {
  title: string;
  price: number;
  currency: string;
  date: string;
};
interface INodeElement {
  firstName: string;
  lastName: string;
  age: number;
  birthDate: string;
  shoppingItemsList?: ShopingItemType[];
}
type Chat = { title: string; nodesList: INodeElement[] };

// external data types
// -----------------------------------------------------------------------------
type Timestamp = { seconds: number; nanos: number };
type ExtShopingItemType = {
  Title: string;
  Price: number;
  Currency: string;
  Date: Timestamp;
};
interface IExtNodeElement {
  FirstName: string;
  LastName: string;
  Age: number;
  BirthDate: Timestamp;
  ShoppingItems: ExtShopingItemType[];
}
type ExtChat = { Title: string; ChatItems?: IExtNodeElement[] }; // ? to test

// internal data
// -----------------------------------------------------------------------------
const item1: ShopingItemType = {
  title: "iphone",
  price: 3000,
  currency: "usd",
  date: "12/02/2022",
};
const item2: ShopingItemType = {
  title: "thinkpad",
  price: 4000,
  currency: "usd",
  date: "14/04/2022",
};
const user1: INodeElement = {
  firstName: "tahbert",
  lastName: "nguyen",
  age: 30,
  birthDate: "19/01/1994",
  shoppingItemsList: [item1, item2],
};
const user2: INodeElement = {
  firstName: "thuan",
  lastName: "pham",
  age: 32,
  birthDate: "20/02/1992",
  shoppingItemsList: [item1, item2],
};
const chat1: Chat = {
  title: "today buyers",
  nodesList: [user1, user2],
};

// converter
// -----------------------------------------------------------------------------
const converter = (chat: Chat): ExtChat => {
  // hanling timestamp
  const getTimeStamp = (stringData: string) => {
    const timeData = Date.parse(stringData);
    const toSeconds = timeData / 1000;
    const toNanos = timeData * 1000000;
    const timeStamp: Timestamp = {
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
    const itemLen = chat.nodesList[i].shoppingItemsList?.length;
    let itemsArr = [];

    // converting ShoppingItems
    if (items && itemLen) {
      for (let i = 0; i < itemLen; i++) {
        let extItem: ExtShopingItemType = {
          Title: items[i].title,
          Price: items[i].price,
          Currency: items[i].currency,
          Date: getTimeStamp(items[i].date),
        };
        itemsArr.push(extItem);
      }
    }
    let extUser: IExtNodeElement = {
      FirstName: chat.nodesList[i].firstName,
      LastName: chat.nodesList[i].lastName,
      Age: chat.nodesList[i].age,
      BirthDate: getTimeStamp(chat.nodesList[i].birthDate),
      ShoppingItems: itemsArr,
    };
    extUsersArr.push(extUser);
  }

  // returning: please see loging in the terminal to see the result
  const extChat: ExtChat = {
    Title: chat.title,
    ChatItems: extUsersArr,
  };
  console.log(extChat);
  return extChat;
};

converter(chat1);
