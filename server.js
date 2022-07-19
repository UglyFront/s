const express = require("express")
const cors = require("cors");
let Pool = require("pg").Pool;


//DB CONFIG

const db = new Pool({
    user: "postgres",
    password: "109109109",
    host: "localhost",
    port: 5432,
    database: "coddy"
});



db.connect()



const app = express()

const PORT = 80



app.use(cors({
    origin: "*"
}))

app.use(express.json())






let admPassword = "333"
let moderPassword = "222"




//POSTS


app.post("/admPassword", (req, res) => {
    let pass = req.body.password;
    
    if (pass == admPassword) {
        res.status(200).json("Пароль верен!")
    }
    else {
        res.status(400).json("Пароль не верен!")
    }
})


app.post("/moderPassword", (req, res) => {
    let pass = req.body.password;
    
    if (pass == moderPassword) {
        res.status(200).json("Пароль верен!")
    }
    else {
        res.status(400).json("Пароль не верен!")
    }
})


app.put("/updateModerPassword", (req, res) => {
    let newPass = req.body.newPass
    moderPassword = newPass
    res.status(200).json("Пароль поменян на " + moderPassword)
})




app.get("/posts", async(req, res) => {
    let id = req.query.id;

    if(!id) {
        await db.query(`SELECT * FROM posts ORDER BY id DESC;`, (e, r) => {
            try {
                res.status(200).json(r.rows);
            }
            catch(e) {
                console.log(e)
                 res.status(400).json();
            }
    })
    }
    else {
        await db.query(`SELECT * FROM posts WHERE ID = ${id}`, (e, r) => {
            try {
                if (r.rows.length === 0) {
                    res.status(400).json("Такого поста нет");
                }
                else {
                    res.status(200).json(r.rows);
                }
            }
            catch(e) {
                console.log(e)
          res.status(400).json();
    }})

}})// ПОЛУЧИТЬ ВСЕ ПОСТЫ

app.get("/posts_two", async(req, res) => {
    await db.query(`SELECT * FROM posts ORDER BY id DESC LIMIT 2;`, (e, r) => {
        try {
            res.status(200).json(r.rows);
        }
        catch(e) {
            console.log(e)
             res.status(400).json();
        }
})}) // 2 ПОСТА

app.put("/posts_userid", async(req, res) => {
    let id = req.body.id
    await db.query(`SELECT * FROM posts WHERE author_id = ${id};`, (e, r) => {
        try {
            res.status(200).json(r.rows);
        }
        catch(e) {
            console.log(e)
             res.status(400).json();
        }
    })})// ПОЛУЧИТЬ ВСЕ ПОСТЫ ЮЗЕРА


app.post("/posts", async(req, res) => {
    let name = req.body.name;
    let body = req.body.body;
    let img = req.body.img; // автор
    let imgPost = req.body.imgPost;
    let imgPost2 = req.body.imgPost2;

    await db.query(`INSERT INTO posts(body, name, img, imgPost, imgPost2) VALUES ('${body}','${name}', '${img}', '${imgPost}', '${imgPost2}')`, (e, r) => {
        try {
            res.status(200).json("Добален пост " + name)
            console.log(1)
        }
        catch(e) {
            console.log(e)
             res.status(400).json();
        } 
    })
})// ДОБАВИТЬ ПОСТ 


app.post("/posts_like", async(req, res) => {
    let user_id = req.body.user_id;
    let post_id = req.body.post_id;

    await db.query(`INSERT INTO likes(post_id, user_id) VALUES(${post_id}, ${user_id});`, (e, r) => {
        try {
            res.status(200).json(`лайк к посту добавлен`)
        }
        catch(e) {
            console.log(e)
             res.status(400).json();
        }
    })
})


app.delete("/posts_like", async(req, res) => {
    let user_id = req.body.user_id;
    let post_id = req.body.post_id;

    await db.query(`DELETE FROM likes WHERE user_id = ${user_id} AND post_id = ${post_id};`, (e, r) => {
        try {
            res.status(200).json(`лайк к посту удален`)
        }
        catch(e) {
            console.log(e)
             res.status(400).json();
        }
    })
})


