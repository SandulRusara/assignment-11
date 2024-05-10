import {ItemModel} from "../model/ItemModel.js";
import {customer_db, item_db} from "../db/db.js";
$("#itemButton>button[type='button']").eq(0)("click",() =>{
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