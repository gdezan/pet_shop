import Dexie from "dexie";

const dbPet = new Dexie("dbPet");

dbPet.version(1).stores({
  posts: "img,name,race,age,scheduled_services"
});

dbPet.open().catch( err => {
  console.log(err.stack || err);
});

export default dbPet;
