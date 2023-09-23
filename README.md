## Description for PicckR Tracker API

Workflow, functions, entities and questions.

## NOTE

Don't make any dynamic field to be enum, because it will be hard to update it in the future while they are dynamic in the other API (PICCKR / APIS)[https://github.com/PICCKR/APIs/tree/api/models]

## Workflow

1. **PicckR Map API** creates a _TRACKER_ `createTracker`.

2. **PicckR MAP API** finds nearby _DRIVERs_ `findNearbyDrivers`.

   1. **User** selects a _DRIVER_ `acceptDriver`. _(TO BE UPDATED AFTER GETTING RESPONSE FROM PROJECT OWNER)_

3. _(SECOND SCENARIO)_ **User** requests a specific _DRIVER_ `requrestDriver`.

4. _(MAY HAPPEN)_ **User** declines the _DRIVER_ `declineDriver`. _(TO BE UPDATED AFTER GETTING RESPONSE FROM PROJECT OWNER)_

5. **PicckR MAP API** updates _DRIVER_ status to _UNAVAILABLE_ `updateDriverStatus`.

6. **PicckR MAP API** generates a _TRANSACTION_PIN_CODE_ `generateTransactionPinCode`.

7. **PicckR MAP API** creates a _PRIVATE_CHAT_ROOM_ `createPrivateChatRoom`.

8. **Driver** updates order status to _HEADING_TO_PICKUP_ `updateOrderStatus`.

9. **Driver** updates order status to _HEADING_TO_RECIPIENT_DESTINATION_ `updateOrderStatus`.

10. _(MAY HAPPEN)_ **User** creates a _DISPUTE_ `createDispute`.

11. **Driver** updates order status to _DELIVERED_ `updateOrderStatus`.

12. **User** updates order status to _COMPLETED_ `updateOrderStatus`.

13. **PicckR MAP API** closes _PRIVATE_CHAT_ROOM_ `closePrivateChatRoom`.

14. **PicckR MAP API** updates _DRIVER_ status to _AVAILABLE_ `updateDriverStatus`.

15. **User** rates the _DRIVER_ `rateDriver`.

## Functions

### 1. createTracker

- `user_id`: _(string)_
- `driver_id`?: _(string)_
- `booking_id`: _(string)_
- `sender_location`: _(string)_
- `recipient_location`: _(string)_

### 2. findNearbyDrivers

- `sender_location`: _(string)_
- `require_availability`?: _(boolean)_ `true` | `false`

### 3. requestDriver

- `user_id`: _(string)_
- `driver_id`: _(string)_
- `booking_id`: _(string)_

### 4. saveDeclinedRequest

- `user_id`: _(string)_
- `driver_id`: _(string)_
- `booking_id`: _(string)_

### 5. saveTimeoutRequest

- `user_id`: _(string)_
- `driver_id`: _(string)_
- `booking_id`: _(string)_
- `timeout`: _(number)_

### 6. saveAcceptedRequest

- `user_id`: _(string)_
- `driver_id`: _(string)_
- `booking_id`: _(string)_

### 7. driverSendProposal

- `driver_id`: _(string)_
- `booking_id`: _(string)_

## Entities

### 1. Tracker

- `user_id`: _(string)_
- `driver_id`: _(string)_
- `booking_id`: _(string)_
- `sender_location`: _(string)_
- `recipient_location`: _(string)_
- `order_status`: _(string)_ `REQUESTING` | `PENDING` | `ACCEPTED_BY_SENDER` | `ACCEPTED_BY_DRIVER` | `DECLINED_BY_SENDER` | `DECLINED_BY_DRIVER` | `COMPLETED` | `CANCELED_BY_SENDER` | `CANCELED_BY_DRIVER`
- `package_status`: _(string)_ `HEADING_TO_PICKUP` | `HEADING_TO_RECIPIENT_DESTINATION` | `DELIVERED` | `CONFIRMED`
- `pin_code`: _(string)_
- `chatroom_id`: _(string)_

## Entities

### User

- `user_id`: _(string)_

### Rating

- `id`: _(string)_
- `user_id`: _(string)_
- `driver_id`: _(string)_
- `order_id`: _(string)_
- `rating`: _(number)_

### Driver

- `id`: _(string)_
- `current_location`: _(string)_
- `status`: _(string)_ `AVAILABLE` | `UNAVAILABLE`
- `vehicle_type`: _(string)_ `BIKE` | `MOTORCYCLE` | `CAR` | `VAN` | `TRUCK`
- `rating`: _(number)_
- `phone`: _(string)_
- `name`: _(string)_

### Package

