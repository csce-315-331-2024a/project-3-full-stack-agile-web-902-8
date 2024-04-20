INSERT INTO seasonal_items(item_id,start_date,end_date,recurring) 
SELECT item.id,'2024-03-04 00:00:00','2025-01-02 00:00:00',true
FROM
    (SELECT id FROM menu_items WHERE name='Tuna Melt') AS item
WHERE NOT EXISTS -- Checks if it exists
    (SELECT item_id FROM seasonal_items WHERE item_id=item.id);

INSERT INTO seasonal_items(item_id,start_date,end_date,recurring) 
SELECT item.id,'2024-01-01 00:00:00','2024-01-02 00:00:00',true
FROM
    (SELECT id FROM menu_items WHERE name='Fish Sandwich') AS item
WHERE NOT EXISTS -- Checks if it exists
    (SELECT item_id FROM seasonal_items WHERE item_id=item.id);


INSERT INTO seasonal_items(item_id,start_date,end_date,recurring) 
SELECT item.id,'2024-03-05 12:00:00','2024-03-05 16:00:00',true
FROM
    (SELECT id FROM menu_items WHERE name='Chicken Wraps') AS item
WHERE NOT EXISTS -- Checks if it exists
    (SELECT item_id FROM seasonal_items WHERE item_id=item.id);
