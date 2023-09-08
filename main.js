class Student{

    constructor(firstname, lastname, age, subjects, grades){
        this.firstname=firstname;
        this.lastname=lastname;
        this.age=age;
        this.subjects=subjects;
        this.grades=grades;

    }


}

var students=[];
function register (firstname,lastname, age){

    var student= new Student(firstname,lastname,age,[],[]);
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
    console.log(students)
    document.getElementById("firstname").value=""; 
    document.getElementById("lastname").value=""; 
    document.getElementById("age").value=""; 

}

function show(id,ids){
    document.getElementById(id).hidden=false;
    ids.forEach((id_)=> {document.getElementById(id_).hidden=true;})
}
document.addEventListener('DOMContentLoaded', () => {
    (document.querySelectorAll('.notification .delete') || []).forEach(($delete) => {
      const $notification = $delete.parentNode;
  
      $delete.addEventListener('click', () => {
        $notification.hidden=true;
      });
    });
  });
