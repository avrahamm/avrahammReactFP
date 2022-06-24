export function convertArrayToObject(items) {
    const obj = {};
    if (Array.isArray(items)) {
        items.forEach(item => {
            obj[item.id] = item;
        })
    }
    return obj;
}

export function convertObjectToItemsArray(obj)
{
    return Object.keys(obj).map(id => obj[id]);
}