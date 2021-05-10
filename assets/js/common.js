
getcurrentDate(function (){
    var currentDate = new Date();
    var currentDateWithFormat = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    return currentDateWithFormat;
    //console.log(currentDateWithFormat)
})