app.put("/posts_like_user", async(req, res) => {
    let user_id = req.body.user_id;

    await db.query(`SELECT * FROM likes WHERE user_id = ${user_id}`, (e, r) => {
        try {
            res.status(200).json(r.rows)
        }
        catch(e) {
            console.log(e)
             res.status(400).json();
        }
    })
})


app.put("/count_likes_post", async(req, res) => {
    let post_id = req.body.post_id;
    await db.query(`SELECT * FROM likes WHERE post_id = ${post_id};`, (e, r) => {
        try {
            res.status(200).json(r.rows.length)
        }
        catch(e) {
            console.log(e)
             res.status(400).json();
        }
    })
})
 


app.delete("/posts", async(req, res) => {
    let id = req.body.id;

    await db.query(`DELETE FROM posts WHERE id = ${id};`, (e, r) => {
        try {
            res.status(200).json("Удалил пост" + id)
        }
        catch(e) {
            console.log(e)
             res.status(400).json();
        }
    })
}) // УДАЛИТЬ ПОСТ


app.delete("/posts_all", async(req, res) => {
    await db.query(`DELETE FROM posts;`, (e, r) => {
        try {
            res.status(200).json("Удалил посты")
        }
        catch(e) {
            console.log(e)
             res.status(400).json();
        }
})})



app.post("/comment", async(req, res) => {
    let post_id = req.body.post_id;
    let body = req.body.body;
    let user_name = req.body.user_name;

    await db.query(`INSERT INTO comments(post_id, user_name, body) VALUES(${post_id}, '${user_name}', '${body}');`, (e, r) => {
        try{
            res.status(200).json("added")
        }
        catch(e) {
            console.log(e)
             res.status(400).json();
        }
    })
}) // ДОБАВИТЬ КОММЕНТ



app.get("/сomment", async(req, res) => {
    await db.query(`SELECT * FROM comments;`, (e, r) => {
        try {
            res.status(200).json(r.rows)
        } catch(e) {
            console.log(e)
             res.status(400).json();
        }
    })
}) // ПОЛУЧИТЬ ВСЕ КОММЕНТЫ



app.delete("/comment", async(req, res) => {
    let id = req.body.id;

    await db.query(`DELETE FROM comments WHERE id = ${id};`, (e, r) => {
        try {
            res.status(200).json("удалил")
        } catch(e) {
            console.log(e)
             res.status(400).json();
        }
    })
}) // УДАЛИТЬ КОММЕНТ



app.put("/comment_post", async(req, res) => {
    let post_id = req.body.post_id

    await db.query(`SELECT * FROM comments WHERE post_id = ${post_id};`, (e, r) => {
        try {
            res.status(200).json(r.rows)
        } catch(e) {
            console.log(e)
             res.status(400).json();
        }
    })
}) // ПОЛУЧИТЬ ВСЕ КОММЕНТЫ К ПОСТУ ПО ИД

/////////////////////////////////




 




// LK


app.post("/registr", async (req, res) => {

    let login = req.body.login;
    let password = req.body.password;
    let name = req.body.name;
    let age = +req.body.age;
    let parent = req.body.parent;
    let phone = req.body.phone;
    let coin = +req.body.coin;


    await db.query(`SELECT * FROM users WHERE login = '${login}'`, async(err, result) => {
        try {
            console.log(result.rows.length)
        if (result.rows.length === 0) {
           await db.query(`INSERT INTO users(login, password, name, age, parent, phone, coin) VALUES ('${login}', '${password}', '${name}', ${age}, '${parent}', '${phone}', ${coin});`, (e, r, f) => {
                try {
                    res.status(200).json(`Пользователь ${name} создан`)
                }
                catch(e) {
                    console.log(e)
                }
        })
        }
        else {
            res.status(400).json("Логин не уникален")
        }
        }
        catch(err) {
            console.log(err)
             res.status(400).json();
        }
    })

}) // ЛОГИКА РЕГИСТРАЦИИ



