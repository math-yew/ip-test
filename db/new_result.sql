INSERT INTO results
(send_ip, send_interval, send_transfer, send_bandwidth, receive_ip, receive_interval, receive_transfer, receive_bandwidth, test_time, send_connect, receive_connect, reverse)
VALUES
($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
RETURNING *
