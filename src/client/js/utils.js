
function getCurrentDate(inputData='') {
  var lastDate = new Date();
  lastDate.setDate(lastDate.getDate() - 7);//any date you want
  $("#datepickerFrom").datepicker('setDate', lastDate);
  return inputData.match(regex)

}

export { getCurrentDate };
