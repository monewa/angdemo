

function bring(){
    confirm('bring it')  
}
  // var x= getElementById('field')
  // x.value= 'f'
  // return 'fetched'    

function activateNavMenu(menuId) {
  removeClasses();
  w3.addClass(menuId,'active');
}

function removeClasses() {
  w3.removeClass('.menu1','active');
  w3.removeClass('.menu2','active');
  w3.removeClass('.menu3','active');  
}