app.put("/addcoin", async (req, res) => {
    let id = req.body.id
    let colvo = req.body.col

    await db.query(`UPDATE users SET coin = coin + ${colvo} WHERE id = ${+id};`, async(e, r, f) => {
        try {
            await db.query(`SELECT * FROM users WHERE id = ${id}`, (err,result) => {
                console.log(result.rows)
                res.status(200).json(`Начиселно, баланс ${result.rows[0].name} = ${result.rows[0].coin} `)
            })
        }
        catch(e) {
            console.log(e)
             res.status(400).json();
        } 
    })
    
}) // ДОБАВИТЬ КОИНЫ




app.post("/login", async(req, res) => {
    let login = req.body.login
    let password = req.body.password

    await db.query(`SELECT * FROM users WHERE login = '${login}' AND password = '${password}'`, (e, r, f) => {
        try {
            if (r.rows.length === 0) {
                res.status(400).json("Попробуйте снова")
            }
            else {
                console.log(r.rows)
                res.status(200).json(r.rows[0])
            }
        }
        catch(e) {
            console.log(323232)
            console.log(e)
             res.status(400).json();
        }
    })
    
}) // ЛОГИКА ЛОГИНА







app.get("/gettingusers", async (req, res) => {
    await db.query(`SELECT * FROM users;`, (err, result) => {
        try {
            res.status(200).json(result.rows)
        }
        catch(e) {
            console.log(e)
             res.status(400).json();
        }
    })
})// ПОЛУЧИТЬ ВСЕХ ПОЛЬЗОВАТЕЛЕЙ



app.put("/getuser", async (req, res) => {
    let id = req.body.id;
    await db.query(`SELECT * FROM users WHERE id = ${id};`, (err, result) => {
        try {
            res.status(200).json(result.rows[0])
        }
        catch(e) {
            console.log(e)
             res.status(400).json();
        }
    })
})// ПОЛУЧИТЬ 1 ПОЛЬЗОВАТЕЛЯ



app.delete("/user", async (req, res) => {
    let id = req.body.id;
    await db.query(`DELETE FROM users WHERE id = ${id};`, (err, result) => {
        try {
            res.status(200).json("Удален")
            console.log(11111111)
        }
        catch(e) {
            console.log(e)
             res.status(400).json();
        }
    })
})

/////////////////////////////////
















//CATEGORIES
app.post("/categories", async (req, res) => {
    let name = req.body.name;
    
    await db.query(`INSERT INTO categories(name) VALUES('${name}');`, (e, r) => {
        try {
            res.status(200).json(`Категория ${name} добавлена`)
        }
        catch(e) {
            console.log(e)
             res.status(400).json();
        }
    })
}) // СОЗДАТЬ КАТЕГОРИЮ



app.delete("/delcat", async (req, res) => {
    let id = req.body.id;
    console.log(req.body)

    await db.query(`DELETE from categories WHERE id = ${id};`, (e, r) => {
        try {
            res.status(200).json(`Категория с id ${id} удалена`)
        }
        catch(e) {
            console.log(e)
             res.status(400).json();
        }
    })
    
}) // УДАЛИТЬ КАТЕГОРИЮ




app.get("/categories", async (req, res) => {
    await db.query(`SELECT * FROM categories`, (e, r) => {
        try {
            console.log(r.rows)
            res.status(200).json(r.rows)
        }
        catch (e) {
            console.log(e)
             res.status(400).json();
        }
    })
}) // ПОЛУЧИТЬ ВСЕ КАТЕГОРИИ

/////////////////////////////////
















//ITEM
app.post("/newelement", async (req, res) => {
    let img = req.body.img;
    let name = req.body.name;
    let price = +req.body.price;
    let price_rub = +req.body.price_rub;
    let cat_id = +req.body.cat_id;
    console.log(req.body)


    await db.query(`INSERT INTO item(img, name, price, price_rub, cat_id) VALUES ('${img}', '${name}', ${price}, ${price_rub}, ${cat_id});`, (e, r) => {
        try {
            res.status(200).json(`Элемент ${name} создан`)
            
            db.query(`SELECT * FROM item;`, (e, r) => {
                console.log(r.rows)
            })
        }
        catch (e) {
            console.log(e)
             res.status(400).json();
        }
    })
}) // СОЗДАТЬ НОВЫЙ ТОВАР



