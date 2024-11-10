import DbClient from "./db.client";

class Seed extends DbClient {
  constructor() {
    super();
    console.log("Seed init");
    Promise.allSettled([this.ImportantContacts(), this.Support()]).then((res) => {
      if (res[0].status === "rejected") console.log("First Failed");
      if (res[1].status === "rejected") console.log("Second Failed");
      if (res[0].status === "fulfilled" && res[1].status === "fulfilled") process.exit(0);
    });
  }

  private ImportantContacts = async () => {
    await this.prisma.importantContacts.createMany({
      data: [
        {
          EmployeeID: "Emp-01",
          Department: "IT",
          EmployeeName: "Rohan",
          EmailAddress: "rohan@mail.com",
          PhoneNumber: 123,
        },
        {
          EmployeeID: "Emp-02",
          Department: "Fiance",
          EmployeeName: "Martin",
          EmailAddress: "martin@mail.com",
          PhoneNumber: 234,
        },
        {
          EmployeeID: "Emp-03",
          Department: "Consultant",
          EmployeeName: "Rahul",
          EmailAddress: "rahul@mail.com",
          PhoneNumber: 987,
        },
      ],
    });
  };

  private Support = async () => {
    await this.prisma.support.createMany({
      data: [
        {
          TeamID: "TID-01",
          EmailAddress: "Rangers@mail.com",
          TeamDept: "IT",
          TeamName: "Rangers",
          TeamPhoneNumber: 234,
        },
        {
          TeamID: "TID-02",
          EmailAddress: "Testers@mail.com",
          TeamDept: "Testing",
          TeamName: "Testers",
          TeamPhoneNumber: 234,
        },
        {
          TeamID: "TID-03",
          EmailAddress: "Design@mail.com",
          TeamDept: "Design",
          TeamName: "Designers",
          TeamPhoneNumber: 987,
        },
      ],
    });
  };
}

new Seed();
