## Description for PicckR MAP API

### Workflow

1. User submits an order by providing a `DESTINATION_LOCATION`.

2. **PicckR MAP API** will then find the **nearest** `DRIVERS` to the `DESTINATION_LOCATION` and send them a `PUSH_NOTIFICATION` to `ACCEPT` or `DECLINE` the order.

   1. If the `DRIVER` `DECLINE` the order, **PicckR MAP API** will `SAVE_DECLINED_ORDER_IN_DATABASE` and keep waiting for the next `DRIVER` to `ACCEPT` the order.

   2. If the `DRIVER` `ACCEPT` the order, **PicckR MAP API** will `SAVE_ACCEPTED_ORDER_IN_DATABASE` and send a `PUSH_NOTIFICATION` to the `USER` to share with him the `DRIVER` `CONTACT_INFORMATION` and open a `CHAT_ROOM` between them.

   3. An auto-generated `CONFIRMATION_CODE` will be generated and shared with the `USER` and the `DRIVER` to be used as a **confirmation** for the `DRIVER` to make sure that the `RECEIVER` is the `DEDICATED_USER` for the order.

3. **PicckR MAP API** will then `SAVE_ORDER_IN_DATABASE` and `SAVE_ORDER_STATUS_IN_DATABASE` as `PENDING`.

4. **PicckR MAP API** will then `TRACK_DRIVER_LOCATION` and display it on the map for the `USER`.

5. When the `DRIVER` `ARRIVE` to the `DESTINATION_LOCATION`, he will `CHANGE_ORDER_STATUS_IN_DATABASE` to `ARRIVED`.

6. When the `USER` `CONFIRM` that he received his order, he will `CHANGE_ORDER_STATUS_IN_DATABASE` to `DELIVERED`.

7. The `CHAT_ROOM` will be `CLOSED` and the `DRIVER` will be `AVAILABLE` to take another order.

### DONE (API)

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
