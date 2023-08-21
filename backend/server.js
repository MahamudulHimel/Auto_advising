
const express = require("express");
const app = express(); 
const cors = require("cors");
const pool = require("./db");

async function fetch_all_sections(courses){
    let arr1 = []
    for (let i in courses){
        //console.log(courses[i])
        //console.log("http://localhost:4000/classes/search_by_course/".concat(courses[i]));
        let response = await fetch("http://localhost:4000/classes/search_by_course/".concat(courses[i]));
        let arr2 = await response.json();
        arr1 = arr1.concat(arr2);
    }
    return arr1;
}

function table_gen(rows,cols, default_value = null){
    var arr1 = []
    for (let i = 0; i < rows; i++){
        var arr2 = [];
        for (let j = 0; j< cols; j++){
            arr2.push(default_value)
        }
        arr1.push(arr2)
    }
    return arr1
}

function allowed(course, allowed_time){
    for (let i in allowed_time){
        //console.log(allowed_time[i], course.class_days, course.class_time, course.course, i)
        if ((allowed_time[i][0] == course.class_days) && (allowed_time[i][1] == course.class_time)){
            if (course.has_lab){
                for (let j in allowed_time){
                    if ((allowed_time[j][0] == course.lab_days) && (allowed_time[j][1] == course.lab_time)){
                        return true
                    }
                }
            }
            else return true
        }
    }
    return false
    }

function taken_before(course, courses_taken){
    for (let i in courses_taken){
        if (course.course === courses_taken[i]){
            return true
        }
    }
    return false
}

async function arrange(courses, num_of_courses, allowed_time){
    var arr1 = [];
    var course_taken = [];
    let response = []
    var stack = []
    let table = table_gen(6,6,true)
    arr1 = await fetch_all_sections(courses)
    let i = 0
    while (1){
        if (taken_before(arr1[i],course_taken)){
            console.log("aaa");
        } 
        else if (!(table[arr1[i].class_days-1][arr1[i].class_time-1])){
            console.log("bbb");
        }
        else if (arr1[i].has_lab && ((!(table[arr1[i].lab_days-1][arr1[i].lab_time-1])) || (!(table[arr1[i].lab_days-1][arr1[i].lab_time])))){
            console.log('bbb.ccc')
        }
        else if (!(allowed(arr1[i] , allowed_time))){
            console.log("ccc");
        }
        else{
            table[arr1[i].class_days-1][arr1[i].class_time-1] = false;

            if (arr1[i].class_days == 1) table[arr1[i].class_days+4][arr1[i].class_time-1] = false;
            else table[arr1[i].class_days+1][arr1[i].class_time-1] = false;

            if (arr1[i].has_lab){
                table[arr1[i].lab_days-1][arr1[i].lab_time-1] = false;
                table[arr1[i].lab_days-1][arr1[i].lab_time] = false;
            }
            course_taken.push(arr1[i].course);
            stack.push(i);
        }
        i+=1;
        
        if (stack.length === num_of_courses) break;

        if (i === arr1.lenght){
            i = stack.pop();
            table[arr1[i].class_days-1][arr1[i].class_time-1] = true;
            i+=1;
        }

        if (i >= arr1.length){
            break
        }
    }
    
    response = stack.map(i => arr1[i]);
    console.log(response);
    return response
}

const fetch_data = async (s,userId) => {
    const response = await fetch(`http://localhost:4000/taken_courses/${s}/${userId}`)
    let exam = []
    let arr1 = [
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0]
      ]
    const all = await response.json()
    const data = all[0][`target_class_ids_${s}`]
    for (let i in data){

        const cls = await fetch(`http://localhost:4000/classes/${data[i]}`)
        const cls1 = await cls.json()
        const cls2 = await fetch(`http://localhost:4000/course_info/${cls1[0]["course"]}`)
        const cls3 = await cls2.json()

        arr1[parseInt(cls1[0]['class_time'])-1][parseInt(cls1[0]['class_days'])-1] = cls1[0]["course"] + "-" + cls1[0]['section']
        if (parseInt(cls1[0]['class_days']) == 1){
            arr1[parseInt(cls1[0]['class_time'])-1][parseInt(cls1[0]['class_days'])+4] = cls1[0]["course"] + "-" + cls1[0]['section']
        }
        else{
            arr1[parseInt(cls1[0]['class_time'])-1][parseInt(cls1[0]['class_days'])+1] = cls1[0]["course"] + "-" + cls1[0]['section']
        }
        exam.push({time: cls3[0].exam_time, date:cls3[0].exam_date, course: cls3[0].course})
    }
    return [arr1, exam]
    }

app.use(cors());
app.use(express.json());

app.get("/classes", async (req,res) => {
    try {
        const all = await pool.query("select * from class_timetable",[]);
        res.json(all.rows);

    } catch(err){
        console.error(err.message);
    }
});

app.get("/users", async (req,res) => {
    try {
        const all = await pool.query("select * from users",[]);
        res.json(all.rows);

    } catch(err){
        console.error(err.message);
    }
});

app.get("/pre_req", async (req,res) => {
    try {
        const all = await pool.query("select * from pre_req",[]);
        res.json(all.rows);

    } catch(err){
        console.error(err.message);
    }
});

