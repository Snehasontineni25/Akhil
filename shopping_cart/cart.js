function delete_handler()
{
	var order_id = $(this).data('id');
	order_id = order_id.trim();
	order_id = order_id.toString();
   var retrievedObject = localStorage.getItem('cart');
   retrievedObject = JSON.parse(retrievedObject);
   var localstorage_value = [];
   for (var i=0; i<retrievedObject.length;i++) 
   {
   	 var retrieved_id = retrievedObject[i].id;
   	 retrieved_id = retrieved_id.trim();
   	 retrieved_id = retrieved_id.toString();
   	 if (order_id != retrieved_id) 
   	 {
   	 	 localstorage_value.push({name:retrievedObject[i].name, value:retrievedObject[i].value, id:retrievedObject[i].id});
   	 }	
   } // for loop endng
   localStorage.removeItem('cart');
    localStorage.setItem('cart', JSON.stringify(localstorage_value));
    local_storage_handler();
} // delete handler fnctn endng

function local_storage_handler()
{
	$('#storage_element').html('');
	var retrievedObject = localStorage.getItem('cart');
   retrievedObject = JSON.parse(retrievedObject);
   if (retrievedObject.length == 0 || retrievedObject.length == '0')
   {
        $('#cart_value').html('');
     	  $('#cart_value').html(0);
   }
   if (retrievedObject != null && retrievedObject != undefined)
   {
     if (retrievedObject.length > 0)
     {
     	 $('#cart_value').html('');
     	 $('#cart_value').html(retrievedObject.length);
   	 var table_element = document.createElement('table');
   	 $(table_element).addClass('table table-bordered');
   	 var table_head_element = document.createElement('thead');
   	 $(table_head_element).addClass('table table-bordered');
   	 var table_row_element = document.createElement('tr');
   	 $(table_row_element).attr('id', 'table_row');
   	 var serial_head = document.createElement('th');
   	 $(serial_head).html('S.No');
   	 $(serial_head).addClass('tab_head');
   	 $(table_row_element).append(serial_head);
   	 var item_head = document.createElement('th');
   	 $(item_head).html('Item');
   	 $(item_head).addClass('tab_head');
   	 $(table_row_element).append(item_head);
   	 var quantity_head = document.createElement('th');
   	 $(quantity_head).html('Quantity');
   	 $(quantity_head).addClass('tab_head');
   	 $(table_row_element).append(quantity_head);
   	 var id_head =  document.createElement('th');
   	 $(id_head).html('Order Id');
   	 $(id_head).addClass('tab_head');
   	 $(table_row_element).append(id_head);
   	 var remove_head = document.createElement('th');
   	 $(remove_head).html('Remove');
   	 $(remove_head).addClass('tab_head');
   	 $(table_row_element).append(remove_head);
   	 $(table_head_element).append(table_row_element);
   	 $(table_element).append(table_head_element);
   	 var table_body_element = document.createElement('tbody');
       for (var i=0;i<retrievedObject.length;i++) 
       {
       	 var value_row = document.createElement('tr');
       	 $(value_row).addClass('table_value');
       	 var serial_data = document.createElement('td');
       	 $(serial_data).addClass('tab_data');
       	 var serial_value = parseInt(i)+parseInt(1);
       	 $(serial_data).html(serial_value);
       	 $(value_row).append(serial_data);
       	 var item_data = document.createElement('td');
       	 $(item_data).addClass('tab_data');
       	 $(item_data).html(retrievedObject[i].name);
       	 $(value_row).append(item_data);
       	 var quantity_data = document.createElement('td');
       	 $(quantity_data).addClass('tab_data');
       	 $(quantity_data).html(retrievedObject[i].value);
       	 $(value_row).append(quantity_data); 
       	 var id_data = document.createElement('td');
       	 $(id_data).addClass('tab_data');
       	 $(id_data).html(retrievedObject[i].id);
       	 $(value_row).append(id_data);
       	 var remove_data = document.createElement('td');
       	 $(remove_data).addClass('tab_data');
       	 var delete_button = document.createElement('button');
       	 $(delete_button).attr('type', 'button');
       	 $(delete_button).attr('data-item', retrievedObject[i].name);
       	 $(delete_button).attr('data-value', retrievedObject[i].value);
       	 $(delete_button).attr('data-id', retrievedObject[i].id);
       	 $(delete_button).on('click', delete_handler);
       	// $(delete_button).on('click', remove_item_handler);
       	 $(delete_button).addClass('btn btn-info delete_btn');
       	 $(delete_button).html('Remove');
       	 $(remove_data).append(delete_button);
       	 $(value_row).append(remove_data);
       	 $(table_body_element).append(value_row);
       } // for loop endng
       $(table_element).append(table_body_element);
       $('#storage_element').append(table_element);
      } // if localstorage
   } // if localstorage
} // local storage handler fnctn endng

function save_button_handler()
{
  var selection_value = $('#items').val().trim();
  var quantity_value = $('#quantity_value').val().trim();
  if (quantity_value.length == 0 || quantity_value == 0 || quantity_value == '0') 
  {
  	  alert('Enter  quantity');
     return false;
  }
  if (quantity_value.match(/^[a-zA-Z]+$/))
  {
    alert('Enter  numeric digits only');
    return false;
  }
  var localstorage_value = [];
  var retrievedObject = localStorage.getItem('cart');
  retrievedObject = JSON.parse(retrievedObject);
  localStorage.removeItem('cart');
  if (retrievedObject != null && retrievedObject != undefined)
  {
    for (var i=0;i<retrievedObject.length;i++) 
    {
  	  localstorage_value.push({name:retrievedObject[i].name, value:retrievedObject[i].value});
    }
  }
   localstorage_value.push({name:selection_value, value:quantity_value});
   var final_localstorage = [];
   for (var i=0;i<localstorage_value.length;i++) 
   {
   	  var storage_id = parseInt(i)+parseInt(1);
   	  final_localstorage.push({name:localstorage_value[i].name, value:localstorage_value[i].value, id:'00'+storage_id});
   } // for loop endng
	localStorage.setItem('cart', JSON.stringify(final_localstorage));
   local_storage_handler();
} // save button handler fnctn endng

window.onload = local_storage_handler();