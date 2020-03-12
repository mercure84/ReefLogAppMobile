import { WaterTest, getWaterTestList } from '../services/waterTestService';
import { observable, action, runInAction, computed, toJS } from "mobx";
import { RootStore as RootStoreType } from "./RootStore";

class WaterTestStore {
    rootStore: RootStoreType;

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @observable waterTestList: WaterTest[] = [];
    @observable waterTestState = "pending";

    @computed get waterTestListData() {
        return toJS(this.waterTestList)
    }


    @action
    async fetchWaterTestList(): Promise<WaterTest[]> {
        this.waterTestState = "pending";
        if (this.rootStore.tankStore.tankState === "done") {
            const tankId = this.rootStore.tankStore.tankList[0].id
            if (tankId !== null) {
                try {
                    console.log("Store is fetching  WaterTestList")
                    const memberToken = this.rootStore.memberStore.token;
                    const waterTestList = await getWaterTestList(tankId, memberToken);
                    runInAction(() => {
                        console.log("waterTestList Success");
                        this.waterTestList = waterTestList;
                        this.waterTestState = "done";
                    });
                    return waterTestList;
                } catch (error) {
                    console.log(error)
                    this.waterTestState = "error"
                }
            }
        }
    }
}

export default WaterTestStore