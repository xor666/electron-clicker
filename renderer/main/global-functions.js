function eraseSaveObject(){
  localStorage.removeItem('save-object');
}
function save(){
  localStorage.setItem('save-object', JSON.stringify(saveObject));
}
