During the development of the [Week of Food](/work/week-of-food) web-application I also modeled its Entity Relationship Diagram (ERD) for use in a MySQL database.

In short, Week of Food is a ‘zero-effort mealplanner’. The web-application retrieves recipes from a users' Trello board and stores them in a database, which in Week of Food's case is MongoDB. The user can filter and sort these recipes, and in the end, get to a randomized selection of 5 to 7 recipes, which are his menu of the week. 5-minute weekly meal planning, sign me up.

The application offers the user a complete shopping list for his weekly menu as well as a daily menu in their email.

As such, the informational domain of this application includes Users, Recipes and Ingredients. My first go at a conceptual data model looked as follows.

![This image shows my conceptual data model in a schematic way.](/images/articles/sto_conc_model.png)

I implemented the model in MySQL using some link tables and a one-to-many relationship. You can see my final implementation in the image below.

![This image shows my entity relationship diagram.](/images/articles/sto_erd.png)

I used a couple of *stored procedures* to show the days' and weeks' grocery lists for a specific user.

**Daily shopping list**

```sql
CREATE PROCEDURE `dag_boodschappen` (IN gebruiker_ID INT)
BEGIN
        SELECT i.ID, i.naam, i.variant, sum(ri.hoeveelheid), ri.eenheid
        FROM ingredient AS i
        LEFT JOIN recept_ingredient AS ri ON ri.ingredient_ID = i.ID
        LEFT JOIN recept AS r ON ri.recept_ID = r.ID
        LEFT JOIN dag_menu AS dm ON dm.recept_ID = r.ID WHERE dm.datum = cur-
date() and r.gebruiker_ID = gebruiker_ID
        GROUP BY i.ID, ri.eenheid;
END
```

**Weekly shopping list**

```sql
CREATE PROCEDURE `week_boodschappen` (IN gebruiker_ID INT)
BEGIN
        SELECT i.ID, i.naam, i.variant, sum(ri.hoeveelheid), ri.eenheid
        FROM ingredient AS i
        LEFT JOIN recept_ingredient AS ri ON ri.ingredient_ID = i.ID
        LEFT JOIN recept AS r ON ri.recept_ID = r.ID
        LEFT JOIN dag_menu AS dm ON dm.recept_ID = r.ID WHERE dm.datum  = DATE_
ADD(curdate(), INTERVAL 7 DAY) AND r.gebruiker_ID = gebrui-
ker_ID GROUP BY i.ID, ri.eenheid; END
```

### Quirks

If you have ever used any SQL DBMS you know they all have quirks, and not necessarily the same quirks too. It's almost as worse as pre-IE9 browsers. I wanted to set the date of a newly created row in one of my tables to today's date. MySQL has a nice function for that: `curdate()`. But apparently, you cannot use functions as default column values. Because that would be nuts, right? So I wrote a trigger to automatically set the time for me.

```sql
CREATE TRIGGER `weekoffood`.`dag_menu_BEFORE_INSERT` BEFORE INSERT ON `dag_
menu` FOR EACH ROW
BEGIN
        IF (ISNULL(new.datum)) THEN
END IF; SET new.datum=curdate(); END
```

All of this extra work with the stored procedures and triggers makes sure the end users of this database will be able to access and use it securely and non-destructively.

I understand data modeling can be quite boring. I like to make it a little more fun for myself by documenting it beautifully. The document I made was layed out using the *Van de Graaf canon*. The typography was kept clean and simple using Edenspiekermann's excellent Fira Sans & Fira Mono. I made a graphic supposed to visualize the art of data modeling to go in the background on each page. Here's the cover.

![The cover of my data modeling documentation](/images/articles/sto_cover.png)
