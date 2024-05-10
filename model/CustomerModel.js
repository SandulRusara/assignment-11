// export class CustomerModel {
//     constructor(customer_id, customer_name, customer_address, customer_contact) {
//         this._customer_id = customer_id;
//         this._customer_name = customer_name;
//         this._customer_address = customer_address;
//         this._customer_contact = customer_contact;
//     }
// }

//     get customer_id() {
//         return this._customer_id;
//     }
//
//     set customer_id(value) {
//         this._customer_id = value;
//     }
//
//     get customer_name() {
//         return this._customer_name;
//     }
//
//     set customer_name(value) {
//         this._customer_name = value;
//     }
//
//     get customer_address() {
//         return this._customer_address;
//     }
//
//     set customer_address(value) {
//         this._customer_address = value;
//     }
//
//     get customer_contact() {
//         return this._customer_contact;
//     }
//
//     set customer_contact(value) {
//         this._customer_contact = value;
//     }
// }

export class CustomerModel {
    constructor(customer_id,customer_name,customer_address,customer_contact) {
        this.customer_id=customer_id;
        this.customer_name=customer_name;
        this.customer_address=customer_address;
        this.customer_contact=customer_contact;
    }
}