app.get("/classes/search_by_course/:course", async (req,res) => {
    try {
        const { course } = req.params;
        const all = await pool.query("select * from class_timetable where course = '".concat(course, "'"));
        res.json(all.rows);
    } catch(err){
        console.error(err.message);
    }
});

app.get("/classes/search_by_time/:class_time", async (req,res) => {
    try {
        const { class_time } = req.params;
        const all = await pool.query("select * from class_timetable where class_time = ($1)",[class_time]);
        res.json(all.rows);
    } catch(err){
        console.error(err.message);
    }
});

app.get("/courses", async (req,res) => {
    try {
        const { course } = req.params;
        const all = await pool.query("select * from pre_req");
        res.json(all.rows);
    } catch(err){
        console.error(err.message);
    }
});

app.get("/classes/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const all = await pool.query("select * from class_timetable where id = ($1)",[id]);
        res.json(all.rows);
    } catch(err){
        console.error(err.message);
    }
});

app.get("/time_get/:user_id", async (req,res) => {
    try {
        let arr1 = [
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
          ];
        const { user_id } = req.params;
        const t0 = await pool.query("select allowed_time_0 from users where id = ($1)",[user_id]);
        const t1 = await pool.query("select allowed_time_1 from users where id = ($1)",[user_id]);

        for (i in t1.rows[0].allowed_time_1){
            arr1[parseInt(t1.rows[0].allowed_time_1[i])-1][parseInt(t0.rows[0].allowed_time_0[i])-1] = 1
        }
        res.json({'routine' : arr1});
    } catch(err){
        console.error(err.message);
    }
});


app.put("/time_set/:user_id", async (req,res) => {
    try {
        const { user_id } = req.params;
        let t0 = []
        let t1 = []
        for (i in req.body.allowed_time){
            t0.push(req.body.allowed_time[i][0])
            t1.push(req.body.allowed_time[i][1])
        }
        const a = await pool.query('UPDATE users SET allowed_time_0 = ($1), allowed_time_1 = ($2) WHERE id = ($3)',[t0,t1,user_id]);
        res.json(a)
    } catch(err){
        console.log(err.message)
    }
});

app.get("/taken_courses/:set/:user_id", async (req,res) => {
    try {
        const { set , user_id } = req.params;
        const all = await pool.query(`select target_class_ids_${set} from users where id = ($1)`,[ user_id]);
        res.json(all.rows);
    } catch(err){
        console.error(err.message);
    }
});

app.get("/routine/:set/:user_id", async (req,res) => {
    try {
        const { set , user_id } = req.params;
        const all = await fetch_data(set, user_id)
        res.json(all);
    } catch(err){
        console.error(err.message);
    }
});

app.get("/course_info/:course", async (req,res) => {
    try {
        const { course } = req.params;
        const all = await pool.query(`select * from pre_req where course = ($1)`,[course]);
        res.json(all.rows);
    } catch(err){
        console.error(err.message);
    }
});

app.listen(4000);

app.post("/auto_advise/:user_id/:set", async (req, res) =>{
    try {
        const {user_id , set} = req.params;
        const { courses, num } = req.body;
        console.log(user_id , set, courses, num)
        const all = await pool.query(`select allowed_time_0, allowed_time_1 from users where id = ($1)`,[user_id]);
        res.json(all.rows)
        allowed_time = []
        console.log(courses, num)
        for (i in all.rows[0].allowed_time_0){
            allowed_time.push([all.rows[0].allowed_time_0[i],all.rows[0].allowed_time_1[i]])
        }
        console.log(allowed_time)
        let r = await arrange(courses, parseInt(num), allowed_time)
        console.log(r)
        let a = []
        for (i in r){
            a.push(r[i].id)
        }
        console.log(`UPDATE users SET target_class_ids_${set} = '{${a}}' WHERE id = ${user_id}`)
        all = await pool.query(`UPDATE users SET target_class_ids_${set} = '{${a}}' WHERE id = ${user_id}`)
        
    }
    catch(err){
        console.error(err.message)
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const all = await pool.query("select * from users where email = '"+ email + "'");
    const user = await all.rows
    console.log("select * from users where email = '"+ email + "'", password, user)
      if (user[0]) {
        //check password
        if (password == user[0].password) {
          res.send({ message: "Login successfully", user:user[0] });
        } else {
          res.send({ message: "Password and confirm password didn't match" });
        }
      } else {
        res.send({ message: "Please login to proceed" });
      }
    });

app.post("/signup", async (req, res) => {
    const { fname, lname, email, password } = req.body;
    const all = await pool.query("select * from users where email = ($1)",[email]);
    const user = await all
    console.log(user.rows)
    if (user.rows[0]) {
    res.send({ message: "User is already registerd" });
    } else {
    try{
    console.log(`INSERT INTO users (name , email, password) VALUES (${fname+lname} , ${email}, ${password})`)
    const all2 = await pool.query("INSERT INTO users (name , email, password) VALUES (($1) , ($2), ($3))",[fname+lname, email, password]);
    res.send({ message: "Account has been created!! Please Login" });
    }
    catch(err){
        if (err) {
        res.send(err);
        }
        }
    }
    });
        // res.send("register");
        //   console.log(req.body);