- `id`: _(string)_
- `vehicle_type`: _(string)_ `BIKE` | `MOTORCYCLE` | `CAR` | `VAN` | `TRUCK`
- `package_type`: _(string)_
- `package_weight`: _(number)_ `KG`
- `dimensions`: _(string)_
- `payment_method`: _(string)_ `CASH` | `CARD` | `EWALLET`
- `price`: _(number)_
- `user_id`: _(string)_
- `status`: _(string)_ `DRAFT` | `HEADING_TO_PICKUP` | `HEADING_TO_RECIPIENT_DESTINATION` | `DELIVERED`
- `package_pin_code`: _(string)_

### Order

- `id`: _(string)_
- `recipient_details`: location _(string)_ name _(string)_ , phone _(string)_
- `sender_details`: location _(string)_ name _(string)_ , phone _(string)_ , `pickup_date` _(date | string)_
- `package_id`: _(string)_
- `status`: _(string)_ `PENDING` | `ACCEPTED` | `DECLINED` | `COMPLETED` | `CANCELED`
- `transaction_pin_code`: _(string)_ `GENERATED`
- `driver_id`: _(string)_
- `user_id`: _(string)_
- `chat_room_id`: _(string)_

### ChatRoom

- `id`: _(string)_
- `order_id`: _(string)_
- `status`: _(string)_ `OPEN` | `CLOSED`
- `messages`: _(array)_ `[{message: string, sender: string, date: date}]`

## Functions

### createPackage

- `vehicle_type`: _(string)_ `BIKE` | `MOTORCYCLE` | `CAR` | `VAN` | `TRUCK`
- `package_type`: _(string)_
- `package_weight`: _(number)_ `KG`
- `payment_method`: _(string)_ `CASH` | `CARD` | `EWALLET`

### createOrder

- `recipient_details`: location _(string)_ name _(string)_ , phone _(string)_
- `sender_details`: location _(string)_ name _(string)_ , phone _(string)_ , `pickup_date` _(date | string)_
- `package_id`: _(string)_

---

DEFAULTS:

- `status`: _(string)_ `PENDING` | `ACCEPTED` | `DECLINED` | `COMPLETED` | `CANCELED`
- `transaction_pin_code`: _(string)_ `GENERATED`
- `driver_id`: _(string)_ `NULL`

### findNearbyDrivers

- `sender_location`: _(string)_

### DONE (API) !to be updated

- [x] _User_ can submit and `CREATE` an order.
- [x] _PicckR MAP API_ `GET_NEARBY` `DRIVERS` to the `DESTINATION_LOCATION`.
- [x] _PicckR MAP API_ `SEND_PUSH_NOTIFICATION` to the `DRIVERS` to `ACCEPT` or `DECLINE` the order.
- [x] _PicckR MAP API_ `SAVE_DECLINED_ORDER_IN_DATABASE` and keep waiting for the next `DRIVER` to `ACCEPT` the order.
- [x] _PicckR MAP API_ `SAVE_ACCEPTED_ORDER_IN_DATABASE` and send a `PUSH_NOTIFICATION` to the `USER` to share with him the `DRIVER` `CONTACT_INFORMATION` and open a `CHAT_ROOM` between them.
- [ ] _PicckR MAP API_ `GENERATE_CONFIRMATION_CODE` and share it with the `USER` and the `DRIVER`.
- [ ] _PicckR MAP API_ `SAVE_ORDER_IN_DATABASE` and `SAVE_ORDER_STATUS_IN_DATABASE` as `PENDING`.
- [ ] _PicckR MAP API_ `TRACK_DRIVER_LOCATION` and display it on the map for the `USER`.
- [ ] _PicckR MAP API_ `CHANGE_ORDER_STATUS_IN_DATABASE` to `ARRIVED` when the `DRIVER` `ARRIVE` to the `DESTINATION_LOCATION`.
- [ ] _PicckR MAP API_ `CHANGE_ORDER_STATUS_IN_DATABASE` to `DELIVERED` when the `USER` `CONFIRM` that he received his order.
- [ ] _PicckR MAP API_ `CLOSE_CHAT_ROOM` and `CHANGE_DRIVER_STATUS_IN_DATABASE` to `AVAILABLE` when the `USER` `CONFIRM` that he received his order.

## Questions

- [ ] Is the driver has the right to accept the order or not?
- [ ] Do we have the current `country` and `city` of the driver?
- [ ] When we get list of nearby drivers, the shared list with the user would be of drivers `submitting_for_the_order` or all `available_drivers` without asking for their opinion?
  - [ ] if it was all `available_drivers` then after the user selects one of them, should we ask the driver to `accept` or `decline` the order?
- [ ] Does the driver have a profile picture in the map api db?
- [ ] Does the driver have the right to rate a user?
