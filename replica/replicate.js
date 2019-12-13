rs.initiate( {
  _id : "rs0",
  members: [
    { _id: 0, host: `taurus-data-store-db-primary:27017` },
    { _id: 1, host: `taurus-data-store-db-secondary-0:27017` },
    { _id: 2, host: `taurus-data-store-db-secondary-1:27017` },
  ]
});