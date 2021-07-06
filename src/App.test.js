import React from "react";
import { mount } from "enzyme";
import App from "./App";
import TodoTable from "./Components/Tables/TodoTable";
import ModalAddEdit from "./Components/Modals/ModalAddEdit";
import renderer from "react-test-renderer";
import mockedItems from "./Components/Tables/mockedItems";

describe("App tests", () => {
  let appComponent;
  let todoTableComponent;
  beforeEach(() => {
    appComponent = mount(<App />);
    todoTableComponent = mount(
      <TodoTable
        items={mockedItems}
        addItemToState={App.addItemToState}
        updateState={App.updateState}
      />
    );
  });

  describe("App rendering tests", () => {
    it("renders App without crashing", () => {
      renderer.create(<App />);
    });

    it("snapshot test render correctly App component", () => {
      const app = renderer.create(<App />).toJSON();
      expect(app).toMatchSnapshot();
    });

    it("renders the ModalAddEdit to add a new to-do ", () => {
      const modalAddEdit = appComponent.find(ModalAddEdit);
      expect(modalAddEdit).toHaveLength(1);
      expect(modalAddEdit.text()).toBe("Add To-do task");
    });

    it("renders the priority counters correctly", () => {
      const toastsHeaders = appComponent.find(".toast-header");
      expect(toastsHeaders).toHaveLength(3);

      // high priority counter header
      expect(toastsHeaders.at(0).text()).toBe("High Priority");

      // medium priority counter header
      expect(toastsHeaders.at(1).text()).toBe("Medium Priority");

      // low priority counter header
      expect(toastsHeaders.at(2).text()).toBe("Low Priority");

      // and counters should be zero initially
      const toastsValues = appComponent.find(".toast-body");
      expect(toastsValues).toHaveLength(3);

      expect(toastsValues.at(0).text()).toBe("0");
      expect(toastsValues.at(1).text()).toBe("0");
      expect(toastsValues.at(2).text()).toBe("0");
    });
  });

  describe("Priority counters tests", () => {
    it("App displays values on priority counters correctly", () => {
      // set state values
      appComponent.setState({
        items: mockedItems,
        highPriority: 1,
        mediumPriority: 3,
        lowPriority: 1,
      });

      const table = todoTableComponent.find("table");
      const body = table.find("tbody");
      const rows = body.find("tr");
      expect(rows).toHaveLength(5);

      // check for counters to have values 1,3,1
      const toastsValues = appComponent.find(".toast-body");
      expect(toastsValues).toHaveLength(3);

      expect(toastsValues.at(0).text()).toBe("1");
      expect(toastsValues.at(1).text()).toBe("3");
      expect(toastsValues.at(2).text()).toBe("1");
    });

    it("App updates values on priority counters correctly ", () => {
      // set state values
      appComponent.setState({
        items: mockedItems,
        highPriority: 1,
        mediumPriority: 3,
        lowPriority: 1,
      });

      const table = todoTableComponent.find("table");
      const body = table.find("tbody");
      const rows = body.find("tr");
      expect(rows).toHaveLength(5);

      // check for counters to have values 1,3,1
      let toastsValues = appComponent.find(".toast-body");
      expect(toastsValues).toHaveLength(3);

      expect(toastsValues.at(0).text()).toBe("1");
      expect(toastsValues.at(1).text()).toBe("3");
      expect(toastsValues.at(2).text()).toBe("1");

      // change those values and check against new expected values
      const modifiedItem = {
        id: "awsx",
        taskName: "AWS Architecture exams",
        priority: "High",
        priorityValue: 1,
      };
      mockedItems[1] = modifiedItem;

      appComponent.setState({
        items: mockedItems,
        highPriority: 2,
        mediumPriority: 2,
        lowPriority: 1,
      });

      toastsValues = appComponent.find(".toast-body");
      expect(toastsValues).toHaveLength(3);

      expect(toastsValues.at(0).text()).toBe("2");
      expect(toastsValues.at(1).text()).toBe("2");
      expect(toastsValues.at(2).text()).toBe("1");
    });
  });
});
