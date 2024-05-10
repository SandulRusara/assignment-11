import {customer_db, item_db, order_db, order_details_db} from "../db/db.js";
import {OrderDetailModel} from "../model/OrderDetailModel.js";
import {OrderModel} from "../model/OrderModel.js";
import {loadStudentData} from "./ItemController.js";

const customer_id = $('#orderCustomerId');
const customer_name = $('#orderCustomerName');
const customer_address = $('#orderCustomerAddress');
const customer_contact = $('#orderContactNo');
const item_Id = $('#itemCode');
const order_id = $('#orderId');
const date = $('#orderDate');
const description = $('#itemDescription');
const unit_price = $('#price');
const qty_on_hand = $('#qty');
const order_qty = $('#orderQty');
const cart_btn = $('#addItem');
const net_total = $('#total');
const sub_total = $('#subTotal');
const discount = $('#discount');
const cash = $('#cash');
const balance = $('#balance');
const order_btn = $('#purchase');

let cart = [];

order_id.val(generateOrderId());

function generateOrderId(){
    let lastId = 'O-001'; // Default if array is empty

    if (customer_db.length > 0){
        let lastElement = order_db[order_db.length - 1].orderId;
        let lastIdParts = lastElement.split('-');
        let lastNumber = parseInt(lastIdParts[1]);

        lastId = `O-${String(lastNumber + 1).padStart(3, '0')}`;
    }

    return lastId;
}

//set date
const formattedDate = new Date().toISOString().substr(0, 10);
date.val(formattedDate);

//set customer Ids
export function setCustomerIds() {
    customer_id.empty();
    customer_id.append('<option selected>select the customer</option>');

    let customer_ids = [];
    customer_db.map((value) => {
        customer_ids.push(value.customer_id);
    });

    customer_ids.map((index) => {
        customer_id.append(
            `<option>${index}</option>`
        )
    });
}

//set item Ids
export function setItemIds() {
    item_Id.empty();
    item_Id.append('<option selected>select the item</option>');

    let item_ids = [];
    item_db.map((value) => {
        item_ids.push(value.item_code);
    });

    item_ids.map((index) => {
        item_Id.append(
            `<option>${index}</option>`
        )
    });
}

//set item details
item_Id.on('input', () => {
    if (item_Id.val() !== 'select the item'){
        let index = item_db.findIndex(item => item.item_code === item_Id.val());
        description.val(item_db[index].item_description);
        unit_price.val(item_db[index].item_price);
        qty_on_hand.val(item_db[index].item_qty);
    }else{
        description.val('');
        unit_price.val('');
        qty_on_hand.val('');
    }
});

//set sub total value
discount.on('input', () => {
    let discountValue = parseFloat(discount.val()) || 0;
    if (discountValue < 0 || discountValue > 100) {
        discountValue = Math.min(100, Math.max(0, discountValue));
        discount.val(discountValue);
    }

    let total_value = calculateTotal();
    let discountAmount = (total_value * discountValue) / 100;
    sub_total.text(`${total_value - discountAmount}/=`);
});

//set balance
cash.on('input', () => {
    let subTotal = parseFloat(sub_total.text());
    let cashAmount = parseFloat(cash.val());
    balance.val(cashAmount - subTotal);
});

//set customer details
customer_id.on('input', () => {
    if (customer_id.val() !== 'select the customer'){
        let index = customer_db.findIndex(customer => customer.customer_id === customer_id.val());
        customer_name.val(customer_db[index].customer_name);
        customer_address.val(customer_db[index].customer_address);
        customer_contact.val(customer_db[index].customer_contact);
    }else{
        customer_name.val('');
    }
});

