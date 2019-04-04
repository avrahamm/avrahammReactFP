// export default function filterFromUndefined (array)
export function filterFromUndefined (array)
{
    let filteredItems = array.filter(item =>
    {
        return (item !== "undefined");
    });
    return filteredItems;
}