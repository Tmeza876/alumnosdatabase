class Student{

    constructor(firstname, lastname, age, subjects, grades){
        this.firstname=firstname;
        this.lastname=lastname;
        this.age=age;
        this.subjects=subjects;
        this.grades=grades;

    }


}

console.log(students);
var students=[];
function register (firstname,lastname, age){

    var student= new Student(firstname,lastname,age,[],[]);
    students.push(student);
}
register ("theresa","barrett","34"); 
console.log(students)

register ("ivan","meza","43"); 
console.log(students)

