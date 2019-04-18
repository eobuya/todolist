var inputBox;

//adding an item with (an argument in it)
function addItem(item) {
 $('#input').before('<div class="me-want to-do panel-body"><span class="glyphicon glyphicon-minus" aria-hidden="true" /> ' + item + '</div>');

 var it = $('.me-want');
 it.fadeOut(0);
 it.fadeIn(1000);
 it.removeClass('me-want');
 it.hover(addRemoveIcon, addRemoveIcon);

}

//saving the list
function saveList() {
  var list = [];
  $('#list .to-do').each(function() { list.push($(this).text()) });
  var cookie = list.join(', ');
  cookie = cookie.substring(1, cookie.length);

  console.log('Saving cookie as "' + cookie + '"');
  $.cookie('list', cookie, { expires: 180 });
  console.log('Cookie: ' + $.cookie('list'));
}

//loading the list
function loadList() {
  var items = $.cookie('list');
	console.log("Loaded cookie as " + items);
	if(items === undefined || items == '')
		return;

	items = items.split(', ');
	for (i in items) {
		addItem(items[i]);
	}
}

//Add an item (for the add button)
function add() {

  if(inputBox.val() == '') {
    console.log("Please input an item to add");
    return;
  }

  addItem(inputBox.val());
  inputBox.val('');
}

//Remove an item (when tap/swipe to uncheck item)
function remove(element) {
  var item = $(this);

  item.find('span').removeClass("glyphicon-trash");
  item.find('span').removeClass("text-warning");
  item.find('span').addClass("glyphicon-ok");
  item.fadeOut(1000, function() {
    item.remove();
  });
}

//Clear Items that have been added
function clear() {
  var items = $('.to-do');
  var clearitems = items.find('span');

  clearitems.removeClass('glyphicon-minus');
  clearitems.addClass('glyphicon-ok');
  items.fadeOut(1000, function() {
    items.remove();
    saveList();
  });
}

function addRemoveIcon() {
  var glyph = $(this).find('span');

  if (glyph.hasClass('glyphicon-ok'))
  return;

  glyph.toggleClass('glyphicon-minus');
  glyph.toggleClass('glyphicon-trash');
  glyph.toggleClass('text-warning');
}

function onKeyPress(event) {
  if(event.keyCode == 13)
  add();
}

$(document).ready(function () {

  inputBox = $('input[name="add-to-list"]');

  $('#add').click(add);
  $('#clear').click(clear);
  inputBox.keypress(onKeyPress);
  $('#list').on('click', '.to-do', remove);

  loadList();
  $('#script-error').remove();
});