app.get("/all", async(req, res) => {
    await db.query(`SELECT * FROM item;`, (e, r) => {
        try {
            res.status(200).json(r.rows)
        }   
        catch(e) {
            console.log(e)
             res.status(400).json();
        }
    })
})// ПОЛУЧИТЬ ВСЕ ТОВАРЫ






app.put("/updatecoin", async(req, res) => {
    let id = req.body.id;
    let potrat = req.body.potrat;
    
    await db.query(`UPDATE users SET coin = coin - ${potrat} WHERE id = ${id};`, async (e, r) => {
        try {
            await db.query(`SELECT * FROM users WHERE id = ${id};`, (error, result) => {
                try {
                    res.status(200).json(result.rows[0])
                }
                catch(e) {
                    console.log(e)
                     res.status(400).json();
                }
            })
        }
        catch(e) {
            console.log(e)
             res.status(400).json();
        }
    })
    
}) // ОТНЯТЬ КОИНЫ ПРИ ПОКУПКЕ




// let body = {
//     img: img,
//     name: name,
//     price: price,
//     cat_id: Number(cat_id)
// }

app.delete("/delel", async (req, res) => {
    let name = req.body.name;
    
    await db.query(`DELETE FROM item WHERE name = '${name}'`, (e,r) => {
        try {
            res.status(200).json("Удален элемент " + name)
        }
        catch(e) {
            console.log(e)
             res.status(400).json();
        } 
    })
}) // УДАЛИТЬ ТОВАР
 
/////////////////////////////////


















//ORDER
app.put("/delOrder", async(req, res) => {
    let id = req.body.id;

    await db.query(`DELETE FROM orders WHERE id = ${id}`, (e, r) => {
        try {
            res.status(200).json()
        }
        catch(e) {
            console.log(e)
             res.status(400).json();
        }
    })
}) // УДАЛИТЬ 1 ЗАКАЗ




app.post("/order", async(req, res) => {
    let name = req.body.name;
    let order_name = req.body.order_name;
    let price = req.body.price;
    
   await db.query(`INSERT INTO orders(name, order_name, price) VALUES ('${name}', '${order_name}', ${price});`, (e, r) => {
       try {
            res.status(200).json("Твой заказ оптравлен! :)")
       }
       catch(e) {
            console.log(e)
            res.status(400).json();
       }
   })
}) // ОТПРАВИТЬ ЗАКАЗ ИЗ МОДАЛКИ



app.get("/order", async(req, res) => {
    await db.query(`SELECT * FROM orders;`, (e, r) => {
        try {
            res.status(200).json(r.rows)
        }
        catch(e) {
            console.log(e)
             res.status(400).json();
        }
    })
}) // ПОЛУЧИТЬ ВСЕ ЗАКАЗЫ



app.put("/clear", async(req, res) => {
    console.log(req)
    await db.query(`DELETE FROM orders`, (e, r) => {
        try {
            res.status(200).json()
        }
        catch(e) {
            console.log(e)
             res.status(400).json();
        }
    })
}) // ОЧИСТИТЬ ВСЕ ЗАКАЗЫ
/////////////////////////////////




// КУРСЫ
app.get("/courses", async(req, res) => {
    await db.query(`SELECT * FROM courses;`, (e, r) => {
        try {
            res.status(200).json(r.rows)
        }
        catch(e) {
            console.log(e)
             res.status(400).json();
        } 
    })
})

app.post("/courses", async(req, res) => {
    let title = req.body.title;
    let description = req.body.description;
    let img = req.body.img;
    let price = req.body.price;

    await db.query(`INSERT INTO courses(title, description, img, price) VALUES('${title}', '${description}', '${img}', ${price});`, (e, r) => {
        try {
            res.status(200).json("Курс добавлен")
        }
        catch(e) {
            console.log(e)
             res.status(400).json();
        }
    })
})


app.delete("/courses", async(req, res) => {
    let id = req.body.id;

    await db.query(`DELETE FROM courses WHERE id = ${id}`, (e, r) => {
        try {
            res.status(200).json("Курс удален")
        }
        catch(e) {
            console.log(e)
             res.status(400).json();
        }
    })
})

