--meat--

INSERT INTO inventory(name,avg_cost,qty,min_qty,max_qty) 
SELECT 'Beef Patty', 0.87, 1000, 200, 2200 
	WHERE NOT EXISTS (SELECT name FROM inventory WHERE name='Beef Patty');

INSERT INTO inventory(name,avg_cost,qty,min_qty,max_qty) 
SELECT 'Tuna', 0.82, 100, 40, 200 
	WHERE NOT EXISTS (SELECT name FROM inventory WHERE name='Tuna');

INSERT INTO inventory(name,avg_cost,qty,min_qty,max_qty) 
SELECT 'Fish', 0.85, 84, 50, 230 
	WHERE NOT EXISTS (SELECT name FROM inventory WHERE name='Fish');

INSERT INTO inventory(name,avg_cost,qty,min_qty,max_qty) 
SELECT 'Grilled Chicken Breast', 0.66, 300, 120, 1200 
	WHERE NOT EXISTS (SELECT name FROM inventory WHERE name='Grilled Chicken Breast');

INSERT INTO inventory(name,avg_cost,qty,min_qty,max_qty) 
SELECT 'Chicken Tenders', 0.75, 50, 110, 1800 
	WHERE NOT EXISTS (SELECT name FROM inventory WHERE name='Chicken Tenders');

INSERT INTO inventory(name,avg_cost,qty,min_qty,max_qty) 
SELECT 'Breaded Chicken Breast', 0.84, 750, 220, 2000 
	WHERE NOT EXISTS (SELECT name FROM inventory WHERE name='Breaded Chicken Breast');

INSERT INTO inventory(name,avg_cost,qty,min_qty,max_qty) 
SELECT 'Spicy Breaded Chicken Breast', 0.84, 664, 140, 1700 
	WHERE NOT EXISTS (SELECT name FROM inventory WHERE name='Spicy Breaded Chicken Breast');

INSERT INTO inventory(name,avg_cost,qty,min_qty,max_qty) 
SELECT 'Hot Dog', 0.19, 321, 40, 1200 
	WHERE NOT EXISTS (SELECT name FROM inventory WHERE name='Hot Dog');

INSERT INTO inventory(name,avg_cost,qty,min_qty,max_qty) 
SELECT 'Vegan Patty', 1.63, 183, 20, 450 
	WHERE NOT EXISTS (SELECT name FROM inventory WHERE name='Vegan Patty');

INSERT INTO inventory(name,avg_cost,qty,min_qty,max_qty) 
SELECT 'Corn Dog', 0.57, 560, 40, 1200 
	WHERE NOT EXISTS (SELECT name FROM inventory WHERE name='Corn Dog');

INSERT INTO inventory(name,avg_cost,qty,min_qty,max_qty) 
SELECT 'Bacon', 0.49, 500, 20, 1500 
	WHERE NOT EXISTS (SELECT name FROM inventory WHERE name='Bacon');


--bread--

INSERT INTO inventory(name,avg_cost,qty,min_qty,max_qty) 
SELECT 'Tortillas', 0.15, 200, 100, 500 
	WHERE NOT EXISTS (SELECT name FROM inventory WHERE name='Tortillas');

INSERT INTO inventory(name,avg_cost,qty,min_qty,max_qty) 
SELECT 'Burger Buns', 0.19, 50, 40, 4000 
	WHERE NOT EXISTS (SELECT name FROM inventory WHERE name='Burger Buns');

INSERT INTO inventory(name,avg_cost,qty,min_qty,max_qty) 
SELECT 'Hot Dog Buns', 0.22, 321, 40, 1200 
	WHERE NOT EXISTS (SELECT name FROM inventory WHERE name='Hot Dog Buns');

INSERT INTO inventory(name,avg_cost,qty,min_qty,max_qty) 
SELECT 'Bread Slices', 0.15, 560, 40, 1200 
	WHERE NOT EXISTS (SELECT name FROM inventory WHERE name='Bread Slices');

   
--veggies--  

INSERT INTO inventory(name,avg_cost,qty,min_qty,max_qty) 
SELECT 'Onions', 0.12, 20, 10, 50 
	WHERE NOT EXISTS (SELECT name FROM inventory WHERE name='Onions');

INSERT INTO inventory(name,avg_cost,qty,min_qty,max_qty) 
SELECT 'American Cheese', 0.13, 313, 40, 2400 
	WHERE NOT EXISTS (SELECT name FROM inventory WHERE name='American Cheese');

INSERT INTO inventory(name,avg_cost,qty,min_qty,max_qty) 
SELECT 'Swiss American Cheese', 0.33, 402, 40, 2400 
	WHERE NOT EXISTS (SELECT name FROM inventory WHERE name='Swiss American Cheese');

INSERT INTO inventory(name,avg_cost,qty,min_qty,max_qty) 
SELECT 'Lettuce', 0.13, 8, 5, 30 
	WHERE NOT EXISTS (SELECT name FROM inventory WHERE name='Lettuce');

INSERT INTO inventory(name,avg_cost,qty,min_qty,max_qty) 
SELECT 'Tomatos', 0.18, 15, 5, 60 
	WHERE NOT EXISTS (SELECT name FROM inventory WHERE name='Tomatos');

INSERT INTO inventory(name,avg_cost,qty,min_qty,max_qty) 
SELECT 'Avocado', 0.30, 8, 3, 30 
	WHERE NOT EXISTS (SELECT name FROM inventory WHERE name='Avocado');

