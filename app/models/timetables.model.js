module.exports = (sequelize, Sequelize) => {
  const Timetables = sequelize.define("timetables", {
    TimetableID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // GroupID: {
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    //   // references: {
    //   //   model: Group,
    //   //   key: "GroupID",
    //   // },
    // },
    // SubjectID: {
    //   type: Sequelize.INTEGER,
    //   // references: {
    //   //   model: Subject,
    //   //   key: "SubjectID",
    //   // },
    // },
    // ProfessorID: {
    //   type: Sequelize.INTEGER,
    //   // references: {
    //   //   model: Professor,
    //   //   key: "ProfessorID",
    //   // },
    // },
    // LectureHallID: {
    //   type: Sequelize.INTEGER,
    //   // references: {
    //   //   model: LectureHall,

    //   //   key: "HallID",
    //   // },
    // },
    // LabID: {
    //   type: Sequelize.INTEGER,
    //   // references: {
    //   //   model: Lab,
    //   //   key: "LabID",
    //   // },
    // },
    DayOfWeek: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    StartTime: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    EndTime: {
      type: Sequelize.TIME,
      allowNull: false,
    },
  });

  return Timetables;
};
