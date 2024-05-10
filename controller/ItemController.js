import {ItemModel} from "../model/ItemModel.js";
import {customer_db, item_db} from "../db/db.js";
import {setCustomerIds, setItemIds} from "./OrderController.js";

var row_index = null;
$("#itemButton>button[type='button']").eq(0).on("click", () =>{
    let item_code = $("#itemId").val();
    let item_name = $("#itemName").val();
    let item_qty = parseInt($("#itemQty").val());
    let item_price = parseFloat($("#itemPrice").val());

    if (validate(item_code,'item code') && validate(item_name,'item name') &&
        validate(item_qty,'item qty') && validate(item_price,'item price')) {

        if (getItemIndex(item_code) < 0) {
            Swal.fire({
                title: 'Do you want to save the changes?',
                showDenyButton: true,
                confirmButtonText: 'Save',
                denyButtonText: `Don't save`,
            }).then((result) => {
                if (result.isConfirmed) {
                    let item_obj = new ItemModel(item_code, item_name, item_qty, item_price);

                    item_db.push(item_obj);

                    loadStudentData();
                    setItemIds();

                    clear();

                    Swal.fire('Customer Saved!', '', 'success');

                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                }
            });
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Item is already exists 😔',
            });
        }
    }

});

const clear = () =>{
    $("#itemId").val("");
    $("#itemName").val("");
    $("#itemQty").val("");
    $("#itemPrice").val("");

}
export const loadStudentData = () =>{
    $('#item_table_body').empty();
    item_db.map((item, ) =>{
        let record = `<tr><td class="item_code">${item.item_code}</td><td class="item_description">${item.item_description}</td>
      <td class="item_qty">${item.item_qty}</td><td class="item_price">${item.item_price}</td> `
        $('#item_table_body').append(record);
    });
}

$("#itemButton>button[type='button']").eq(1).on("click", () =>{
    let item_code = $("#itemId").val();
    let item_name = $("#itemName").val();
    let item_qty = $("#itemQty").val();
    let item_price = $("#itemPrice").val();

    if (validate(item_code,'item code') && validate(item_name,'item name') &&
        validate(item_qty,'item qty') && validate(item_price,'item price')) {

        let item_obj = new ItemModel(item_code, item_name, item_qty, item_price);

        let index = item_db.findIndex(item => item.item_code === item_code);

        if (index >= 0) {

            Swal.fire({
                title: 'Do you want to update the item?',
                showDenyButton: true,
                confirmButtonText: 'Update',
                denyButtonText: `Don't update`,
            }).then((result) => {
                if (result.isConfirmed) {
                    item_db[index] = item_obj;

                    loadStudentData();

                    clear();

                    Swal.fire('Customer Updated!', '', 'success');

                } else if (result.isDenied) {
                    Swal.fire('Changes are not updated!', '', 'info')
                }
            });
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Item did not exists 😓',
            });
        }
    }

});

$("#itemButton>button[type='button']").eq(2).on("click", () => {
    let item_code = $("#itemId").val();

    if(validate(item_code,'item code')) {

        let index = item_db.findIndex(item => item.item_code === item_code);

        if (index >= 0) {

            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    item_db.splice(index, 1);

                    loadStudentData();
                    setItemIds();

                    clear();

                    Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
                }
            });
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Item did not exists 😓',
            });
        }
    }

})
$("#item_table_body").on("click","tr", function () {
    row_index = $(this).index();

    let item_id = $(this).find(".item_code").text();
    let item_description = $(this).find(".item_description").text();
    let item_qty = $(this).find(".item_qty").text();
    let item_price = $(this).find(".item_price").text();

    $("#itemId").val(item_id);
    $("#itemName").val(item_description);
    $("#itemQty").val(item_qty);
    $("#itemPrice").val(item_price);
})

function validate(value, field_name){
    if (!value){
        Swal.fire({
            icon: 'warning',
            title: `Please enter the ${field_name}!`
        });
        return false;
    }
    return true;
}

const getItemIndex = function (item_code) {
    return item_db.findIndex(item => item.item_code === item_code);
}