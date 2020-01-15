export let style = {
    parent : {},
    child : {}
};

export const setStyle = (styleView) => {
    if(styleView==='list'){
         style.parent = {
            flexDirection : 'column', 
        }
        style.child = {
            width : '100%',
            display : 'flex',
            alignItems : 'center',
            justifyContent : 'space-around',
            borderBottom: '1px solid #dadada',
        }
    }
    else{
        style.parent = {};
        style.child = {};
    }
}