//









// ЗАПИСЬ НА КУРСЫ
    app.post('/gocourse', async(req, res) => {
        let parent = req.body.parent;
        let child = req.body.child;
        let age = +req.body.age
        let phone = req.body.phone;
        let course_title = req.body.course_title

        await db.query(`INSERT INTO candidate_courses(parent, child, age, phone, course_title) VALUES ('${parent}', '${child}', ${age}, '${phone}', '${course_title}');`, (e, r) => {
            try {
                res.status(200).json(`Заявка отправлена!`)
            }
            catch(e) {
                console.log(e)
                 res.status(400).json();
            }
        })
    })


    app.get("/gocourse", async(req, res) => {
        await db.query("SELECT * FROM  candidate_courses;", (e, r) => {
            try{
                console.log(r.rows)
                res.status(200).json(r.rows)
            }
            catch(e) {
                console.log(e)
                 res.status(400).json();
            }
        })
    })


    app.delete("/gocourse", async(req, res) => {
        let id = req.body.id

        await db.query(`DELETE FROM candidate_courses WHERE id = ${id};`, (e, r) => {
            try{
                res.status(200).json("Удален")
            }
            catch(e) {
                console.log(e)
                 res.status(400).json();
            }
        })
    })


    app.delete("/gocourse_all", async(req, res) => {
        await db.query(`DELETE FROM candidate_courses;`, (e, r) => {
            try{
                res.status(200).json("Удаленo все")
            }
            catch(e) {
                console.log(e)
            }
        })
    })
//


app.post("/day", async (req, res) => {
    let name = req.body.name
    console.log(name)

    await db.query(`INSERT INTO day(name) VALUES('${name}');`, (e, r) => {
        try {
            res.status(200).json(`День ${name} добавлен`)
        }
        catch(e) {
            console.log(e)
             res.status(400).json();
        }
    })
})





app.post("/lessons", async (req, res) => {
    let {time, name, day_id} = req.body

    await db.query(`INSERT INTO lessons(time, name, day_id) VALUES('${time}', '${name}', ${day_id});`, (e, r) => {
        try {
            res.status(200).json(`Урок ${name} на ${time} добавлен`)
        }
        catch(e) {
            console.log(e)
             res.status(400).json();
        }
    })
})



app.get("/lessons", async (req, res) => {
    let out = []

    await db.query(`SELECT * FROM day;`, async(e, r) =>{
        let day = r.rows;
        console.log(day)

        await db.query(`SELECT * FROM lessons;`, (e2, r2) => {
            let lessons = r2.rows


            day.forEach(el => {
                el.lessons = []
                lessons.forEach(le => {
                    if (el.id === le.day_id) {
                        el.lessons.push(le)
                    }
                })
                out.push(el)
            })
            res.status(200).json(out)
        })
    })
})


app.delete("/day", async(req, res) => {
    let id = req.body.id

    await db.query(`DELETE FROM day WHERE id = ${id};`, async(e, r) => {
        try {
            await db.query(`DELETE FROM lessons WHERE day_id = ${id};`, () => {
                res.status(200).json()
            })
        }
        catch(e) {
            console.log(e)
             res.status(400).json();
        }
    })
})
 


app.post("/trade", async(req, res) => {
    let sendId = req.body.sendId;
    let adressId = req.body.adressId;
    let summa = req.body.summa;

    await db.query(`SELECT * FROM users WHERE id = ${adressId}`, async (e, r) => {
        try {
            if(!r.rows.length) {
                res.status(400).json('Такого пользователя нет')
            }
            else {
                await db.query(`UPDATE users SET coin = coin - ${summa} WHERE id = ${sendId};`, async(e2, r2) => {
                    await db.query(`UPDATE users SET coin = coin + ${summa} WHERE id = ${adressId};`, (e3, r3) => {
                        res.status(200).json(`Отправлено ${summa} пользователю ${r.rows[0].name}`)
                    })
                })
            }
        }
        catch(e) {
            res.status(400).json();
        }
    })
})







app.listen(PORT, () => {
    try {
        console.log("Server has been start on : " + PORT);
    } catch(e) {
        console.log(e)
    }
})
