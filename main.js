class Student{

    constructor(firstname, lastname, age, subjects, grades){
        this.firstname=firstname;
        this.lastname=lastname;
        this.age=age;
        this.subjects=subjects;
    }
}
class Class{
    constructor(classname, classid){
        this.classname=classname;
        this.classid=classid;
    }
}

if (localStorage.getItem("students")===null){
    var students= [];
}else{
    var students_=JSON.parse(localStorage.getItem("students"));
    var students = [];
    console.log(students_);
    students_.forEach(s=>{
        students.push(new Student(s.firstname,s.lastname,s.age,s.subjects));
    });
}

if (localStorage.getItem("classes")===null){
    var classes= [];
}else{
    var classes_=JSON.parse(localStorage.getItem("classes"));
    var classes=[];
    classes_.forEach(c=>{
        classes.push(new Class(c.classname,c.classid));
    });
}

function registerclass (classname, classid){
    var c=new Class(classname, classid);
    classes.push(c);
} 

function register (firstname,lastname, age){
    var student= new Student(firstname,lastname,age,{});
    students.push(student);
}

function addstudent (){
    var firstname=document.getElementById("firstname").value; 
    if(firstname.length==0){document.getElementById("firstname_error").hidden=false;return 0;}
    var lastname=document.getElementById("lastname").value; 
    if(lastname.length==0){document.getElementById("lastname_error").hidden=false; return 0;}
    var age=document.getElementById("age").value; 
    if(age.length==0){document.getElementById("age_error").hidden=false; return 0;}

    register (firstname,lastname,age); 
    localStorage.setItem('students',JSON.stringify(students));
    document.getElementById("firstname").value=""; 
    document.getElementById("lastname").value=""; 
    document.getElementById("age").value=""; 
}

function addclass(){
    var classname=document.getElementById("classname").value; 
    if(classname.length==0){document.getElementById("classname_error").hidden=false;return 0;}
    var classid=document.getElementById("classid").value; 
    if(classid.length==0){document.getElementById("classid_error").hidden=false; return 0;}
    
    registerclass(classname,classid);
    localStorage.setItem('classes',JSON.stringify(classes)); 
    document.getElementById("classname").value=""; 
    document.getElementById("classid").value="";  
}

function savestudentgrade(){
    var candidatestudents=document.getElementById ("candidatestudents2").value;
    var candidateclass=document.getElementById ("candidateclass2").value;
    var grade=parseInt(document.getElementById ("grade").value);
    
    students[parseInt(candidatestudents)].subjects[classes[parseInt(candidateclass)].classid]=grade;
    localStorage.setItem('students',JSON.stringify(students)); 
    document.getElementById ("grade").value="";
}

function enrollstudent(){
    var candidatestudents=document.getElementById ("candidatestudents").value;
    var candidateclass=document.getElementById ("candidateclass").value;
    students[parseInt(candidatestudents)].subjects[classes[parseInt(candidateclass)].classid]=0;
    localStorage.setItem('students',JSON.stringify(students)); 
}



function show(id,ids){
    document.getElementById(id).hidden=false;
    ids.forEach((id_)=> {document.getElementById(id_).hidden=true;})
}
function showenrolledstudents(id,ids){
    var options=document.getElementById("candidatestudents");
    var index=0;
    var child=options.lastElementChild;
    while(child){
        options.removeChild(child);
        child=options.lastElementChild;
    }
    students.forEach(student=>{
    let opt = document.createElement('option');
    opt.value=index;
    opt.textContent= student.firstname+' '+student.lastname; 
    options.appendChild(opt);
    index+=1;
    })

    var options=document.getElementById("candidateclass");
    var index=0;
    var child=options.lastElementChild;
    while(child){
        options.removeChild(child);
        child=options.lastElementChild;
    }
    classes.forEach(c=>{
    let opt = document.createElement('option');
    opt.value=index;
    opt.textContent= c.classid; 
    options.appendChild(opt);
    index+=1;
    })
    show(id,ids);
}

function showstudentlist(id,ids){
    var table=document.getElementById("studentstable");
    var child=table.lastElementChild;
    while(child){
        table.removeChild(child);
        child=table.lastElementChild;
    }
    for(let i=0;i<students.length;i++){
    const tr=table.insertRow();
    var student=students [i];
    var td=tr.insertCell();
    td.textContent=student.firstname;
    td=tr.insertCell();
    td.textContent=student.lastname;
    td=tr.insertCell();
    td.textContent=student.age;
    td=tr.insertCell();
    var t=[];
    console.log(student.subjects);
    for(const [k,v] of Object.entries(student.subjects)){
        t.push(k+" ["+v+"]");
    }
    td.textContent=t.join(", ");
    }
    show(id,ids);
}

function showgradestudent(id,ids){
    var options=document.getElementById("candidatestudents2");
    var index=0;
    var child=options.lastElementChild;
    while(child){
        options.removeChild(child);
        child=options.lastElementChild;
    }
    students.forEach(student=>{
    let opt = document.createElement('option');
    opt.value=index;
    opt.textContent= student.firstname+' '+student.lastname; 
    options.appendChild(opt);
    index+=1;
    })

    show(id,ids);
    loadclasses();
}

function loadclasses(){
    var i=parseInt(document.getElementById("candidatestudents2").value);
    var student=students[i];
    console.log(">>>",student);

    var options=document.getElementById("candidateclass2");
    var index=0;
    var child=options.lastElementChild;
    while(child){
        options.removeChild(child);
        child=options.lastElementChild;
    }
    for(const [k,v] of Object.entries(student.subjects)){
    let opt = document.createElement('option');
    opt.value=index;
    opt.textContent= k; 
    options.appendChild(opt);
    index+=1;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    (document.querySelectorAll('.notification .delete') || []).forEach(($delete) => {
    const $notification = $delete.parentNode;
    $delete.addEventListener('click', () => {
        $notification.hidden=true;
    });
    });
    });

    document.addEventListener('DOMContentLoaded', () => {

        // Get all "navbar-burger" elements
        const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
      
        // Add a click event on each of them
        $navbarBurgers.forEach( el => {
          el.addEventListener('click', () => {
      
            // Get the target from the "data-target" attribute
            const target = el.dataset.target;
            const $target = document.getElementById(target);
      
            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            el.classList.toggle('is-active');
            $target.classList.toggle('is-active');
      
          });
        });
      
      });
