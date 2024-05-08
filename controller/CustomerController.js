import {CustomerModel} from "../model/CustomerModel.js";
import {customer_db} from "../db/db.js";
$("#customerButton>button[type='button']").eq(0).on("click",()=>{
    let customer_id = $("#customerId").val();
    let customer_name = $("#customerName").val();
    let customer_address = $("#customerAddress").val();
    let customer_contact =  $("#contactNo").val();

    let customer_obj = new CustomerModel(
        customer_id,
        customer_name,
        customer_address,
        customer_contact);

    customer_db.push(customer_obj);
    loadStudentData();

})
const loadStudentData = () => {
    $('#customer-tbl-body').empty();
    customer_db.map((item, ) =>{
        let record = `<tr>
<td class="customer_id">${item.customer_id}</td>
<td class="customer_name">${item.customer_name}</td>
<td class="customer_address">${item.customer_address}</td>
<td class="customer_contact">${item.customer_contact}</td>
</tr>`;
        $('#customer-tbl-body').append(record);
    });
}