export const updateObjectInArray = (items: any, itemId: any, objPropName: any, newObjProp: any) =>{
    return items.map((i: any) => {
        if(i[objPropName] === itemId) return {...i, ...newObjProp};
        return i;
    });
};