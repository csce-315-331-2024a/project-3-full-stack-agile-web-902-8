
INSERT INTO ingredients (item_id,inventory_id,amount) 
SELECT 
    data.item_id, 
    data.inventory_id, 
    1 -- qty
FROM
    (SELECT 
        menu_items.id AS item_id,
        inventory.id AS inventory_id
    FROM 
        menu_items,
        inventory
    WHERE 
        menu_items.name='Fish Sandwich' AND
        inventory.name='Fish'
    ) AS data
-- check if exists
WHERE NOT EXISTS
    (SELECT 
        item_id, 
        inventory_id 
    FROM 
        ingredients 
    WHERE 
        item_id=data.item_id AND 
        inventory_id=data.inventory_id
    );

INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Fish Sandwich' AND
		inventory.name='Burger Buns'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);

INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Fish Sandwich' AND
		inventory.name='American Cheese'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);

INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Tuna Melt' AND
		inventory.name='Tuna'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);

INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Tuna Melt' AND
		inventory.name='American Cheese'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);

INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Tuna Melt' AND
		inventory.name='Tomatos'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);

INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Tuna Melt' AND
		inventory.name='Lettuce'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);

INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	2 -- qty
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Tuna Melt' AND
		inventory.name='Bread Slices'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);



INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Chicken Wraps' AND
		inventory.name='Grilled Chicken Breast'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);

INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Chicken Wraps' AND
		inventory.name='Tortillas'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);

INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Chicken Wraps' AND
		inventory.name='Lettuce'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);

INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Chicken Wraps' AND
		inventory.name='Tomatos'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);

INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Chicken Wraps' AND
		inventory.name='American Cheese'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);



INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='20 OZ Fountain Drink' AND
		inventory.name='Fountain Drink'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);


INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Aquafina Water 20 OZ' AND
		inventory.name='20 oz Bottled Water'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);


INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Aquafina Water 16 OZ' AND
		inventory.name='16 oz Bottled Water'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);



INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Root Beer Float' AND
		inventory.name='Root Beer'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);


INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	2 -- qty
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Root Beer Float' AND
		inventory.name='Ice Cream'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);


INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	2 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Double Scoop Ice Cream' AND
		inventory.name='Ice Cream'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);


INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Cookie Ice Cream Sundae' AND
		inventory.name='Ice Cream'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);

INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	2 -- qty question
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Cookie Ice Cream Sundae' AND
		inventory.name='Chocolate Chip'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);



INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Aggie Shakes' AND
		inventory.name='Ice Cream'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);

INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Aggie Shakes' AND
		inventory.name='Milk'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);



INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='French Fries' AND
		inventory.name='Potatoes'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);

INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='French Fries' AND
		inventory.name='Frying Oil'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);



INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	3 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='3 Chicken Tender Combo' AND
		inventory.name='Chicken Tenders'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);

INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='3 Chicken Tender Combo' AND
		inventory.name='Potatoes'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);

INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='3 Chicken Tender Combo' AND
		inventory.name='Frying Oil'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);

INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='3 Chicken Tender Combo' AND
		inventory.name='Fountain Drink'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);


INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	3 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='3 Tender Entree' AND
		inventory.name='Chicken Tenders'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);


INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	2 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='2 Hot Dog Value Meal' AND
		inventory.name='Hot Dog'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);

INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	2 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='2 Hot Dog Value Meal' AND
		inventory.name='Hot Dog Buns'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);



INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	2 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='2 Corn Dog Value Meal' AND
		inventory.name='Corn Dog'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);




INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Aggie Chicken Club' AND
		inventory.name='Breaded Chicken Breast'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);

INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	2 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Aggie Chicken Club' AND
		inventory.name='Bacon'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);

INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Aggie Chicken Club' AND
		inventory.name='Avocado'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);

INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Aggie Chicken Club' AND
		inventory.name='American Cheese'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);

INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	2 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Aggie Chicken Club' AND
		inventory.name='Burger Buns'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);


INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Spicy Chicken Sandwich' AND
		inventory.name='Spicy Breaded Chicken Breast'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);

INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Spicy Chicken Sandwich' AND
		inventory.name='Lettuce'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);

INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Spicy Chicken Sandwich' AND
		inventory.name='American Cheese'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);

INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	2 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Spicy Chicken Sandwich' AND
		inventory.name='Pickles'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);

INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Spicy Chicken Sandwich' AND
		inventory.name='Burger Buns'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);



INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Revs Grilled Chicken Sandwich' AND
		inventory.name='Grilled Chicken Breast'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);

INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Revs Grilled Chicken Sandwich' AND
		inventory.name='Lettuce'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);

INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Revs Grilled Chicken Sandwich' AND
		inventory.name='Red Onions'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);

INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Revs Grilled Chicken Sandwich' AND
		inventory.name='Burger Buns'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);



INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Black Bean Burger' AND
		inventory.name='Vegan Patty'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);

INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Black Bean Burger' AND
		inventory.name='Lettuce'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);

INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Black Bean Burger' AND
		inventory.name='Tomatos'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);

INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Black Bean Burger' AND
		inventory.name='Onions'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);

INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Black Bean Burger' AND
		inventory.name='Burger Buns'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);



INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Cheeseburger' AND
		inventory.name='Beef Patty'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);

INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Cheeseburger' AND
		inventory.name='American Cheese'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);


INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Cheeseburger' AND
		inventory.name='Tomatos'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);

INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Cheeseburger' AND
		inventory.name='Onions'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);

INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	2 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Cheeseburger' AND
		inventory.name='Pickles'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);

INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Cheeseburger' AND
		inventory.name='Burger Buns'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);



INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Gig Em Patty Melt' AND
		inventory.name='Beef Patty'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);

INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Gig Em Patty Melt' AND
		inventory.name='Swiss American Cheese'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);

INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Gig Em Patty Melt' AND
		inventory.name='Onions'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);

INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	2 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Gig Em Patty Melt' AND
		inventory.name='Bread Slices'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);



INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	2 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Double Stack Burger' AND
		inventory.name='Beef Patty'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);

INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	2 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Double Stack Burger' AND
		inventory.name='American Cheese'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);

INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	2 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Double Stack Burger' AND
		inventory.name='Pickles'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);

INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Double Stack Burger' AND
		inventory.name='Burger Buns'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);



INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Classic Hamburger' AND
		inventory.name='Beef Patty'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);

INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Classic Hamburger' AND
		inventory.name='Lettuce'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);

INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Classic Hamburger' AND
		inventory.name='Tomatos'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);

INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Classic Hamburger' AND
		inventory.name='Onions'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);

INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	2 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Classic Hamburger' AND
		inventory.name='Pickles'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);

INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Classic Hamburger' AND
		inventory.name='Burger Buns'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);


INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Bacon Cheeseburger' AND
		inventory.name='Beef Patty'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);

INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Bacon Cheeseburger' AND
		inventory.name='American Cheese'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);

INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	2 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Bacon Cheeseburger' AND
		inventory.name='Bacon'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);

INSERT INTO ingredients (item_id,inventory_id,amount)
SELECT
	data.item_id,
	data.inventory_id,
	1 -- qty 
FROM
	(SELECT
		menu_items.id AS item_id,
		inventory.id AS inventory_id
	FROM
		menu_items,
		inventory
	WHERE
		menu_items.name='Bacon Cheeseburger' AND
		inventory.name='Burger Buns'
	) AS data
-- check if exists
WHERE NOT EXISTS
	(SELECT
		item_id,
		inventory_id
	FROM
		ingredients
	WHERE
		item_id=data.item_id AND
		inventory_id=data.inventory_id
	);






