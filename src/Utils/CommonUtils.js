export function convertArrayToObject(items) {
    const obj = {};
    if (Array.isArray(items)) {
        items.forEach(item => {
            obj[item.id] = item;
        })
    }
    return obj;
}

export function groupItemsByUserId(itemsArray) {
    const reducer = (userIdItemsMap = {}, item) => {
        let userId = item.userId;
        if ( userIdItemsMap[userId] === undefined ) {
            userIdItemsMap[userId] = {
                [item.id]: item
            }
        }
        else {
            userIdItemsMap[userId][item.id] = item;
        }
        return userIdItemsMap;
    };

    let userIdItemsMap = {};

    userIdItemsMap = itemsArray.reduce(reducer, userIdItemsMap);
    return userIdItemsMap;
}

export function convertObjectToItemsArray(obj)
{
    if (!obj) {
        return [];
    }
    return Object.keys(obj).map(id => obj[id]);
}