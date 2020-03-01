import { observable, action } from "mobx";

class memberStore {
  @observable member = {
    pseudo: "",
    id: "",
    email: "",
    token: ""
  };

  // récupération du pseudo et de l'id du membre
  @action
  async fetchMember() {}
}

export default memberStore;
