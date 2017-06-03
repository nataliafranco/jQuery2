$(document).ready(function() {


  var advanceTask = function(task) {
    var modified = task.innerText.trim()
    for (var i = 0; i < listo.length; i++) {
      if (listo[i].task === modified) {
        if (listo[i].id === 'new') {
          listo[i].id = 'inProgress';
        } else if (listo[i].id === 'inProgress') {
          listo[i].id = 'archived';
        } else {
          listo.splice(i, 1);
        }
        break;
      }
    }
    task.remove();
  };

//hides newTaskForm when doc loads
  $('#newTaskForm').hide();

//main array for storing tasks
  var listo = [];

//task constructor so users can create object tasks for their lists
  var Task = function(task) {
    this.task = task;
    this.id = 'new';
  }

//addTask function here
var addTask = function(task) {
  if(task) {
    task = new Task(task);
    listo.push(task);

    $('#newItemInput').val('');
  	$('#newList').append(
                          '<a href="#finish" class="" id="item">' +
                          '<li class="list-group-item">' +
                          '<h3>' + task.task + '</h3>'+
                          '<span class="arrow pull-right">' +
                          '<i class="glyphicon glyphicon-arrow-right">' +
                          '</span>' +
                          '</li>' +
                          '</a>'
                      );
    }
    $('#newTaskForm').slideToggle('fast', 'linear');
  };

//jQuery event to call addTask when button is clicked
  $('#saveNewItem').on('click', function (e) {
    e.preventDefault();
    var task = $('#newItemInput').val().trim();
    addTask(task);
  });

//Open and close the new task form

//opens form
  $('#add-todo').on('click', function () {
    $('#newTaskForm').fadeToggle('fast', 'linear');
  });
//closes form
  $('#cancel').on('click', function (e) {
    e.preventDefault();
    $('#newTaskForm').fadeToggle('fast', 'linear');
  });

//changes the status of an item from 'new' to 'inProgress'
  $(document).on('click', '#item', function(e) {
	   e.preventDefault();
    var task = this;
    advanceTask(task);
    this.id = 'inProgress';
    $('#currentList').append(this.outerHTML);
});

//changes the status of an item from 'nProgress' to 'archived'
  $(document).on('click', '#inProgress', function (e) {
    e.preventDefault();
    var task = this;
    task.id = "archived";
    var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
    advanceTask(task);
    $('#archivedList').append(changeIcon);
  });

//deletes the items off the list
  $(document).on('click', '#archived', function (e) {
    e.preventDefault();
    var task = this;
    advanceTask(task);
  });

//end of jQuery
});
