class University {
    students: Student[];
    teachers: Teacher[];

    constructor(students: Student[], teachers: Teacher[]) {
        this.students = students;
        this.teachers = teachers;
    }

    showUniversityInfo(): void {
        console.log("University Information");
        console.log("student : ");
        this.students.forEach(s => {
            console.log(s.getstudentInfo());
        });
        console.log("teacher : ");
        this.teachers.forEach(t => {
            console.log(t.showTeacherInfo());
        });
    }
}

class Student {
    constructor(private id: string, private name: string, private Faculty: string) {}

    getstudentInfo(): string {
        return `นักศึกษารหัส ${this.id} ชื่อ ${this.name} คณะ${this.Faculty}`;
    }
}

class Teacher {
    constructor(private name: string, private major: string) {}

    showTeacherInfo(): string {
        return `ชื่ออาจารย์ ${this.name} สาขา ${this.major}`;
    }
    Teach(student: Student): void {
        console.log(`${this.showTeacherInfo()} : สอน ${student.getstudentInfo()}`);
    }
}
const student1 = new Student("684245039", "Nanthiphat", "sciene");
const student2 = new Student("684245069", "Manee", "sciene");

const teacher1 = new Teacher("Yodruk", "sciene");
const teacher2 = new Teacher("Deena", "sciene");

const npru1 = new University([student1, student2], [teacher1, teacher2]);

npru1.showUniversityInfo();
console.log("-----------------------------------------------------------------------------------");
teacher1.Teach(student1);
teacher1.Teach(student2);
teacher2.Teach(student1);