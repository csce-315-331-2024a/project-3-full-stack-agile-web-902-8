-- set the net_price column for the menu items
UPDATE
    menu_items
SET
    -- calculate the price - cost for ingredients
    net_price = ROUND((menu_items.price - aggregate_loss.loss)::numeric,2)
FROM 
    -- sum up all the ingredient prices for each menu item
    (SELECT 
        ingredient_prices.item_id, 
        SUM(ingredient_prices.price) AS loss
    FROM 
        -- multiply the cost with the amount
        (SELECT 
            ingredients.item_id, 
            (ingredients.amount * inventory.avg_cost) AS price
        FROM 
            inventory, 
            ingredients
        WHERE 
            inventory.id = ingredients.inventory_id
        ) 
        AS ingredient_prices 
    GROUP BY 
        ingredient_prices.item_id
    ) AS aggregate_loss
WHERE
    menu_items.id = aggregate_loss.item_id;

-- set the remaining net_price if NULL to just price
UPDATE
    menu_items
SET
    net_price = menu_items.price
WHERE
    menu_items.net_price IS NULL;


