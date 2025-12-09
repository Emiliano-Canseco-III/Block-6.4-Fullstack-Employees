import db from "#db/client";
import { createEmployee } from "#db/queries/employees";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  const employees = [
    {
      name: "Mark",
      birthday: "1990-10-12",
      salary: 150000,
    },

    {
      name: "Jane",
      birthday: "1985-05-30",
      salary: 120000,
    },

    {
      name: "John",
      birthday: "1978-03-22",
      salary: 130000,
    },

    {
      name: "Emily",
      birthday: "2005-11-15",
      salary: 90000,
    },

    {
      name: "Michael",
      birthday: "1995-07-08",
      salary: 110000,
    },

    {
      name: "Sarah",
      birthday: "1988-02-14",
      salary: 125000,
    },

    {
      name: "David",
      birthday: "1975-09-05",
      salary: 140000,
    },

    {
      name: "Laura",
      birthday: "1992-12-20",
      salary: 115000,
    },

    {
      name: "Robert",
      birthday: "1980-06-18",
      salary: 135000,
    },

    {
      name: "Olivia",
      birthday: "1998-04-25",
      salary: 105000,
    },
  ];

  for (const e of employees) {
    try {
      const created = await createEmployee({
        name: e.name,
        birthday: e.birthday,
        salary: e.salary,
      });
      console.log("Inserted:", created.name);
    } catch (err) {
      console.log("Could not insert employee:", e.name, err.message);
    }
  }
}