//add to cart
cart_btn.on('click', () => {
    let itemId = item_Id.val();
    let orderQTY = parseInt(order_qty.val());

    if (validate(itemId, 'item id') && validate(orderQTY, 'order qty')) {

        let index = item_db.findIndex(item => item.item_code === itemId);
        let unitPrice = item_db[index].item_price;
        let total = unitPrice * orderQTY;

        if (item_db[index].item_qty >= orderQTY) {
            let cartItemIndex = cart.findIndex(cartItem => cartItem.itemId === itemId);
            if (cartItemIndex < 0) {
                let cart_item = {
                    itemId: itemId,
                    unitPrice: unitPrice,
                    qty: orderQTY,
                    total: total
                }
                cart.push(cart_item);
                loadCart();
                setTotalValues()
                clearItemSection();
            } else {
                cart[cartItemIndex].qty += orderQTY;
                cart[cartItemIndex].total = cart[cartItemIndex].qty * cart[cartItemIndex].unitPrice;
                console.log(cart);
                loadCart();
                setTotalValues()
                clearItemSection();
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'not enough quantity available 😔',
            });
        }
    }
});

//place order
order_btn.on('click', () => {
    let orderId = order_id.val();
    let order_date = date.val();
    let customerId = customer_id.val();

    if (validate(orderId, 'order id') && validate(order_date, 'order date') &&
        validate(customerId, 'customer id')) {
        if (cart.length !== 0) {
            Swal.fire({
                title: 'Do you want to save the changes?',
                showDenyButton: true,
                confirmButtonText: 'Save',
                denyButtonText: "Don't save",
            }).then((result) => {
                if (result.isConfirmed) {

                    //save order
                    let order = new OrderModel(orderId, order_date, customerId);
                    order_db.push(order);

                    //save order details
                    cart.forEach((cart_item) => {
                        let order_detail = new OrderDetailModel(orderId, cart_item.itemId, cart_item.qty, cart_item.unitPrice);
                        order_details_db.push(order_detail);

                        //update item qty
                        let item_index = item_db.findIndex(item => item.item_code === cart_item.itemId);
                        item_db[item_index].item_qty -= cart_item.qty;
                    });

                    order_id.val(generateOrderId());
                    loadStudentData();
                    cart.splice(0, cart.length);
                    loadCart();
                    clearItemSection();
                    customer_id.val('select the customer');
                    customer_name.val('');
                    discount.val('');
                    cash.val('');
                    balance.val('');
                    net_total.text('0/=');
                    sub_total.text('0/=');
                    Swal.fire('Order Placed! 🥳','', 'success');

                } else if (result.isDenied) {
                    Swal.fire('Order is not saved', '', 'info');
                }
            });
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Please add items to cart 😔',
            });
        }
    }
});

function calculateTotal(){
    let netTotal = 0;
    cart.map((cart_item) => {
        netTotal += cart_item.total;
    });
    return netTotal;
}

function clearItemSection() {
    item_Id.val('select the item');
    description.val('');
    qty_on_hand.val('');
    unit_price.val('');
    order_qty.val('');
}

function setTotalValues(){
    let netTotal = calculateTotal();
    net_total.text(`Total : ${netTotal}/=`);

    let discount_percentage = discount.val() || 0;
    let discountAmount = (netTotal * discount_percentage) / 100;
    sub_total.text(`Sub Total : ${netTotal - discountAmount}/=`);
}

function loadCart() {
    $('tbody').eq(2).empty();
    cart.map((item) => {
        $('tbody').eq(2).append(
            `<tr>
                <th scope="row">${item.itemId}</th>
                <td>${item.unitPrice}</td>
                <td>${item.qty}</td>
                <td>${item.total}</td>
            </tr>`
        );
    });
}

function validate(value, field_name){
    if (field_name === 'item id'){
        if (value === 'select the item'){
            Swal.fire({
                icon: 'warning',
                title: 'Please select an item!'
            });
            return false;
        }
    }else if (field_name === 'customer id'){
        if (value === 'select the customer'){
            Swal.fire({
                icon: 'warning',
                title: 'Please select a customer!'
            });
            return false;
        }
    }else if (!value){
        Swal.fire({
            icon: 'warning',
            title: `Please enter the ${field_name}!`
        });
        return false;
    }
    return true;
}