INSERT INTO inventory(name,avg_cost,qty,min_qty,max_qty) 
SELECT 'Pickles', 0.08, 150, 40, 500 
	WHERE NOT EXISTS (SELECT name FROM inventory WHERE name='Pickles');

INSERT INTO inventory(name,avg_cost,qty,min_qty,max_qty) 
SELECT 'Red Onions', 0.12, 20, 10, 50 
	WHERE NOT EXISTS (SELECT name FROM inventory WHERE name='Red Onions');

INSERT INTO inventory(name,avg_cost,qty,min_qty,max_qty) 
SELECT 'Potatoes', 0.29, 302, 20, 1000 
	WHERE NOT EXISTS (SELECT name FROM inventory WHERE name='Potatoes');

   
--Drink/Dessert-- 
   
INSERT INTO inventory(name,avg_cost,qty,min_qty,max_qty) 
SELECT 'Chocolate Chip', 0.75, 200, 100, 500 
	WHERE NOT EXISTS (SELECT name FROM inventory WHERE name='Chocolate Chip');

INSERT INTO inventory(name,avg_cost,qty,min_qty,max_qty) 
SELECT 'Sugar Cookie', 0.75, 200, 100, 500 
	WHERE NOT EXISTS (SELECT name FROM inventory WHERE name='Sugar Cookie');

INSERT INTO inventory(name,avg_cost,qty,min_qty,max_qty) 
SELECT '20 oz Bottled Water', 0.12, 60, 30, 150 
	WHERE NOT EXISTS (SELECT name FROM inventory WHERE name='20 oz Bottled Water');

INSERT INTO inventory(name,avg_cost,qty,min_qty,max_qty) 
SELECT '16 oz Bottled Water', 0.14, 60, 30, 150 
	WHERE NOT EXISTS (SELECT name FROM inventory WHERE name='16 oz Bottled Water');

INSERT INTO inventory(name,avg_cost,qty,min_qty,max_qty) 
SELECT 'Fountain Drink', 0.05, 2000, 100, 3500 
	WHERE NOT EXISTS (SELECT name FROM inventory WHERE name='Fountain Drink');

INSERT INTO inventory(name,avg_cost,qty,min_qty,max_qty) 
SELECT 'Ice Cream', 0.15, 200, 100, 500 
	WHERE NOT EXISTS (SELECT name FROM inventory WHERE name='Ice Cream');

INSERT INTO inventory(name,avg_cost,qty,min_qty,max_qty) 
SELECT 'Root Beer', 0.06, 200, 20, 500 
	WHERE NOT EXISTS (SELECT name FROM inventory WHERE name='Root Beer');

INSERT INTO inventory(name,avg_cost,qty,min_qty,max_qty) 
SELECT 'Milk', 0.34, 70, 10, 100 
	WHERE NOT EXISTS (SELECT name FROM inventory WHERE name='Milk');



--misc--

INSERT INTO inventory(name,avg_cost,qty,min_qty,max_qty) 
SELECT 'Frying Oil', 1.39, 300, 50, 2000 
	WHERE NOT EXISTS (SELECT name FROM inventory WHERE name='Frying Oil');

INSERT INTO inventory(name,avg_cost,qty,min_qty,max_qty) 
SELECT 'Napkins', 0.01, 2000, 100, 6500 
	WHERE NOT EXISTS (SELECT name FROM inventory WHERE name='Napkins');


--Do we really need-

INSERT INTO inventory(name,avg_cost,qty,min_qty,max_qty) 
SELECT 'Fountain Beverage Lid', 0.01, 200, 100, 2500 
	WHERE NOT EXISTS (SELECT name FROM inventory WHERE name='Fountain Beverage Lid');

INSERT INTO inventory(name,avg_cost,qty,min_qty,max_qty) 
SELECT 'Straws', 0.07, 200, 100, 1500 
	WHERE NOT EXISTS (SELECT name FROM inventory WHERE name='Straws');

INSERT INTO inventory(name,avg_cost,qty,min_qty,max_qty) 
SELECT '20 oz Fountain Beverage Cups', 0.09, 200, 100, 2500 
	WHERE NOT EXISTS (SELECT name FROM inventory WHERE name='20 oz Fountain Beverage Cups');

INSERT INTO inventory(name,avg_cost,qty,min_qty,max_qty) 
SELECT 'Condiments', 0.15, 1800, 200, 5000 
	WHERE NOT EXISTS (SELECT name FROM inventory WHERE name='Condiments');

INSERT INTO inventory(name,avg_cost,qty,min_qty,max_qty) 
SELECT 'Ice Cream Cups', 0.05, 150, 100, 200 
	WHERE NOT EXISTS (SELECT name FROM inventory WHERE name='Ice Cream Cups');

INSERT INTO inventory(name,avg_cost,qty,min_qty,max_qty) 
SELECT 'Spoons', 0.06, 400, 100, 1000 
	WHERE NOT EXISTS (SELECT name FROM inventory WHERE name='Spoons');

INSERT INTO inventory(name,avg_cost,qty,min_qty,max_qty) 
SELECT 'Forks', 0.06, 600, 100, 1500 
	WHERE NOT EXISTS (SELECT name FROM inventory WHERE name='Forks');

INSERT INTO inventory(name,avg_cost,qty,min_qty,max_qty) 
SELECT 'Knives', 0.06, 400, 100, 1000 
	WHERE NOT EXISTS (SELECT name FROM inventory WHERE name='Knives');



